import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { analyzeGrammar } from "./services/grammar.js"
import { analyzeConsistency } from "./services/consistency.js"
import { loadHistory, saveEntry, extractMemory, loadLog, saveLogEntry } from "./services/memory.js"
import { loadStories, createStory } from "./services/stories.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/analyze", async (req, res) => {
    try {
        const { text } = req.body
        const { storyId } = req.body

        const history = await loadHistory(storyId)

        const grammarFeedback = await analyzeGrammar(text, storyId)
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
        const { storyId } = req.body

        await saveLogEntry(text, storyId);
        const history = await loadHistory(storyId);
        const extractedMemory = await extractMemory(text, history);
        await saveEntry(extractedMemory, storyId);

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

    const { storyId } = req.query

    try {
        const history = await loadHistory(storyId);
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to load history"
        })
    }
})

app.get("/api/log", async (req, res) => {

    const { storyId } = req.query

    try {

        const log = await loadLog(storyId);
        res.json(log);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to load log"
        });
    }
});

app.get( "/api/stories", async (req, res) => {

        try {

            const stories =
                await loadStories();

            res.json(stories);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Failed to load stories"
            });
        }
    }
);

app.post( "/api/stories", async (req, res) => {

        try {

            const { title } =
                req.body;

            if (!title?.trim()) {

                return res
                    .status(400)
                    .json({
                        error:
                            "Story title required"
                    });
            }

            const story =
                await createStory(
                    title.trim()
                );

            res.json(story);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Failed to create story"
            });
        }
    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000")
})