const API_URL_1 = "http://localhost:3000/api/analyze";
const API_URL_2 = "http://localhost:3000/api/save-memory";
const API_URL_3 = "http://localhost:3000/api/log";

export async function analyzeEntry(text, storyid) {

    const response = await fetch(API_URL_1, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, storyid })
    });

    if (!response.ok) {
        throw new Error("Failed to analyze entry");
    }

    return await response.json();
}

export async function saveMemory(text, storyid) {
    const response = await fetch(API_URL_2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, storyid })
    });

    if (!response.ok) {
        throw new Error("Failed to save entry");
    }

    return await response.json();
}

export async function getHistory(storyid) {

    const response = await fetch(
        "http://localhost:3000/api/history?storyId=${storyId}`"
    );

    if (!response.ok) {
        throw new Error("Failed to load history");
    }

    return await response.json();
}

export async function getLog(storyid) {

    const response = await fetch(
        "http://localhost:3000/api/log?storyId=${storyId}`"
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load log"
        );
    }

    return await response.json();
}

export async function getStories() {

    const response =
        await fetch(
            "http://localhost:3000/api/stories"
        );

    if (!response.ok) {

        throw new Error(
            "Failed to load stories"
        );
    }

    return await response.json();
}

export async function createStory( title ) {

    const response =
        await fetch(
            "http://localhost:3000/api/stories",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    title
                })
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to create story"
        );
    }

    return await response.json();
}