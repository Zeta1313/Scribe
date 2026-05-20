import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { analyzeGrammar } from "./services/grammar.js"
import { analyzeConsistency } from "./services/consistency.js"
import { loadHistory, saveEntry } from "./services/memory.js"

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

        await saveEntry({
            text,
            timestamp: new Date().toISOString()
        })

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

app.listen(3000, () => {
    console.log("Server running on port 3000")
})