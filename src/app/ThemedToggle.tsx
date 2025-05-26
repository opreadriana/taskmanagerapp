"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    //the state to manage the theme, defaulting to 'light'
    //when theme is toggled, it updates both 'data-theme' attribute and localStorage
    //always start with 'light' theme to match server rendering
  const [theme, setTheme] = useState('light');

    // On mount, checks if any saved theme from localStorage and sets it if found
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

// whenever 'theme' changes, set the <html> className to 'dark' or remove it if 'light'
//Tailwind applies all the 'dark: ' styles when <html class='dark'> is present
  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme); //save the theme to localStorage when it changes
  }, [theme]);

  return (
    <button
  className="self-start m-4 text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
>
      Switch to {theme =='light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}