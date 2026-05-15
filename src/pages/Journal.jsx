export default function Journal() {
    return (
    <div>
      <h1>Scribe AI</h1>

      <textarea
        placeholder="Write your journal entry here..."
        rows="10"
        cols="50">
      </textarea>

      <br />

      <button>Analyze Entry</button>
    </div>
  );
}