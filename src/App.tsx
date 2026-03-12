import { HashRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Portfolio from "./pages/Portfolio";
import "./styles.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </HashRouter>
  );
}

export default App;