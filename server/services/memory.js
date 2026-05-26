/* global process */
import fs from "fs/promises"
import path from "path"

const DATA_DIR = path.join(
    process.cwd(),
    "data"
)

const FILE_PATH = path.join(
    DATA_DIR,
    "memory.json"
)

const DEFAULT_MEMORY = {
    characters: [],
    locations: [],
    timeline: [],
    worldFacts: []
}

export async function loadHistory() {
    try {

        const data =
            await fs.readFile(FILE_PATH, "utf-8")

        return JSON.parse(data)

    } catch {

        return DEFAULT_MEMORY
    }
}

export async function saveEntry(entry) {

    await fs.mkdir(DATA_DIR, {
        recursive: true
    })

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(entry, null, 2)
    )
}

export async function extractMemory(
    text,
    existingMemory
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
You are maintaining a canonical story database.

Current memory JSON:
${JSON.stringify(existingMemory, null, 2)}

New story entry:
${text}

Update the memory JSON using the new information.

Rules:
- Preserve existing valid facts
- Add new facts
- Update changed facts
- Avoid duplicates
- Stay within categories
- Keep things concise
- Return ONLY valid JSON
`,

                stream: false
            })
        }
    )
const data = await response.json();

const rawResponse = data.response;

try {

    const jsonMatch =
        rawResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {

        throw new Error(
            "No JSON object found"
        );
    }

    return JSON.parse(jsonMatch[0]);

} catch (error) {

    console.error(
        "Invalid JSON returned:"
    );

    console.error(rawResponse);

    throw error;
}
}