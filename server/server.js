import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/analyze", async (req, res) => {
    try {
        const { text } = req.body

        res.json({
            grammarFeedback: "Test grammar response",
            consistencyFeedback: "Test consistency response"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})