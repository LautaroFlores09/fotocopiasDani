// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // activa modo oscuro
    primary: { main: "#00BCD4" },    // cian
    secondary: { main: "#E91E63" },  // magenta
    warning: { main: "#FFEB3B", contrastText: "#000" }, // amarillo
    background: { default: "#121212", paper: "#1E1E1E" }, // fondos oscuros
    text: { primary: "#FFFFFF", secondary: "#B0B0B0" },   // texto claro
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
          fontWeight: 600,
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #00BCD4, #E91E63)", // degradado cian-magenta
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(45deg, #00ACC1, #D81B60)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(45deg, #E91E63, #FFEB3B)", // magenta-amarillo
          color: "#000",
          "&:hover": {
            background: "linear-gradient(45deg, #D81B60, #FDD835)",
          },
        },
        outlined: {
          borderColor: "#00BCD4",
          color: "#00BCD4",
          "&:hover": {
            borderColor: "#E91E63",
            backgroundColor: "rgba(233,30,99,0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "10px 0",
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            color: "#FFFFFF",
            "& fieldset": {
              borderColor: "#B0B0B0",
            },
            "&:hover fieldset": {
              borderColor: "#00BCD4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E91E63",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#B0B0B0",
            "&.Mui-focused": {
              color: "#E91E63",
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.5)",
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.8)",
          backgroundColor: "#1E1E1E",
        },
      },
    },
  },
});

export default theme;
