import { useState } from "react";
import Header from "../components/Header";
import EntryEditor from "../components/EntryEditor";
import FeedbackPanel from "../components/FeedbackPanel";
import { analyzeEntry, saveMemory } from "../services/api";
import "./Journal.css";
import StoryMemory from "../components/StoryMemory";
import { useStory } from "../context/StoryContext.jsx";

export default function Journal() {
  const [feedback, setFeedback] = useState({grammarFeedback: "", consistencyFeedback: ""});
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentStory } = useStory();
  
    const handleAnalyze = async (text) => {
        if (!text.trim()) return;

        setLoading(true);

        try {

            const result = await analyzeEntry(text, currentStory);

            setFeedback({
                grammarFeedback: result.grammarFeedback,
                consistencyFeedback: result.consistencyFeedback
            });
            showNotification(
                "Analysis completed successfully."
            );
        } catch (error) {

            console.error(error);

            setFeedback({
                grammarFeedback:
                    "Failed to analyze grammar.",

                consistencyFeedback:
                    "Failed to check consistency."
            });

            showNotification(
                "Analysis failed."
            );

        } finally {

            setLoading(false);
        }
    };
  
    const handleSave = async (text) => {
        if (!text.trim()) return;

        setLoading(true);

        try {

            const result = await saveMemory(text, currentStory);

            showNotification("Memory saved successfully.");

        } catch (error) {

            console.error(error);

            showNotification("Failed to save memory.");

        } finally {

            setLoading(false);
        }
    };

    const showNotification = (message) => {

        setNotification(message);

        const removeNotification = () => {

            if (document.hidden) {

                const visibilityHandler = () => {

                    if (!document.hidden) {

                        setTimeout(() => {
                            setNotification("");
                        }, 5000);

                        document.removeEventListener(
                            "visibilitychange",
                            visibilityHandler
                        );
                    }
                };

                document.addEventListener(
                    "visibilitychange",
                    visibilityHandler
                );

            } else {

                setTimeout(() => {
                    setNotification("");
                }, 5000);
            }
        };

        removeNotification();
    };

    return (
        <div className="journal-page">

        {notification && (
            <div className="notification">

                <span>{notification}</span>

                <button
                    onClick={() =>
                        setNotification("")
                    }
                >
                    ×
                </button>

            </div>
        )}

            <Header />

            <h3>
                Current Story:
                {currentStory}
            </h3>

            <div className="main-content">

                <div className="editor-section">
                    <EntryEditor onAnalyze={handleAnalyze} onSaveMemory={handleSave} />

                    {loading && (
                        <p className="loading">
                            Loading...
                        </p>
                    )}
                </div>

                <div className="feedback-section">
                    <FeedbackPanel feedback={feedback} />

                    <StoryMemory />
                </div>

            </div>

        </div>
    );
}