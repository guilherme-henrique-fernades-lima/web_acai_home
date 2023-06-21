import React, { useState, useEffect, useContext } from "react";

//Third party libraries
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

//Mui components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";

//Custom components
import { FUNCOES, IS_ACTIVE, UF_ESTADO } from "@/helpers/constants";

//Icons
import SaveIcon from "@mui/icons-material/Save";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//Schema validação
import { funcionarioSchema } from "@/schemas/funcionario";

//Context
import { AuthContext } from "@/context/AuthContext";

export default function CadastroFuncionario() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    resetField,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(funcionarioSchema),
  });

  const [userName, setUserName] = useState("");
  const [cpf, setCpf] = useState("");
  const [funcao, setFuncao] = useState("");
  const [active, setActive] = useState(false);
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numLogr, setNumLogr] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [observacaoEntregador, setObservacaoEntregador] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.token) {
      getUserData();
    }
  }, []);

  async function getUserData() {
    setLoading(true);
    const response = await fetch(
      `/api/cadastros/funcionario/?id=${router.query?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: user?.token,
        },
      }
    );

    if (response.ok) {
      const res = await response.json();

      setUserName(res.username);
      setCpf(res.cpf);
      setFuncao(res.funcao);
      setActive(res.is_active);
      setShowPassword(res.password);
      setObservacaoEntregador(res.observacao);

      setLoading(false);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function salvarFuncionario() {
    const payload = getPayload();

    const response = await fetch(`/api/auth/users/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast.success("Funcionário cadastrado com sucesso!");
    } else {
      toast.error("Erro ao cadastrar funcionário!");
    }
  }

  async function editarDadosFuncionario() {
    console.log("Entrou na função de editar");

    const payload = getPayload();

    const response = await fetch(``, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (response.status == 200) {
      toast.success("Dados atualizados com sucesso!");
    } else {
      toast.error("Erro ao atualizar cadastro do funcionário!");
    }
  }

  function getPayload() {
    const payload = {
      username: userName.toUpperCase(),
      email: null,
      cpf: cpf,
      funcao: funcao,
      is_active: false,
      cep: cep,
      logradouro: logradouro ? logradouro.toUpperCase() : null,
      numLogr: numLogr ? numLogr.toUpperCase() : null,
      complLogr: complemento ? complemento.toUpperCase() : null,
      bairro: bairro ? bairro.toUpperCase() : null,
      cidade: cidade ? cidade.toUpperCase() : null,
      estado: estado ? estado.toUpperCase() : null,
      observacao: observacaoEntregador ? observacaoEntregador : null,
      password: password,
      avatar: null,
    };

    return payload;
  }

  //TODO: Inserir imagem via htmlForm de cadastro de funcionário
  // avatar = models.CharField(max_length=100, null=True)

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
        <GroupAddIcon
          sx={{
            fontSize: { xs: 22, sm: 22, md: 28, lg: 30, xl: 30 },
            marginRight: "10px",
          }}
        />
        <Typography
          component="h4"
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 14, sm: 16, md: 16, lg: 22, xl: 26 },
          }}
        >
          Cadastrar funcionário
        </Typography>
      </Stack>

      <Divider sx={{ marginTop: 1, marginBottom: 3 }} />
      <Box
        component="form"
        onSubmit={handleSubmit(() => {
          salvarFuncionario();
        })}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              component="label"
              htmlFor="userName"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Nome
            </Typography>
            <TextField
              id="userName"
              {...register("username")}
              error={Boolean(errors.username)}
              fullWidth
              placeholder="Digite o nome do funcionário"
              type="text"
              size="small"
              value={userName || ""}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
            <Typography sx={{ color: "#f00", fontSize: "12px" }}>
              {errors.username?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              component="label"
              htmlFor="cpf"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              CPF
            </Typography>
            <TextField
              {...register("cpf")}
              id="cpf"
              error={Boolean(errors.cpf)}
              required
              fullWidth
              placeholder="Digite o CPF do funcionário"
              type="text"
              size="small"
              value={cpf || ""}
              onChange={(e) => {
                setCpf(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 11,
              }}
              onInput={(e) =>
                (e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1"))
              }
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
            <Typography sx={{ color: "#f00", fontSize: "12px" }}>
              {errors.cpf?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              component="label"
              htmlFor="endereco"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Endereço
            </Typography>
            <TextField
              id="endereco"
              fullWidth
              placeholder="Digite seu e-mail"
              type="text"
              size="small"
              value={logradouro}
              onChange={(e) => {
                setLogradouro(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography
              component="label"
              htmlFor="numero"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Número
            </Typography>
            <TextField
              id="numero"
              fullWidth
              placeholder="Número da casa"
              type="text"
              size="small"
              value={numLogr}
              onChange={(e) => {
                setNumLogr(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography
              component="label"
              htmlFor="cep"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              CEP
            </Typography>
            <TextField
              id="cep"
              fullWidth
              placeholder="00000-000"
              type="text"
              size="small"
              value={cep}
              onChange={(e) => {
                setCep(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 8,
              }}
              onInput={(e) =>
                (e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1"))
              }
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              component="label"
              htmlFor="complemento"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Complemento
            </Typography>
            <TextField
              id="complemento"
              fullWidth
              placeholder="Digite a cidade"
              type="text"
              size="small"
              value={complemento}
              onChange={(e) => {
                setComplemento(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              component="label"
              htmlFor="bairro"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Bairro
            </Typography>
            <TextField
              id="bairro"
              fullWidth
              placeholder="Digite o bairro"
              type="text"
              size="small"
              value={bairro}
              onChange={(e) => {
                setBairro(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography
              component="label"
              htmlFor="cidade"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Cidade
            </Typography>
            <TextField
              id="cidade"
              fullWidth
              placeholder="Digite a cidade"
              type="text"
              size="small"
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography
              component="label"
              htmlFor="estado"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Estado
            </Typography>

            <TextField
              id="estado"
              fullWidth
              placeholder="Selecione o estado"
              select
              size="small"
              value={estado}
              onChange={(e) => {
                setEstado(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            >
              {UF_ESTADO.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography
              component="label"
              htmlFor="funcao"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Função
            </Typography>
            <TextField
              id="funcao"
              {...register("funcao")}
              error={Boolean(errors.funcao)}
              fullWidth
              placeholder="Selecionar"
              select
              size="small"
              value={funcao || ""}
              onChange={(e) => {
                setFuncao(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            >
              {FUNCOES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography sx={{ color: "#f00", fontSize: "12px" }}>
              {errors.funcao?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography
              component="label"
              htmlFor="is_active"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Está ativo?
            </Typography>
            <TextField
              id="is_active"
              {...register("is_active")}
              error={Boolean(errors.is_active)}
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
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
                },
              }}
            >
              {IS_ACTIVE.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography sx={{ color: "#f00", fontSize: "12px" }}>
              {errors.is_active?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              component="label"
              htmlFor="password"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Senha
            </Typography>
            <TextField
              id="password"
              {...register("password")}
              error={Boolean(errors.password)}
              fullWidth
              type={showPassword ? "text" : "password"}
              size="small"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              inputProps={{
                maxLength: 13,
              }}
              InputProps={{
                style: {
                  // borderRadius: "28px",
                  color: "#3b3b3b",
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
                          color: "#3b3b3b",
                          fontSize: 18,
                          "&:hover": { color: "#7a7a7a" },
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          color: "#3b3b3b",
                          fontSize: 18,
                          "&:hover": { color: "#7a7a7a" },
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ color: "#f00", fontSize: "12px" }}>
              {errors.password?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              component="label"
              htmlFor="observacao"
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              Observação sobre o funcionário
            </Typography>
            <TextField
              id="observacao"
              multiline
              rows={4}
              fullWidth
              placeholder="Aqui você pode inserir informações adicionais/histórico sobre o funcionário."
              type="text"
              size="small"
              value={observacaoEntregador}
              onChange={(e) => {
                setObservacaoEntregador(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              autoComplete="off"
              InputProps={{
                style: {
                  borderRadius: "4px",
                  color: "#3b3b3b",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SaveIcon />}
              disableElevation
            >
              CADASTRAR
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// ESTRATEGY htmlFor AVOID DELAY INPUT ON htmlForMS
// function App() {
//   const [query, setQuery] = useState("");
//   const [displayMessage, setDisplayMessage] = useState("");

//   useEffect(() => {
//     const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
//     return () => clearTimeout(timeOutId);
//   }, [query]);

//   return (
//     <>
//       <input
//         type="text"
//         value={query}
//         onChange={event => setQuery(event.target.value)}
//       />
//       <p>{displayMessage}</p>
//     </>
//   );
// }
