import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import "./styles.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
