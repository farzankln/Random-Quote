import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomQuote from "./components/RandomQuote";
import Favorites from "./components/Favorites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RandomQuote />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
