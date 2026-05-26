const API_URL = "http://localhost:3000/api/analyze";

export async function analyzeEntry(text) {

    const response = await fetch(API_URL, {
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

export async function getHistory() {

    const response = await fetch(
        "http://localhost:3000/api/history"
    );

    if (!response.ok) {
        throw new Error("Failed to load history");
    }

    return await response.json();
}