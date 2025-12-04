"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="outline"
      className="self-start m-4 border-blue-300 bg-blue-50 text-blue-900 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
