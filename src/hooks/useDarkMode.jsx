import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";


export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("isDark");

    if (local != null) {
      setIsDark(JSON.parse(local));
    }
  }, []);

  function toggleDarkMode() {
    const newMode=!isDark;
    setIsDark(newMode)
    localStorage.setItem("isDark", JSON.stringify(newMode));
  }

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  return {
    theme,
    isDark,
    toggleDarkMode,
  };
}
