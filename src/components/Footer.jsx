// src/components/Footer.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
    width: "100%",
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A1A1A" : "#F5F5F5",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Created by Aleman
      </Typography>
    </Box>
  );
}
