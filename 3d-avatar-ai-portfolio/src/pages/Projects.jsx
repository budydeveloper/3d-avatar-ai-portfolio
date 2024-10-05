import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Projects = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Projects
        </Typography>
        <Typography variant="body1">Here you can see all my cool projects!</Typography>
      </Box>
    </Container>
  );
};

export default Projects;
