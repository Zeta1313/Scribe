export default function FeedbackItem({ type, message }) {
    return (
        <div className="feedback-item">
            <div className="feedback-item-header">
                <span className="feedback-dot"></span>
                <span className="feedback-type">{type}</span>
            </div>
            
            <p className="feedback-message">{message}</p>
        </div>
    );
}