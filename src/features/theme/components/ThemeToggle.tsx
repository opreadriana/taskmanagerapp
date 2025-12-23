"use client";
import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // On mount, check for saved theme and set mounted to true
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
    }
  }, []);

  // Apply theme changes directly to all elements
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
  );
}