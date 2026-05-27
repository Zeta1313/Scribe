import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import "./History.css";

export default function History() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function loadEntries() {
            try {
                const history = await getHistory();

                console.log("History data:", history);

                setEntries(Array.isArray(history) ? history : []);
            } catch (error) {
                console.error("Failed to load history:", error);
            }
        }

        loadEntries();
    }, []);

    return (
        <div className="history-page">
            <div className="history-container">
                <div className="history-header">
                    <h1>Story Memory</h1>
                    <p>Review saved characters, locations, conflicts, and story details.</p>
                </div>

                {entries.length === 0 ? (
                    <div className="empty-history">
                        <h2>No story memory yet</h2>
                        <p>Saved story details will appear here.</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {entries.map((entry, index) => (
                            <div key={index} className="history-card">
                                <div className="history-card-header">
                                    <div>
                                        <h2>Entry {index + 1}</h2>
                                        <span>
                                            {new Date(entry.timestamp).toLocaleString()}
                                        </span>
                                    </div>

                                    <span className="word-count">
                                        {entry.text ? entry.text.split(/\s+/).length : 0} words
                                    </span>
                                </div>

                                <p>{entry.text || entry.summary || JSON.stringify(entry)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}