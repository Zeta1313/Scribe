import { useState } from "react";

export default function StorySelector() {
    const [story, setStory] = useState("Main Story");

    return(
        <div className="story-selector">
            <label> Current Story</label>

            <select value={story} onChange={(e)=>setStory(e.target.value)}>
                <option>Main Story</option>
                <option>Journal</option>
                <option>Character Notes</option>
            </select>
        </div>
    );
}