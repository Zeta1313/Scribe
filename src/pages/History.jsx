import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import "./History.css";

export default function History() {

    const [memory, setMemory] =
        useState("");

    useEffect(() => {

        async function loadMemory() {

            try {

                const data =
                    await getHistory();

                setMemory(
                    typeof data === "string"
                        ? data
                        : JSON.stringify(
                            data,
                            null,
                            2
                        )
                );

            } catch (error) {

                console.error(
                    "Failed to load memory:",
                    error
                );
            }
        }

        loadMemory();

    }, []);

    return (
        <div className="history-page">

            <div className="history-container">

                <div className="history-header">

                    <h1>Story Memory</h1>

                    <p>
                        Review saved story details,
                        world information, and
                        tracked continuity notes.
                    </p>

                </div>

                <div className="history-memory">

                    <pre className="history-content">

                        {memory ||
                            "No story memory yet."}

                    </pre>

                </div>

            </div>

        </div>
    );
}