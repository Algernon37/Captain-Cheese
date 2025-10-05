import { createContext, useContext } from "react";
import useTheme from '../Theme/useTheme'; 

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
