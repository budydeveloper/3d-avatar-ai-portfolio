import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        padding: '15px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: '100%',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My 3D avatar AI portfolio. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;