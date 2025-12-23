"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
<<<<<<< HEAD
  //the state to manage the theme, defaulting to 'light'
  //when theme is toggled, it updates both 'data-theme' attribute and localStorage
  //always start with 'light' theme to match server rendering
  const [theme, setTheme] = useState("light");

  // On mount, checks if any saved theme from localStorage and sets it if found
=======
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // On mount, check for saved theme and set mounted to true
>>>>>>> 1a0e21b7477de3421437cbb29739e2a1d66eb44d
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
    }
  }, []);

<<<<<<< HEAD
  // whenever 'theme' changes, set the <html> className to 'dark' or remove it if 'light'
  //Tailwind applies all the 'dark: ' styles when <html class='dark'> is present
=======
  // Apply theme changes directly to all elements
>>>>>>> 1a0e21b7477de3421437cbb29739e2a1d66eb44d
  useEffect(() => {
    if (!mounted) return;

    const body = document.body;
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    if (isDark) {
      // Apply dark theme
      body.style.backgroundColor = "#1e3a8a"; // blue-900
      body.style.color = "#dbeafe"; // blue-100
      if (header) {
        header.style.backgroundColor = "#1e40af"; // blue-800
        header.style.color = "#dbeafe"; // blue-100
      }
      if (main) {
        main.style.backgroundColor = "#1e3a8a"; // blue-900
        main.style.color = "#dbeafe"; // blue-100
      }
      if (footer) {
        footer.style.backgroundColor = "#1e40af"; // blue-800
        footer.style.color = "#dbeafe"; // blue-100
      }
    } else {
      // Apply light theme
      body.style.backgroundColor = "#eff6ff"; // blue-50
      body.style.color = "#1e3a8a"; // blue-900
      if (header) {
        header.style.backgroundColor = "#dbeafe"; // blue-100
        header.style.color = "#1e3a8a"; // blue-900
      }
      if (main) {
        main.style.backgroundColor = "#eff6ff"; // blue-50
        main.style.color = "#1e3a8a"; // blue-900
      }
      if (footer) {
        footer.style.backgroundColor = "#dbeafe"; // blue-100
        footer.style.color = "#1e3a8a"; // blue-900
      }
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
<<<<<<< HEAD
    <button
      className="self-start m-4 text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Switch to {theme == "light" ? "Dark" : "Light"} Mode
    </button>
=======
    <Button
      variant="outline"
      style={{
        backgroundColor: isDark ? "#1e40af" : "#eff6ff",
        color: isDark ? "#dbeafe" : "#1e3a8a",
        borderColor: isDark ? "#2563eb" : "#93c5fd",
      }}
      className="fixed top-4 left-4 z-10 transition-colors duration-300"
      onClick={toggleTheme}
    >
      Switch to {isDark ? "Light" : "Dark"} Mode
    </Button>
>>>>>>> 1a0e21b7477de3421437cbb29739e2a1d66eb44d
  );
}
