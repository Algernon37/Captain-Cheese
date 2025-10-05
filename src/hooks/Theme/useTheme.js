import { useLayoutEffect, useState } from "react";

const useTheme = () => {
  const getPreferredTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getPreferredTheme)

  useLayoutEffect(() => {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
  },[theme])

  return {theme, setTheme}
}

export default useTheme;
