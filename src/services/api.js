const API_URL_1 = "http://localhost:3000/api/analyze";
const API_URL_2 = "http://localhost:3000/api/save-memory";

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