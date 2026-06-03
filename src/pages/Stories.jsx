import { useEffect, useState } from "react";
import { useStory } from "../context/StoryContext.jsx";

export default function Stories() {

const { currentStory, setCurrentStory } = useStory();
const [stories, setStories] = useState([]);
const [newTitle, setNewTitle] = useState("");

    async function loadStories() {

        const response =
            await fetch(
                "http://localhost:3000/api/stories"
            );

        const data =
            await response.json();

        setStories(data);
    }

    async function createStory() {

        if (!newTitle.trim()) {
            return;
        }

        const response =
            await fetch(
                "http://localhost:3000/api/stories",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title: newTitle
                    })
                }
            );

        if (!response.ok) {

            throw new Error(
                "Failed to create story"
            );
        }

        setNewTitle("");

        await loadStories();
    }

    useEffect(() => {

        loadStories();

    }, []);

    return (

        <div className="stories-page">

            <h1>Stories</h1>

            <div className="story-create">

                <input
                    value={newTitle}
                    onChange={(e) =>
                        setNewTitle(
                            e.target.value
                        )
                    }
                    placeholder="Story title"
                />

                <button
                    onClick={createStory}
                >
                    Create Story
                </button>

            </div>

            <div className="story-list">

                {stories.map(
                    (story) => (

                        <div
                            key={story.id}
                            className="story-card"
                        >

                            <h2>
                                {story.title}
                            </h2>

                            <p>
                                {story.id}
                            </p>

                            {story.id ===
                                currentStory && (

                                <span>
                                    Active Story
                                </span>

                            )}

                            <button
                                onClick={() => {

                                    setCurrentStory(
                                        story.id
                                    );
                                }}
                            >
                                Select
                            </button>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}