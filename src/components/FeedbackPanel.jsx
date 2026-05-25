import FeedbackItem from "./FeedbackItem";

export default function FeedbackPanel({
    feedback = {
        grammarFeedback: "",
        consistencyFeedback: ""
    }
}) {

    const hasFeedback =
        feedback.grammarFeedback ||
        feedback.consistencyFeedback;

    return (
        <div className="feedback-panel">

            <h2>Feedback</h2>

            {!hasFeedback ? (

                <p className="feedback-empty">
                    Write an entry and click Analyze Entry to receive grammar and consistency feedback.
                </p>

            ) : (

                <>

                    <div className="feedback-section">

                        <h3>Grammar & Spelling</h3>

                        <FeedbackItem
                            type="grammar"
                            message={feedback.grammarFeedback}
                        />

                    </div>

                    <div className="feedback-section">

                        <h3>Consistency Check</h3>

                        <FeedbackItem
                            type="consistency"
                            message={feedback.consistencyFeedback}
                        />

                    </div>

                </>

            )}

        </div>
    );
}