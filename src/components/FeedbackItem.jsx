export default function FeedbackItem({
    type,
    message
}) {

    return (
        <div className={`feedback-item ${type}`}>
            <p>{message}</p>
        </div>
    );
}