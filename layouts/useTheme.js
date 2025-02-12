import { useEffect, useState } from "react";

const useTheme = () => {
  const getTheme = () => {
    const storedTheme = window.localStorage.getItem('dark');
    return storedTheme ? JSON.parse(storedTheme) : !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const setTheme = (value) => {
    window.localStorage.setItem('dark', value);
  };

  const [isDark, setIsDark] = useState(getTheme());

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      setTheme(newTheme);
      return newTheme;
    });
  };

  return { isDark, toggleTheme };
};
