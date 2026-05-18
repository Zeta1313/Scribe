export default function StoryMemory() {
    const memoryItems = [
        "Main character: John Doe",
        "Current Location: North Forest",
        "Quest: Recover lost equipment",
        "Important Detail: Bandits spotted nearby"
    ];

    return (
        <div className="story-memory">
            <h2>Story Memory</h2>
            <p className="memory-subtitle">
                Key details Scribe is tracking for consistency and reference.
            </p>

            <ul>
                {memoryItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}