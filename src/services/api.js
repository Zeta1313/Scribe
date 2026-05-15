export async function analyzeEntry(text) {
    console.log(text); // Placeholder for API call to analyze the journal entry

    return {
        // Sample results
        grammar: [],
        clarity: [],
        consistency: []
    };
}

// Sample response format from the API
[
    {type: "grammar", message: "too > to"},
    {type: "clarity", message: "Sentence could be clearer"}
]