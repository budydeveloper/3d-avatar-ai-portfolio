import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const AboutMe = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1">Here is some information about myself.</Typography>
      </Box>
    </Container>
  );
};

export default AboutMe;
