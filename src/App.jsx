import { Routes, Route, Link } from "react-router-dom";
import Journal from "./pages/Journal";
import History from "./pages/History";
import Stories from "./pages/Stories"
import './App.css'

export default function App() {
  return (
    <div>
      <nav className="app-nav">
        <Link to="/">Journal</Link>
        <Link to="/history">Memory</Link>
        <Link to="/stories">Stories</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Journal />} />
        <Route path="/history" element={<History />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
    </div>
  );
}