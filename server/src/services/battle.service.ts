import runBattle from "../ai/graph.ai.js";

export interface BattleResult {
  problem: string;
  solution_1: string;
  solution_2: string;
  judge: {
    solution_1_score: number;
    solution_2_score: number;
    solution_1_reasoning: string;
    solution_2_reasoning: string;
  };
}

/**
 * Orchestrates the AI battle: invokes the LangGraph workflow
 * with the user's question and returns structured results.
 */
export async function generateBattle(question: string): Promise<BattleResult> {
  const result = await runBattle(question);
  
  
  return result as BattleResult;
}
