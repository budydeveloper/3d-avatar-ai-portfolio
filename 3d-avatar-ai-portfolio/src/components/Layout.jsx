import React from "react";
import { Box } from "@mui/material";
import MainNavBar from "./MainNavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.8) 25%, rgba(240, 240, 240, 0.8) 25%, rgba(240, 240, 240, 0.8) 50%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.8) 75%, rgba(240, 240, 240, 0.8) 75%, rgba(240, 240, 240, 0.8)),
          linear-gradient(225deg, rgba(255, 255, 255, 0.8) 25%, rgba(240, 240, 240, 0.8) 25%, rgba(240, 240, 240, 0.8) 50%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.8) 75%, rgba(240, 240, 240, 0.8) 75%, rgba(240, 240, 240, 0.8))
        `,
        backgroundSize: '50px 50px', // Ajusta el tamaño de la textura
      }}
    >
      <MainNavBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
