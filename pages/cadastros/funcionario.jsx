import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

//Mui components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import { FUNCOES, IS_ACTIVE } from "@/helpers/constants";

//Icons
import SaveIcon from "@mui/icons-material/Save";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function CadastroFuncionario() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [funcao, setFuncao] = useState("");
  const [active, setActive] = useState("");

  function salvarFuncionario() {
    console.log("Entrou na função de salvar");
    toast.success("Funcionário cadastrado com sucesso!");
    toast.error("Erro ao cadastrar funcionário!");
  }

  return (
    <Container
      sx={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: 2,
        borderRadius: "8px",
      }}
    >
      <Toaster position="bottom-center" reverseOrder={true} />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <GroupAddIcon sx={{ fontSize: 34, marginRight: "10px" }} />
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontWeight: 700, fontSize: 26 }}
        >
          Cadastrar funcionário
        </Typography>
      </Stack>

      <Divider sx={{ marginTop: 1, marginBottom: 3 }} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography
            component="label"
            for="nome"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            Nome
          </Typography>
          <TextField
            id="nome"
            fullWidth
            placeholder="Digite seu nome"
            type="text"
            size="small"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            component="label"
            for="sobrenome"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            Sobrenome
          </Typography>
          <TextField
            id="sobrenome"
            fullWidth
            placeholder="Digite seu sobrenome"
            type="text"
            size="small"
            value={sobrenome}
            onChange={(e) => {
              setSobrenome(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            component="label"
            for="telefone"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            Telefone
          </Typography>
          <TextField
            id="telefone"
            fullWidth
            placeholder="(00) 0 0000-0000"
            type="text"
            size="small"
            value={telefone}
            onChange={(e) => {
              setTelefone(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={6}>
          <Typography
            component="label"
            for="email"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            E-mail
          </Typography>
          <TextField
            id="email"
            fullWidth
            placeholder="Digite seu e-mail"
            type="text"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={6}>
          <Typography
            component="label"
            for="funcao"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            Função
          </Typography>
          <TextField
            id="funcao"
            fullWidth
            placeholder="Selecionar"
            select
            size="small"
            value={funcao}
            onChange={(e) => {
              setFuncao(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          >
            {FUNCOES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <Typography
            component="label"
            for="is_active"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            Está ativo?
          </Typography>
          <TextField
            id="is_active"
            fullWidth
            placeholder="Selecionar"
            select
            size="small"
            value={active}
            onChange={(e) => {
              setActive(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          >
            {IS_ACTIVE.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            endIcon={<SaveIcon />}
            disableElevation
            onClick={salvarFuncionario}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
("");
