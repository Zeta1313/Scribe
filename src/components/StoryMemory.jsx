import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

export default function StoryMemory() {

    const [memory, setMemory] =
        useState(null);

    useEffect(() => {

        async function loadMemory() {

            try {

                const data =
                    await getHistory();

                setMemory(
                    typeof data === "string"
                        ? data
                        : JSON.stringify(data, null, 2)
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

    if (!memory) {

        return (
            <div className="story-memory">

                <h2>Story Memory</h2>

                <p>
                    No story memory available.
                </p>

            </div>
        );
    }

    return (
        <div className="story-memory">

            <h2>Story Memory</h2>

            <p className="memory-subtitle">
                Key details Scribe is tracking
                for consistency and reference.
            </p>

            <pre className="memory-content">
                {memory}
            </pre>

        </div>
    );
}