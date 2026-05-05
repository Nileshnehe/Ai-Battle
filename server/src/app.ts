import express from "express";
import graphAi from "./ai/graph.ai.js";


const app = express();

app.get("/", async (req, res) => {
    const result = await graphAi("What is DSA");
    console.log("Result from Graph:", result); // Yeh line terminal par print karegi
    res.json(result);
});

export default app