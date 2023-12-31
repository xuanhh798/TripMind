import "./App.css";
import LandingPage from "./components/page/LandingPage.tsx";
import BrowsePage from "./components/page/BrowsePage.tsx";
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
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/page" element={<ArticlePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
