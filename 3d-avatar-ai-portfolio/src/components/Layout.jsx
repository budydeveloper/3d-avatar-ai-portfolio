import React from 'react';
import { Box } from '@mui/material';
import MainNavBar from './MainNavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // El contenedor debe ocupar toda la pantalla
      }}
    >
      {/* NavBar en la parte superior */}
      <MainNavBar />
      
      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flex: 1, // Esto asegura que el contenido crezca y empuje el footer hacia abajo si es necesario
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
