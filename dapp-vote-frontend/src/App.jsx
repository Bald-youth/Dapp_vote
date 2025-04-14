import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vote from "./pages/Voting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </Router>
  );
}

export default App;
