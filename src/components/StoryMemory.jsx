import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import { useStory } from "../context/StoryContext.jsx";

export default function StoryMemory() {

    const [memory, setMemory] = useState(null);

    const { currentStory } = useStory()

    useEffect(() => {

        async function loadMemory() {

            try {

                const data =
                    await getHistory(currentStory);

                setMemory(data);

            } catch (error) {

                console.error(
                    "Failed to load memory:",
                    error
                );
            }
        }

        loadMemory();

    }, [currentStory]);

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

            <div className="memory-section">

                <h3>Characters</h3>

                {(memory.characters || []).length === 0 ? (

                    <p>No tracked characters.</p>

                ) : (

                    <ul>
                        {(memory.characters || []).map(
                            (character, index) => (
                                <li key={index}>
                                    {character}
                                </li>
                            )
                        )}
                    </ul>

                )}

            </div>

            <div className="memory-section">

                <h3>Locations</h3>

                {(memory.locations || []).length === 0 ? (

                    <p>No tracked locations.</p>

                ) : (

                    <ul>
                        {(memory.locations || []).map(
                            (location, index) => (
                                <li key={index}>
                                    {location}
                                </li>
                            )
                        )}
                    </ul>

                )}

            </div>

            <div className="memory-section">

                <h3>Timeline</h3>

                {(memory.timeline || []).length === 0 ? (

                    <p>No tracked events.</p>

                ) : (

                    <ul>
                        {(memory.timeline || []).map(
                            (event, index) => (
                                <li key={index}>
                                    {event}
                                </li>
                            )
                        )}
                    </ul>

                )}

            </div>

            <div className="memory-section">

                <h3>World Facts</h3>

                {(memory.worldFacts || []).length === 0 ? (

                    <p>No tracked world facts.</p>

                ) : (

                    <ul>
                        {(memory.worldFacts || []).map(
                            (fact, index) => (
                                <li key={index}>
                                    {fact}
                                </li>
                            )
                        )}
                    </ul>

                )}

            </div>

        </div>
    );
}