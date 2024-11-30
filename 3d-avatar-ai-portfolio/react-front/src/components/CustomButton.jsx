import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const CustomButton = ({ color, text, onClick }) => {
  const theme = useTheme();

  // Definir el color con base en el tema
  const buttonColor =
    theme.palette[color]?.main || theme.palette.secondary.main;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: buttonColor,
        color: theme.palette.getContrastText(buttonColor),
        "&:hover": {
          backgroundColor:
            theme.palette[color]?.dark || theme.palette.secondary.dark,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
