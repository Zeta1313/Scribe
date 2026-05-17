export async function analyzeEntry(text) {
    console.log(text); // Placeholder for API call to analyze the journal entry

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    const feedback = [];
    const cleaned = text.trim();

    // Example rules for mock AI behaviour
    if (cleaned.toLowerCase().includes("teh")) {
        feedback.push({
            type: "grammar",
            message: "Possible typo: 'teh' should be 'the'.",
        });
    }

    if (cleaned.length < 20) {
        feedback.push({
            type: "clarity",
            message: "Sentence could be clearer or more detailed.",
        });
    }

    if (feedback.length === 0) {
        feedback.push({
            type: "positive",
            message: "No issues found in this entry.",
        });
    }

    if (cleaned.toLowerCase().includes("and and")) {
        feedback.push({
            type: "grammar",
            message: "Repeated words detected ('and and').",
        });
    }

    return feedback;
}