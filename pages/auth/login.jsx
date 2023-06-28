import React, { useState, useContext } from "react";
import Image from "next/image";

//Context
import { AuthContext } from "@/context/AuthContext";
import { getCookiesServerSide } from "@/helpers/handleCookies";

//Mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";

//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SingIn() {
  const { login, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleMatricula = (event) => {
    setCpf(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    login(JSON.stringify({ cpf: cpf, password: password }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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
            maxWidth: 430,
            height: 550,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",

            ["@media (max-width:600px)"]: {
              maxWidth: "100%",
              height: "100%",
              width: "100%",
              borderRadius: 0,
              justifyContent: "center",
              backgroundColor: "transparent",
            },
          }}
        >
          <Image
            src="/img/acai_login.svg"
            alt="Imagem logo de uma fruta açai"
            // layout="fill"
            // objectFit="contain"
            width="200"
            height="200"
          />

          <TextField
            placeholder="CPF"
            type="text"
            size="small"
            value={cpf}
            onChange={handleMatricula}
            error={Boolean(error)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 240 }}
            InputProps={{
              style: {
                backgroundColor: "#F8F8F8",
                borderRadius: "28px",
              },
            }}
            inputProps={{
              maxLength: 11,
            }}
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
          />
          <TextField
            value={password}
            onChange={handlePassword}
            error={Boolean(error)}
            placeholder="Senha"
            sx={{
              marginTop: "20px",
              fontSize: 12,
              width: 240,
            }}
            size="small"
            type={showPassword ? "text" : "password"}
            InputProps={{
              style: {
                backgroundColor: "#F8F8F8",
                borderRadius: "28px",
              },

              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ cursor: "pointer" }}
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOffIcon
                      sx={{
                        color: "#B7B7B7",
                        fontSize: 18,
                        "&:hover": { color: "#7a7a7a" },
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      sx={{
                        color: "#B7B7B7",
                        fontSize: 18,
                        "&:hover": { color: "#7a7a7a" },
                      }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography
              sx={{
                fontSize: 10,
                color: "red",
                fontWeight: "bold",
                mt: 1,
              }}
            >
              * {error.message}
            </Typography>
          )}
          <Box
            sx={{
              width: 225,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                color: "#B83E94",
                fontWeight: "bold",
                mt: 1,
                "&:hover": { cursor: "pointer", textDecoration: "underline" },

                ["@media (max-width:600px)"]: {
                  color: "#fff",
                },
              }}
              onClick={handleDialog}
            >
              Esqueci minha senha
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            sx={{ borderRadius: 28, width: 240, height: 40, marginTop: "30px" }}
            color="success"
            onClick={handleLogin}
          >
            ACESSAR
          </Button>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ margin: "10px" }}
      >
        <DialogTitle id="alert-dialog-title">
          Para alteração de senha, contate a administração.
        </DialogTitle>
      </Dialog>
    </>
  );
}

export const getServerSideProps = ({ req, res }) => {
  const token = getCookiesServerSide("@acai:user", { req, res });

  if (token) {
    return {
      redirect: {
        permanent: true,
        destination: "/home",
      },
    };
  }

  return {
    props: {},
  };
};
