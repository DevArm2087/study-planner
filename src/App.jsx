import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DayPage from "./pages/DayPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";

const THEME_KEY = "study-planner-theme";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Routes>
        <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/day/:date" element={<DayPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>

      <footer className="footer">
        <p>
          ساخته شده با عشق توسط  
          <strong> محمدحسین ارشدی‌نژاد </strong>  
           یکی از خفن‌ترین برنامه‌نویس‌ها   
        </p>
      </footer>
    </>
  );
}
