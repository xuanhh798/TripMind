import "./App.css";
import LandingPage from "./components/page/LandingPage.tsx";
import ArticlePage from "./components/page/ArticlePage.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
