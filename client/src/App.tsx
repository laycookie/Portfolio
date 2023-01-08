import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contacts";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(true);
  return (
    <div className={"App " + (isDark ? "dark" : "")}>
      <div className="Defaults">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
