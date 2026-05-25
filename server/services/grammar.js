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

// Previous Prompt:
// "Return only grammar and spelling corrections in a short, concise list."
                prompt: `
You are a grammar checker.

Rules:
- Return at most 3 bullet points.
- Do not rewrite the text.
- Do not explain your reasoning.
- Keep each bullet under 15 words.
- If there are no issues, return exactly:
"No grammar issues found."

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