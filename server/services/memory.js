/* global process */
import fs from "fs/promises"
import path from "path"

function getMemoryPath(
    storyId
) {

    return path.join(
        getStoryDir(storyId),
        "memory.json"
    );
}

function getLogPath(
    storyId
) {

    return path.join(
        getStoryDir(storyId),
        "log.json"
    );
}

const DEFAULT_MEMORY = {
    characters: [],
    locations: [],
    timeline: [],
    worldFacts: []
}

export async function loadHistory(storyid) {
    const filePath = getMemoryPath(storyId);

    try {

        const data =
            await fs.readFile(
                filePath,
                "utf-8"
            );

        return JSON.parse(data);

    } catch {

        return DEFAULT_MEMORY;
    }
}

export async function saveEntry(memory, storyId) {

    const storyDir =
        getStoryDir(storyId);

    await fs.mkdir(
        storyDir,
        {
            recursive: true
        }
    );

    await fs.writeFile(
        getMemoryPath(storyId),
        JSON.stringify(
            memory,
            null,
            2
        )
    );
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
You are maintaining a canonical story memory database.

Your task is to UPDATE the existing JSON memory
using the new story entry.

You must preserve the exact JSON structure.

Current memory JSON:
${JSON.stringify(existingMemory, null, 2)}

New story entry:
${text}

Rules:

- Return ONLY valid JSON
- Do NOT include explanations
- Do NOT use markdown
- Do NOT wrap the response in quotes
- Do NOT add additional keys
- Preserve all existing top-level arrays
- Keep the exact top-level structure
- Avoid duplicate information
- Keep descriptions concise
- Character descriptions should not exceed one paragraph
- If no new information exists for a category, preserve it unchanged
- Never remove valid existing information unless directly contradicted
- Timeline entries should be short strings
- worldFacts should contain short factual statements
- All array items must be strings.

The response MUST EXACTLY follow this structure:

{
  "characters": [],
  "locations": [],
  "timeline": [],
  "worldFacts": []
}

Return ONLY the updated JSON object.
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

export async function saveLogEntry(text, storyId) {

    let log = [];

    try {

        const data =
            await fs.readFile(
                getLogPath(storyId),
                "utf-8"
            );

        log =
            JSON.parse(data);

    } catch {}

    log.push({
        timestamp:
            new Date()
                .toISOString(),

        text
    });

    await fs.mkdir(
        getStoryDir(storyId),
        {
            recursive: true
        }
    );

    await fs.writeFile(
        getLogPath(storyId),
        JSON.stringify(
            log,
            null,
            2
        )
    );
}

export async function loadLog(storyId) {

    try {

        const data =
            await fs.readFile(
                getLogPath(storyId),
                "utf-8"
            );

        return JSON.parse(data);

    } catch {

        return [];
    }
}