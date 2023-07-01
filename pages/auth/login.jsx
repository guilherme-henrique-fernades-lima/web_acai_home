import React, { useState, useContext, useEffect } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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

  const [lembrarCpf, setLembrarCpf] = useState(false);

  useEffect(() => {
    getCpfLocalStorage();
  }, []);

  const getCpfLocalStorage = () => {
    const cpf = localStorage.getItem("@acaihomedelivery");

    if (cpf) {
      setLembrarCpf(true);
      setCpf(JSON.parse(cpf));
    }
  };

  function handleSaveCpfLocalStorage() {
    if (lembrarCpf) {
      localStorage.removeItem("@acaihomedelivery");
      setLembrarCpf(false);
    } else {
      localStorage.setItem("@acaihomedelivery", JSON.stringify(cpf));
      setLembrarCpf(true);
    }
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleCPFform = (event) => {
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
            onChange={handleCPFform}
            error={Boolean(error)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 280 }}
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
              width: 280,
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
              width: 280,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormGroup
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                      ["@media (min-width:601px)"]: {
                        color: "#842E6B",
                        "&.Mui-checked": {
                          color: "#842E6B",
                        },
                      },
                    }}
                    checked={lembrarCpf}
                    onChange={handleSaveCpfLocalStorage}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 10,
                      color: "#fff",
                      ["@media (min-width:601px)"]: {
                        color: "#B83E94",
                      },
                    }}
                  >
                    Lembrar CPF?
                  </Typography>
                }
              />
            </FormGroup>

            <Typography
              sx={{
                fontSize: 10,
                color: "#B83E94",
                fontWeight: "bold",
                width: "100%",
                textAlign: "right",
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
            sx={{ borderRadius: 28, width: 280, height: 40, marginTop: "30px" }}
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
