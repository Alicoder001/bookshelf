import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store";
const theme = createTheme({
  typography: {
    fontFamily: '"Mulish", "Arial", sans-serif',
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
