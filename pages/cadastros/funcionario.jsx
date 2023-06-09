import React, { useState } from "react";

//Mui components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import { OPTIONS_SEXO } from "@/helpers/constants";

//Icons
import SaveIcon from "@mui/icons-material/Save";

export default function CadastroFuncionario() {
  const [nome, setNome] = useState("");
  function salvarFuncionario() {
    console.log("Entrou na função de salvar");
  }

  return (
    <Container
      sx={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: 2,
        borderRadius: "8px",
      }}
    >
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
            for="sexo"
            sx={{ fontSize: 14, fontWeight: 700 }}
          >
            Sexo
          </Typography>
          <TextField
            id="sexo"
            fullWidth
            placeholder="Selecionar"
            select
            size="small"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          >
            {OPTIONS_SEXO.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
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
