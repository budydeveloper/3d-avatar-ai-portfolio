import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Contact = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Contact Me
        </Typography>
        <Typography variant="body1">Feel free to reach out to me at contact@example.com</Typography>
      </Box>
    </Container>
  );
};

export default Contact;
