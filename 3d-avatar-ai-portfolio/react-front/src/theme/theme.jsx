import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#037a76', // Verde oscuro, inspirado en los uniformes
    },
    secondary: {
      main: '#ed1b76', // Rosa fuerte, similar a los trajes de los guardias
    },
    background: {
      default: '#ffffff', // Blanco de fondo para contrastar
      paper: '#249f9c', // Verde de papel para resaltar ciertas secciones
    },
    error: {
      main: '#f44786', // Color de advertencia para elementos como botones de error
    },
    text: {
      primary: '#000000', // Texto principal en negro
      secondary: '#ed1b76', // Resaltados en rosa fuerte
    },
  },
  typography: {
    fontFamily: '"Game Of Squids", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'uppercase', // Botones con estilo inspirado en la serie
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px', // Botones redondeados como en los elementos del show
          fontWeight: 600,
          padding: '10px 20px',
          backgroundColor: '#ed1b76',
          '&:hover': {
            backgroundColor: '#f44786',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#037a76', // Aplicar el color principal a la AppBar
        },
      },
    },
  },
});

export default theme;
