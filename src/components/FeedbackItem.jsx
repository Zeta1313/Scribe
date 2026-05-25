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
                {message}
            </p>
        </div>
    );
}