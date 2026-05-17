export default function FeedbackItem({type, message}) {
    return (
        <div className={`feedback-item ${type}`}>
            <p className="feedback-type">{type}</p>
            <p className="feedback-message">{message}</p>
        </div>
    );
}