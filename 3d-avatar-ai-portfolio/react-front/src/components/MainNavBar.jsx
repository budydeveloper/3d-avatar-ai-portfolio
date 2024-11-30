import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MainNavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Lista de enlaces de navegación
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About Me', path: '/about-me' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#00796b', // Color de fondo oscuro
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Sombra para la barra
      }}
    >
      <Toolbar>
        {/* Título o nombre del sitio */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: '#ffffff', // Color blanco para el texto
          }}
        >
          3D Avatar AI Portfolio
        </Typography>

        {/* Menú de navegación */}
        {isMobile ? (
          <>
            {/* Icono de menú de hamburguesa para móviles */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer lateral para móviles */}
            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <List>
                {navLinks.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      onClick={() => setOpenDrawer(false)}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#004d40', // Hover oscuro
                        },
                      }}
                    >
                      <ListItemText primary={item.title} sx={{ color: '#ffffff' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          // Botones en línea para pantallas grandes
          <Box>
            {navLinks.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#004d40', // Hover oscuro
                  },
                  borderRadius: '20px',
                  margin: '0 5px',
                  padding: '5px 15px',
                  border: `2px solid #26a69a`, // Borde más claro
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
