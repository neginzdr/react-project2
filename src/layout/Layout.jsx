import { FormControlLabel } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useDarkMode from "../hooks/useDarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useButtonDarkMode from "../hooks/useButtonDarkMode";

export default function Layout({ children }) {
  const { isDark, toggleDarkMode, theme } = useDarkMode();
  const { MaterialUISwitch } = useButtonDarkMode();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header
            buttonDarkMode={
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={isDark}
                    onChange={toggleDarkMode}
                  />
                }
              />
            }
          />
          <div className="flex-grow mb-[5rem] mt-[3rem]">{children}</div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
