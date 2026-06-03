import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { analyzeGrammar } from "./services/grammar.js"
import { analyzeConsistency } from "./services/consistency.js"
import { loadHistory, saveEntry, extractMemory, loadLog, saveLogEntry } from "./services/memory.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/analyze", async (req, res) => {
    try {
        const { text } = req.body

        const history = await loadHistory()

        const grammarFeedback = await analyzeGrammar(text)
        const consistencyFeedback = await analyzeConsistency(text, history)

        res.json({
            grammarFeedback,
            consistencyFeedback
        })

    } catch (error) {

    console.error("FULL ERROR:")
    console.error(error)

    res.status(500).json({
        error: error.message
    })
}
})

app.post("/api/save-memory", async (req, res) => {

    try {

        const { text } = req.body

        await saveLogEntry(text);
        const history = await loadHistory();
        const extractedMemory = await extractMemory(text, history);
        await saveEntry(extractedMemory);

        res.json({
            success: true
        })

    } catch (error) {

    console.error("FULL ERROR:")
    console.error(error)

        res.status(500).json({
            error: error.message
        })
    }
})

app.get("/api/history", async (req, res) => {
    try {
        const history = await loadHistory();
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to load history"
        })
    }
})

app.get("/api/log", async (req, res) => {

    try {

        const log =
            await loadLog();

        res.json(log);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to load log"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})