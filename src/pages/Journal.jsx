import { useState } from "react";
import Header from "../components/Header";
import EntryEditor from "../components/EntryEditor";
import FeedbackPanel from "../components/FeedbackPanel";
import { analyzeEntry } from "../services/api";

export default function Journal() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (text) => {
    if (!text.trim()) return; // Don't analyze empty entries
    
    setLoading(true);

    try {
      const result = await analyzeEntry(text); // Call  API to analyze the entry
      setFeedback(result); // Update with results from  API
    } finally {
      setLoading(false);
    }
  }
    return (
        <div className="journal-page">
            <Header />

            <EntryEditor onAnalyze={handleAnalyze} />

            {loading && (
              <>
              {/* Show loading message */}
              <p className="loading">Analyzing entry...</p>
              </>
            )}

            <FeedbackPanel feedback={feedback} />
        </div>
  );
}