import { Routes, Route, Link } from "react-router-dom";
import Journal from "./pages/Journal";
import History from "./pages/History";
import Log from "./pages/Log";
import './App.css'

export default function App() {
  return (
    <div>
      <nav className="app-nav">
        <Link to="/">Journal</Link>
        <Link to="/history">Memory</Link>
        <Link to="/log">Log</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Journal />} />
        <Route path="/history" element={<History />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </div>
  );
}