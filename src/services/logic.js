import express from 'express'
import { analyzeGrammar } from '../services/grammar.js'
import { analyzeConsistency } from '../services/consistency.js'
import { loadHistory, saveEntry } from '../services/memory.js'
import { extractWritingData } from '../services/remember.js'

const router = express.Router()

router.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body

        const history = await loadHistory()

        const grammarFeedback = await analyzeGrammar(text)

        const consistencyFeedback = await analyzeConsistency(
            text,
            history
        )

        const extractedData = await extractWritingData(text)

        await saveEntry(extractedData)

        res.json({
            grammarFeedback,
            consistencyFeedback
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})