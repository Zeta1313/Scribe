import './App.css'
import Journal from './pages/Journal';

function App() {

  return (
      <Journal />
  )
}

export default function App() {
  return (
    <div>
      <nav className="app-nav">
        <Link to="/">Journal</Link>
        <Link to="/history">History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Journal />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}