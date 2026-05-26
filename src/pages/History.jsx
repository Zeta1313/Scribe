import "./History.css";

export default function History() {
    const entries = [
        {
            date: "June 8",
            title: "Morvin Streets",
            text: "Character entered the city and met a mysterious stranger who offered them a quest.",
            wordCount: 13
        },
        {
            date: "June 9",
            title: "Forest Journey",
            text: "Character accepted the quest and ventured into the nearby forest, encountering various challenges along the way.",
            wordCount: 15
        }
    ];

    return (
        <div className="history-page">
            <div className="history-container">
                <div className="history-header">
                    <h1>Writing History</h1>
                    <p>Review saved entries and story progress over time.</p>
                </div>

                {entries.length === 0 ? (
                    <div className="empyty-history">
                        <h2>No saved entries yet.</h2>
                        <p>Saved writing entries will appear here.</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {entries.map((entry, index) => (
                            <div key={index} className="history-card">
                                <div className="history-card-header">
                                    <div>
                                        <h2>{entry.title}</h2>
                                        <span>{entry.date}</span>
                                    </div>

                                    <span className="word-count">
                                        {entry.wordCount} words
                                    </span>
                                </div>

                                <p>{entry.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}