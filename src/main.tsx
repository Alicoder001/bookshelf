import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme({
  typography: {
    fontFamily: '"Mulish", "Arial", sans-serif',
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
