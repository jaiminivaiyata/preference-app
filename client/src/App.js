import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from "@mui/material"
import { ThemeProvider } from "./lib/ThemeContext";
import AppRouter from './Router';

function App() {
  return (
    <ThemeProvider>
      <Box>
        <AppRouter />
        <ToastContainer />
      </Box>
    </ThemeProvider>

  );
}

export default App;
