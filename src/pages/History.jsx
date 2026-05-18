import "./History.css";

export default function History() {
    /* Mock Journal History */
    const entries = [
        {
            date: "June 8",
            text: "Character entered the city and met a mysterious stranger who offered them a quest."
        },
        {
            date: "June 9",
            text: "Character accepted the quest and ventured into the nearby forest, encountering various challenges along the way."
        }
    ];

    return (
        <div className="history-page">
            <div className="history-container">
                <h2>Past Entries</h2>

                {entries.map((entry, index) => (
                    <div key={index} className="history-card">
                        <h3>{entry.date}</h3>

                        <p>{entry.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}