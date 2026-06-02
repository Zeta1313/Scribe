import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

export default function StoryMemory() {
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        async function loadMemory() {
            try {
                const data = await getHistory();
                setMemory(data);
            } catch (error) {
                console.error("Failed to load memory:", error);
            }
        }

        loadMemory();
    }, []);

    if (!memory) {
        return (
            <div className="story-memory">
                <h2>Story Memory</h2>
                <p>No story memory available.</p>
            </div>
        );
    }

    const sections = [
        {
            title: "Characters",
            items: memory.characters || []
        },
        {
            title: "Locations",
            items: memory.locations || []
        },
        {
            title: "Timeline",
            items: memory.timeline || []
        },
        {
            title: "World Facts",
            items: memory.worldFacts || []
        }
    ];

    return (
        <div className="story-memory">
            <h2>Story Memory</h2>

            <p className="memory-subtitle">
                Key details Scribe is tracking for consistency and reference.
            </p>

            {sections.map((section) => (
                <div key={section.title} className="memory-section">
                    <h3>{section.title}</h3>

                    {section.items.length === 0 ? (
                        <p className="memory-empty">
                            No {section.title.toLowerCase()} saved yet.
                        </p>
                    ) : (
                        <ul>
                            {section.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}