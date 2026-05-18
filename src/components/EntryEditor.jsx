import { useState } from "react";

export default function EntryEditor({ onAnalyze }) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!text.trim()) return; // Don't analyze empty entries
        onAnalyze(text);
    };

    const wordCount = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;
    
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="editor-card">
            <div className="editor-header">
                <h2>Your Entry</h2>
            </div>

            <div className="writing-stats">
                <span>{wordCount} words</span>
                <span>{text.length} characters</span>
                <span>{readingTime} min read</span>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing your entry here..."
            />

            <div className="editor-footer">
                <button onClick={handleSubmit}>
                    Analyze Entry
                </button>
            </div>
        </div>
    );
}