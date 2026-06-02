import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import "./History.css";

export default function History() {
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

    const sections = [
        { title: "Characters", items: memory?.characters || [] },
        { title: "Locations", items: memory?.locations || [] },
        { title: "Timeline", items: memory?.timeline || [] },
        { title: "World Facts", items: memory?.worldFacts || [] }
    ];

    return (
        <div className="history-page">
            <div className="history-container">
                <div className="history-header">
                    <h1>Story Memory</h1>
                    <p>
                        Review saved story details, world information,
                        and tracked continuity notes.
                    </p>
                </div>

                {!memory ? (
                    <div className="empty-history">
                        <h2>No story memory yet</h2>
                        <p>Saved story details will appear here.</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {sections.map((section) => (
                            <div key={section.title} className="history-card">
                                <h2>{section.title}</h2>

                                {section.items.length === 0 ? (
                                    <p className="memory-empty">
                                        No {section.title.toLowerCase()} saved yet.
                                    </p>
                                ) : (
                                    <ul className="memory-list">
                                        {section.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}