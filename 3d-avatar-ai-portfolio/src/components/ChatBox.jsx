import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; // Icono para text-to-speech

const ChatBox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [messages, setMessages] = useState([
    {
      text: "¡Bienvenido! Soy Cristian Vega, ingeniero de software con más de 5 años de experiencia. Pregúntame lo que quieras sobre mis estudios, proyectos o trabajos.",
      id: 1,
      user: "Cristian Vega",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [messageId, setMessageId] = useState(2);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, id: messageId, user: "Invitado" };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInputValue("");
      setMessageId((prevId) => prevId + 1);

      setTimeout(() => handleAiResponse(newMessages), 1000);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setMessageId(2); // Reiniciar el ID de mensajes al limpiar el chat
  };

  const handleAiResponse = async (newMessages) => {
    const aiMessage = generateAiResponse();
    const newMessage = {
      text: aiMessage,
      id: messageId + 1,
      user: "Cristian Vega",
    };
    setMessages([...newMessages, newMessage]);
    setMessageId((prevId) => prevId + 2);
  };

  const generateAiResponse = () => {
    const responses = [
      "Hola, ¿cómo puedo ayudarte hoy?",
      "Entiendo, cuéntame más.",
      "¡Eso suena interesante!",
      "Estoy aquí para ayudarte.",
      "Gracias por compartir eso conmigo.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleTextToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "8px",
        backgroundColor: theme.palette.background.default,
        boxShadow: `0 0 10px ${theme.palette.grey[400]}`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          color: theme.palette.text.primary,
          padding: "16px 0",
          borderBottom: `2px solid ${theme.palette.primary.light}`,
        }}
      >
        Chat
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          height: isMobile ? "300px" : "100%",
          overflowY: "auto",
          borderBottom: `2px solid ${theme.palette.primary.light}`,
          mb: 2,
          p: 2,
          color: theme.palette.text.primary,
        }}
        ref={messagesContainerRef}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                message.user === "Cristian Vega" ? "flex-start" : "flex-end",
              mb: 2,
            }}
          >
            {message.user === "Cristian Vega" ? (
              <Avatar
                src="/personal-cv.jpg" // Cambia esta línea para usar tu imagen
                sx={{
                  width: 32,
                  height: 32,
                  marginRight: "8px",
                }}
              />
            ) : null}

            <Box
              sx={{
                maxWidth: "70%",
                p: 3,
                borderRadius: "16px",
                backgroundColor:
                  message.user === "Cristian Vega" ? "#f1f1f1" : "#FFFACD",
                color: message.user === "Cristian Vega" ? "#000" : "#000",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "relative",
                fontFamily: "Roboto, Arial, sans-serif",
                fontSize: "1rem",
                textAlign: "left",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontFamily: "Roboto, Arial, sans-serif",
                  fontSize: "1.1rem",
                }}
              >
                {message.user}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, Arial, sans-serif",
                  textAlign: "left",
                  fontSize: "1rem",
                  mb: 1, // Añadir un margen inferior para el texto
                }}
              >
                {message.text}
              </Typography>
              {/* Botón para text-to-speech solo para Cristian Vega */}
              {message.user === "Cristian Vega" && (
                <IconButton
                  onClick={() => handleTextToSpeech(message.text)}
                  sx={{ 
                    position: "absolute", 
                    right: 5, // Ajustar a la derecha
                    bottom: 5, // Ajustar hacia abajo
                    color: theme.palette.primary.main,
                    fontSize: "1.2rem", // Ajustar el tamaño del icono si es necesario
                  }}
                >
                  <VolumeUpIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `2px solid ${theme.palette.primary.light}`,
          p: 1,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Escribe un mensaje..."
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          sx={{
            mr: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              borderColor: theme.palette.primary.main,
              backgroundColor: "#FFFFFF",
              fontFamily: "Roboto, Arial, sans-serif",
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.dark,
              },
            },
            "& .MuiInputBase-input": {
              fontFamily: "Roboto, Arial, sans-serif",
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            borderRadius: "20px",
            p: isMobile ? "10px" : "10px 20px",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
          }}
          onClick={handleClearChat}
        >
          {isMobile ? <DeleteIcon /> : <>Clean <DeleteIcon sx={{ ml: 1 }} /></>}
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            borderRadius: "20px",
            p: isMobile ? "10px" : "10px 20px",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
            ml: 1,
          }}
          onClick={handleSend}
        >
          {isMobile ? <SendIcon /> : <>Enviar <SendIcon sx={{ ml: 1 }} /></>}
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
