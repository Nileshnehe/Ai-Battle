import { StateGraph, Annotation, START, END } from "@langchain/langgraph"; // Newer versions use Annotation
import z from "zod";
import { ModelProvider } from "./model.ai.js";
import { HumanMessage } from "@langchain/core/messages";


const StateAnnotation = Annotation.Root({
    problem: Annotation<string>(),
    solution_1: Annotation<string>(),
    solution_2: Annotation<string>(),
    
    judge: Annotation<{
        solution_1_score: number;
        solution_2_score: number;
        solution_1_reasoning: string;
        solution_2_reasoning: string;
    }>(),
});


const solutionNode = async (state: typeof StateAnnotation.State) => {
    
    const [mistralResponse, cohereResponse] = await Promise.all([
        ModelProvider.mistral.invoke(state.problem),
        ModelProvider.cohere.invoke(state.problem)
    ]);

    return {
        solution_1: mistralResponse.content as string, 
        solution_2: cohereResponse.content as string,
    };
};


const judgeNode = async (state: typeof StateAnnotation.State) => {
    const { problem, solution_1, solution_2 } = state;

    
    const structuredJudge = ModelProvider.gemini.withStructuredOutput(z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
    }));

    const systemPrompt = `You are a judge tasked with evaluating two solutions.
    Problem: ${problem}
    Solution 1: ${solution_1}
    Solution 2: ${solution_2}
    Please provide scores (0-10) and reasoning.`;

    const response = await structuredJudge.invoke([
        new HumanMessage(systemPrompt)
    ]);

    return {
        judge: response 
    };
};


const workflow = new StateGraph(StateAnnotation)
    .addNode("solution_providers", solutionNode) 
    .addNode("evaluator", judgeNode)            
    .addEdge(START, "solution_providers")
    .addEdge("solution_providers", "evaluator")
    .addEdge("evaluator", END);

export const graph = workflow.compile();

export default async function runBattle(problem: string) {
    const result = await graph.invoke({ problem });
    return result;
}

