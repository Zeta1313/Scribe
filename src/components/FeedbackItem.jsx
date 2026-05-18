export default function FeedbackItem({ type, message }) {
    const labels = {
        grammar: "Grammar",
        clarity: "Clarity",
        positive: "No Issues",
        style: "Style"
    }

    return (
        <div className="feedback-item">
            <div className="feedback-item-header">
                <span className="feedback-dot"></span>

                <strong>
                    {labels[type] || type}
                </strong>
            </div>

            <p className="feedback-message">
                {message}
            </p>
        </div>
    );
}