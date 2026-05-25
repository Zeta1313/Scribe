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

// Previous Prompt:
// "You are a continuity editor."
                prompt: `
You are a continuity editor.

Rules:
- Only identify contradictions between the current entry and previous entries.
- Return at most 3 bullet points.
- Keep each bullet under 20 words.
- Do not rewrite the story.
- Do not explain your reasoning.
- Do not suggest improvements.
- If there are no contradictions, return exactly:
"No inconsistencies found."

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