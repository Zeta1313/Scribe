import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)

export async function extractWritingData(text) {

    const prompt = `
Extract important story information from this passage.

Return valid JSON only.

Include:
- characters
- locations
- important facts
- timeline events

TEXT:
${text}
`

    const response = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters: {
            max_new_tokens: 400
        }
    })

    try {
        return JSON.parse(response.generated_text)

    } catch {
        return {
            rawText: text
        }
    }
}