import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  AppBar,
  Typography,
  CssBaseline,
  Divider,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import Calculator from "./pages/Calculator";
import Configuraciones from "./pages/Configuraciones";
import LayersIcon from "@mui/icons-material/Layers";
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

function App() {
  const [section, setSection] = useState("calculadora");

  const renderContent = () => {
    switch (section) {
      case "calculadora":
        return <Calculator setSection={setSection} />;
      case "configuraciones":
        return <Configuraciones />;
      default:
        return <Calculator />;
    }
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ display: "flex" }}>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "background.paper",
              color: "text.primary",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {/* Título con icono */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              py: 2,
            }}
          >
            <LayersIcon sx={{ fontSize: 40, color: "#00BCD4", mb: 1 }} />
            <Typography
              variant="h6"
            >
              Fotocopias Dani
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ overflowY: "auto", flexGrow: 1, mt: 1 }}>
            <List>
              {[
                { label: "Calculadora", key: "calculadora", icon: <CalculateIcon /> },
                { label: "Configuraciones", key: "configuraciones", icon: <SettingsIcon /> },
              ].map((item) => (
                <ListItem key={item.key} disablePadding>
                  <ListItemButton
                    onClick={() => setSection(item.key)}
                    sx={{
                      borderRadius: 1,
                      m: 0.5,
                      backgroundColor:
                        section === item.key
                          ? "rgba(0, 188, 212, 0.2)"
                          : "transparent",
                      color: section === item.key ? "#00BCD4" : "text.primary",
                      "&:hover": { backgroundColor: "rgba(0, 188, 212, 0.1)" },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: section === item.key ? "#00BCD4" : "text.primary",
                        minWidth: 36,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: section === item.key ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </SnackbarProvider>
  );
}

export default App;
