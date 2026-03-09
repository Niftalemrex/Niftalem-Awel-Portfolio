import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Portfolio from "./pages/Portfolio";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Intro Landing Page */}
        <Route path="/" element={<Intro />} />

        {/* Main Portfolio Page */}
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;