import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)

export async function analyzeConsistency(text, history) {

    const prompt = `
You are a continuity editor.

Previous writing data:
${JSON.stringify(history, null, 2)}

Current passage:
${text}

Check for:
- contradictions
- inconsistent names
- timeline issues
- setting inconsistencies
- character inconsistencies

Return only detected inconsistencies.
`

    const response = await hf.textGeneration({
        model: 'google/gemma-2-9b-it',
        inputs: prompt,
        parameters: {
            max_new_tokens: 700
        }
    })

    return response.generated_text
}