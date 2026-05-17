import FeedbackItem from "./FeedbackItem";

export default function FeedbackPanel({feedback = []}) {
    const groupedFeedback = feedback.reduce((grouped, item) => {
        if (!grouped[item.type]) {
            grouped[item.type] = [];
        }
        grouped[item.type].push(item);
        return grouped;
    }, {});

return (
    <div className="feedback-panel">
        <h2>Feedback</h2>

        {feedback.length === 0 ? (
            <p>No feedback yet. Run analysis to see suggestions.</p>
        ) : (
            Object.entries(groupedFeedback).map(([type, items]) => (
                <div key={type} className="feedback-section">
                    <h3>{type.toUpperCase()}</h3>

                    {items.map((item, index) => (
                        <FeedbackItem
                            key={index}
                            type={item.type}
                            message={item.message}
                        />
                    ))}
                </div>
            ))
        )}
    </div>
);
}