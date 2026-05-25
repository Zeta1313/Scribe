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
// Find inconsistencies only and provide a short, consise list of them.
                prompt: `
You are a continuity editor.

Rules:
- Only identify contradictions between the current entry and previous entries.
- Return at most 3 bullet points.
- Keep each bullet under 20 words.
- Do not rewrite the story.
- Do not explain your reasoning.
- Do not suggest improvements.
- If uncertain, do not report a contradiction.
- If there are no contradictions, return exactly:
"No inconsistencies found."
- Only flag direct factual contradictions involving character identity, location, timeline, events, or established details.
- Do not flag tone, opinions, jokes, or character complaints as contradictions.

Previous entries:
${JSON.stringify(history, null, 2)}

Current entry:
${text}
`,

                stream: false
            })
        }
    )

    const data = await response.json()

    return data.response
}