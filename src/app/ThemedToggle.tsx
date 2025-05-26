"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    //the state to manage the theme, defaulting to 'light'
    //when theme is toggled, it updates both 'data-theme' attribute and localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); //save the theme to localStorage when it changes
  }, [theme]);

  return (
    <button
      className='theme-toggle'
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{ margin: "1rem" }}
    >
      Switch to {theme =='light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}