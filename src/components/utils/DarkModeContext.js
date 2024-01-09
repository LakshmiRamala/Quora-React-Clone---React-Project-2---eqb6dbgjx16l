import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
const storedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
const [darkMode, setDarkMode] = useState(storedDarkMode);

const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
  };
  
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.style.backgroundColor = darkMode ? "#181818" : "#f1f2f2";
  }, [darkMode]);

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(storedDarkMode);
    document.body.style.backgroundColor = storedDarkMode ? "#181818" : "#f1f2f2";
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
