export default function FeedbackItem({type, message}) {
    const labels = {
        grammar: "Grammar & Spelling",
        consistency: "Consistency Check",
        clarity: "Clarity",
        positive: "No Issues"
    };
    
    return (
        <div className={`feedback-item ${type}`}>
            <div className="feedback-item-header">
                <span className="feedback-label">
                    {labels[type] || type}
                </span>
            </div>

            <p className="feedback-message">
                <ul className="feedback-list">
                    {message
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .map((line, index) => (
                            <li key={index}>
                                {line.replace(/^[-•]\s*/, "")}
                            </li>
                        ))}
                </ul>
            </p>
        </div>
    );
}