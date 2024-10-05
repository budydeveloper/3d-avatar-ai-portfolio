import React from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Importar el Grid2
import AvatarViewer from "../components/AvatarViewer";

const Home = () => {
  return (
    <Container sx={{ mt: 0, px: { xs: 1, md: 2 } }}>
      {" "}
      {/* Ajuste de padding horizontal para dispositivos pequeños */}
      <Box sx={{ my: 0, mx: { xs: 0, md: 2 } }}>
        {/* Ajustar márgenes laterales */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            flexDirection: { xs: "column", md: "row" }, // Cambiar la disposición a columna en pantallas pequeñas
            textAlign: { xs: "center", md: "left" }, // Centrar el texto en móviles
          }}
        >
          {/* Sección del Avatar */}
          <Grid
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            sx={{ mt: 1, mb: 1, width: { xs: "100%", md: "auto" } }}
          >
            <AvatarViewer />
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
