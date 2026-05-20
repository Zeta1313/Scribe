import { useState } from "react";
import Header from "../components/Header";
import EntryEditor from "../components/EntryEditor";
import FeedbackPanel from "../components/FeedbackPanel";
import { analyzeEntry } from "../services/api";
import "./Journal.css";
import StorySelector from "../components/StorySelector";
import StoryMemory from "../components/StoryMemory";

export default function Journal() {
  const [feedback, setFeedback] = useState({grammarFeedback: "", consistencyFeedback: ""});
  const [loading, setLoading] = useState(false);
  
    const handleAnalyze = async (text) => {
        if (!text.trim()) return;

        setLoading(true);

        try {

            const result = await analyzeEntry(text);

            setFeedback({
                grammarFeedback: result.grammarFeedback,
                consistencyFeedback: result.consistencyFeedback
            });

        } catch (error) {

            console.error(error);

            setFeedback({
                grammarFeedback: "Failed to analyze grammar.",
                consistencyFeedback: "Failed to check consistency."
            });

        } finally {

            setLoading(false);
        }
    };
    return (
        <div className="journal-page">

            <Header />

            <StorySelector />

            <div className="main-content">

                <div className="editor-section">
                    <EntryEditor onAnalyze={handleAnalyze} />

                    {loading && (
                        <p className="loading">
                            Analyzing entry...
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