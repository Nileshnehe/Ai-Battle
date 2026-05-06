import express from "express";
import graphAi from "./ai/graph.ai.js";


const app = express();

app.get("/", async (req, res) => {
    const result = await graphAi("What is Generative AI In simple way");
    console.log("Result from Graph:", result); 
    res.json(result);
});

export default app