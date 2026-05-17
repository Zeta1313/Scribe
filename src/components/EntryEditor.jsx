import {useState} from "react";

export default function EntryEditor({onAnalyze}) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!text.trim()) return; // Don't analyze empty entries
        onAnalyze(text);
    };

    return (
        <div className="entry-editor">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your journal entry here..."
                rows="10"
                cols="50"
            />
            <button onClick={handleSubmit}>Analyze Entry</button>
        </div>
    );
}