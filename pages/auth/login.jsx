import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const CustomTextField = styled(TextField)((props) => ({}));

const CssTextField = styled(TextField)({
  // "& label.Mui-focused": {
  //   color: "#A0AAB4",
  // },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "#B2BAC2",
  // },
  // "& .MuiOutlinedInput-root": {
  //   "& fieldset": {
  //     borderColor: "#E0E3E7",
  //   },
  //   "&:hover fieldset": {
  //     borderColor: "#B2BAC2",
  //   },
  //   "&.Mui-focused fieldset": {
  //     borderColor: "#6F7E8C",
  //   },
  // },
});

export default function Login() {
  const [typeField, setTypeField] = useState("password");

  return (
    <Box
      sx={{
        backgroundColor: "green",
        width: "100%",
        height: "100vh",
        flexGrow: 1,
        background:
          "linear-gradient(to bottom, rgba(117, 19, 93, 0.9), rgba(117, 19, 93, 0.9)), url(/img/background_login_page.jpg) center center/cover no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // "-webkit-filter": "blur(5px)",
        // "-moz-filter": "blur(5px)",
        // "-o-filter": "blur(5px)",
        // "-ms-filter": "blur(5px)",
        // filter: "blur(5px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          maxWidth: 500,
          height: 580,
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <Image
          src="/img/acai_login.svg"
          alt="Imagem logo de uma fruta açai"
          // layout="fill"
          // objectFit="contain"
          width="220"
          height="220"
        />

        <TextField placeholder="Matrícula" type="text" size="small" />
        <TextField
          placeholder="Senha"
          sx={{
            marginTop: 1,
          }}
          size="small"
          type={typeField}
        />

        <Typography
          sx={{
            fontSize: 10,
            color: "#B83E94",
            fontWeight: "bold",
            mt: 1,
            "&:hover": { cursor: "pointer", textDecoration: "underline" },
          }}
        >
          Esqueci minha senha
        </Typography>

        <Button
          variant="contained"
          disableElevation
          sx={{ borderRadius: 28, width: 240, height: 40, marginTop: 6 }}
          color="success"
        >
          ACESSAR
        </Button>
      </Box>
    </Box>
  );
}
