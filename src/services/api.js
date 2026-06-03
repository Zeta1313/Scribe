const API_URL_1 = "http://localhost:3000/api/analyze";
const API_URL_2 = "http://localhost:3000/api/save-memory";
const API_IRL_3 = "http://localhost:3000/api/log";

export async function analyzeEntry(text) {

    const response = await fetch(API_URL_1, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    if (!response.ok) {
        throw new Error("Failed to analyze entry");
    }

    return await response.json();
}

export async function saveMemory(text) {
    const response = await fetch(API_URL_2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    if (!response.ok) {
        throw new Error("Failed to save entry");
    }

    return await response.json();
}

export async function getHistory() {

    const response = await fetch(
        "http://localhost:3000/api/history"
    );

    if (!response.ok) {
        throw new Error("Failed to load history");
    }

    return await response.json();
}

export async function getLog() {

    try {

        const data =
            await fs.readFile(
                API_IRL_3,
                "utf-8"
            );

        return JSON.parse(data);

    } catch {

        return [];
    }
}