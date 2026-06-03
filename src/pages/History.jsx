import { useEffect, useState } from "react";
import { getLog } from "../services/api";
import "./History.css";
import { useStory } from "../context/StoryContext.jsx";

export default function History() {

    const [entries, setEntries] = useState([]);

    const { currentStory } = useStory();

    useEffect(() => {
        async function loadLog() {

            try {

                const data = await getLog(currentStory);

 console.log(data);

                setEntries(data);

            } catch (error) {

                console.error(
                    "Failed to load log:",
                    error
                );
            }
        }
        
        loadLog();

    }, [currentStory]);

    return (
        <div className="history-page">

            <div className="history-container">

                <div className="history-header">

                    <h1>Story Log</h1>

                    <p>
                        Review previously saved
                        writing entries.
                    </p>

                </div>

                {entries.length === 0 ? (

                    <div className="history-memory">

                        <p>
                            No saved entries yet.
                        </p>

                    </div>

                ) : (

                    <div className="history-list">

                        {entries
                            .slice()
                            .reverse()
                            .map((entry, index) => (

                                <div
                                    key={index}
                                    className="history-card"
                                >

                                    <div className="history-card-header">

                                        <h2>
                                            Entry {
                                                entries.length - index
                                            }
                                        </h2>

                                        <span>

                                            {
                                                new Date(
                                                    entry.timestamp
                                                ).toLocaleString()
                                            }

                                        </span>

                                    </div>

                                    <pre className="history-content">

                                        {entry.text}

                                    </pre>

                                </div>

                            ))}

                    </div>

                )}

            </div>

        </div>
    );
}