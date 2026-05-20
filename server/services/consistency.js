export async function analyzeConsistency(
    text,
    history
) {

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
You are a continuity editor.

Previous entries:
${JSON.stringify(history, null, 2)}

Current entry:
${text}

Find inconsistencies only and provide a short, consise list of them.
`,

                stream: false
            })
        }
    )

    const data = await response.json()

    return data.response
}