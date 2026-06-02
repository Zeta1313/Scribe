import { useEffect, useState } from "react";
import { getLog } from "../services/api";
import "./Log.css";

export default function Log() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function loadLogs() {
            try {
                const logData = await getLog();
                setLogs(Array.isArray(logData) ? logData : []);
            } catch (error) {
                console.error("Failed to load logs:", error);
                setLogs([]);
            }
        }

        loadLogs();
    }, []);

    return (
    <div className="log-page">
        <div className="log-container">

            <div className="log-header">
                <h1>Writing Log</h1>
                <p>Review saved passages by date.</p>
            </div>

            {logs.length === 0 ? (
                <div className="empty-log">
                    <h2>No saved passages yet</h2>
                    <p>Saved entries will appear here.</p>
                </div>
            ) : (
                <div className="log-list">
                    {logs.map((entry, index) => (
                        <div key={index} className="log-card">
                            <div className="log-card-header">
                                <div>
                                    <h2>Entry {index + 1}</h2>

                                    <span className="log-date">
                                        {new Date(entry.timestamp).toLocaleString()}
                                    </span>
                                </div>

                                <span className="word-count">
                                    {entry.text.trim().split(/\s+/).length} words
                                </span>
                            </div>

                            <p className="log-text">
                                {entry.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    </div>
);
}