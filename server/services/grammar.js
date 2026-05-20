export async function analyzeGrammar(text) {

    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "phi3",

                prompt: `
Return only grammar and spelling corrections in a short, consise list.

Text:
${text}
`,

                stream: false
            })
        }
    )

    const data = await response.json()

    return data.response
}