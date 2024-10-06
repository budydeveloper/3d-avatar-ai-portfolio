import React from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AvatarViewer from "../components/AvatarViewer";
import ChatBox from "../components/ChatBox";

const Home = () => {
  return (
    <Container
      sx={{
        mt: 0,
        px: { xs: 1, md: 2 },
      }}
    >
      <Box
        sx={{
          my: 0,
          mx: { xs: 0, md: 2 },
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Sección del Avatar */}
          <Grid
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            sx={{
              mt: 1,
              mb: 1,
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AvatarViewer />
            </Box>
          </Grid>

          {/* Sección del Chat */}
          <Grid
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: 1,
              mb: 1,
              width: { xs: "100%", md: "auto" },
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              height: { xs: "auto", md: "500px" },
              overflowY: "auto",
            }}
          >
            {/* Caja contenedora del chat */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                p: 2,
              }}
            >
              <ChatBox />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
