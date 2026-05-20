import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)

export async function analyzeGrammar(text) {

    const prompt = `
Analyze this text for:
- spelling mistakes
- grammar mistakes
- punctuation issues

Return only the errors and corrections.

TEXT:
${text}
`

    const response = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters: {
            max_new_tokens: 500
        }
    })

    return response.generated_text
}