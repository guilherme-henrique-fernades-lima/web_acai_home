import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import moment from "moment";

//Context
import { AuthContext } from "@/context/AuthContext";

//Mui icons
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
1;
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";

//Icons
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

//Custon components
import RenderIconFormaPagamento from "@/components/RenderIconFormaPagamento";
import {
  StatusPedido,
  formatarData,
  formatarValorBRL,
  renderTextStatusPedido,
} from "@/helpers/utils";

import WarningNoDataFound from "@/components/WarningNoDataFound";

export default function EnviarPedidos() {
  const { user } = useContext(AuthContext);

  const [openModalDetalhes, setOpenModalDetalhes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entregadoresAtivos, setEntregadoresAtivos] = useState([]);
  const [entregadoresAtivosFiltro, setEntregadoresAtivosFiltro] = useState([]);

  const [openModalEnvio, setOpenModalEnvio] = useState(false);
  const [radioSelected, setRadioSelected] = useState(null);
  const [pedidosParaEntrega, setPedidosParaEntrega] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [cards, setCards] = useState([]);
  const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);
  const [pedidosModalData, setPedidosModalData] = useState({});
  const [showMenssagemSemPedidos, setShowMenssagemSemPedidos] = useState(false);

  const [bairros, setBairros] = useState([]);
  const [bairroFilter, setBairroFilter] = useState(null);

  useEffect(() => {
    if (user?.token) {
      getEntregadoresDisponiveis();
      getPedidos();
      getBairros();
    }
  }, [user]);

  const handleOpenCloseModalDetalhes = () =>
    setOpenModalDetalhes(!openModalDetalhes);

  const getBairros = async () => {
    const response = await fetch(`/api/cadastros/listagem-bairros`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });

    if (response.ok) {
      const res = await response.json();
      setBairros(res);
    }

    if (response.status == 404) {
      setBairros(null);
    }
  };

  const getPedidos = async () => {
    setLoading(true);
    setShowMenssagemSemPedidos(false);
    const response = await fetch(
      `/api/cadastros/enviar-pedidos/?bairro=${
        bairroFilter == null ? "" : bairroFilter?.nome
      }`,
      {
        method: "GET",
        headers: {
          Authorization: user.token,
        },
      }
    );

    if (response.ok) {
      const res = await response.json();
      setPedidos(res.data);
      setCards(res.status);
      setLoading(false);
    }

    if (response.status == 404) {
      setPedidos([]);
      setCards([]);
      setLoading(false);
      setShowMenssagemSemPedidos(true);
    }
  };

  const getEntregadoresDisponiveis = async () => {
    const response = await fetch(`/api/cadastros/motoristas-ativos`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });

    if (response.status == 200) {
      const res = await response.json();
      setEntregadoresAtivos(res);
      setEntregadoresAtivosFiltro(res);
    }
  };

  async function enviarPedidosEntregador() {
    const payload = getPayloadPedidosEnvio();
    console.log(payload);

    const response = await fetch(`/api/cadastros/enviar-pedidos`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      if (pedidosParaEntrega.length > 1) {
        toast.success("Pedidos enviados com sucesso!");
      } else {
        toast.success("Pedido enviado com sucesso!");
      }

      setRadioSelected(null);
      setEntregadorSelecionado(null);
      setPedidosParaEntrega([]);

      handleOpenCloseModalEnvio();
      getPedidos();
    }
  }

  const handleOpenCloseModalEnvio = () => setOpenModalEnvio(!openModalEnvio);

  function getPayloadPedidosEnvio() {
    const data = {
      cpf_motorista: entregadorSelecionado ? entregadorSelecionado?.cpf : null,
      motorista: entregadorSelecionado ? entregadorSelecionado?.username : null,
      cpf_user: user?.cpf,
      usuario: user?.username,
      pedidos: pedidosParaEntrega,
    };

    return data;
  }

  function handlePedidosEnvioEntregador(idPedido) {
    if (pedidosParaEntrega.includes(idPedido)) {
      // Se o ID já estiver selecionado, remova-o do array
      setPedidosParaEntrega(
        pedidosParaEntrega.filter((selectedId) => selectedId !== idPedido)
      );
    } else {
      // Caso contrário, adicione o ID ao array
      setPedidosParaEntrega([...pedidosParaEntrega, idPedido]);
    }
  }

  const handleSelectEntregador = (entregador) => {
    if (radioSelected === entregador.id) {
      setEntregadorSelecionado(null);
      setRadioSelected(null);
    } else {
      setRadioSelected(entregador.id);
      setEntregadorSelecionado(entregador);
    }
  };

  let typingTimer;
  const handleChangeInputDelaySearch = (string) => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      filtrarEntregador(string);
    }, 500);
  };

  function filtrarEntregador(string) {
    const entregadores = entregadoresAtivos.filter((obj) =>
      obj.username.includes(string)
    );
    setEntregadoresAtivosFiltro(entregadores);
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Paper
        sx={{
          width: "100%",
          padding: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          marginBottom: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
        elevation={0}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} lg={2.4} xl={2.4}>
            <Autocomplete
              options={bairros}
              autoHighlight
              getOptionLabel={(option) => option?.nome}
              value={bairroFilter}
              onChange={(event, newValue) => {
                setBairroFilter(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione o bairro"
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2} lg={1.5} xl={1.5}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={() => {
                setPedidosParaEntrega([]);
                getPedidos();
              }}
              endIcon={<FilterListIcon />}
            >
              FILTRAR
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          width: "100%",
          p: 1,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            mb: 1,
            mt: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            disableElevation
            onClick={handleOpenCloseModalEnvio}
            endIcon={<SendIcon />}
            disabled={pedidosParaEntrega.length > 0 ? false : true}
          >
            Enviar pedidos
          </Button>

          <Typography
            sx={{
              border: "2px solid #842E6B",
              padding: "5px 10px",
              color: "#842E6B",
              borderRadius: "8px",
              fontWeight: 900,
              ["@media (max-width:599px)"]: {
                display: "none",
              },
            }}
          >
            Total de pedidos: {cards?.TOTAL || "--"}
          </Typography>
        </Stack>

        {loading ? (
          <SkeletonTable />
        ) : (
          <TableContainer>
            <Table
              size="small"
              sx={{
                width: "100%",

                borderRadius: "8px",
                "& .tableCellClasses.root": {
                  borderBottom: "none",
                },
              }}
            >
              <TableHead
                sx={{
                  height: 50,
                  borderBottom: "1px solid #ccc",
                  overflow: "hidden",
                }}
              >
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <CustomTableCellHeader align="center">
                    SELECIONAR
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    SEQ.
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    N° PEDIDO
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    CLIENTE
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    BAIRRO
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    VALOR
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    FORM. PAGAMENTO
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    STATUS
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    DATA/HORA
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    DETALHES PEDIDO
                  </CustomTableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidos?.map((pedido, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      transition: "all 0.3s ease",
                      height: 50,
                      border: "none",
                      backgroundColor: pedidosParaEntrega.includes(pedido.id)
                        ? "#f8e8ff"
                        : "transparent",
                      "&:hover": { backgroundColor: "#f8e8ff" },
                      ".MuiTableCell-root": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                      }}
                    >
                      <Checkbox
                        onChange={() => handlePedidosEnvioEntregador(pedido.id)} // Passa o ID do pedido aqui
                        checked={pedidosParaEntrega.includes(pedido.id)} // Verifica se o pedido está selecionado
                      />
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>

                    <CustomTableCellBody align="center">
                      {pedido.id}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="left">
                      {pedido?.nome.toUpperCase()}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {pedido?.bairro.toUpperCase()}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {formatarValorBRL(pedido.valor)}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      <RenderIconFormaPagamento
                        formaPagamento={pedido.formaPagamento}
                      />
                    </CustomTableCellBody>

                    <CustomTableCellBody align="center">
                      <StatusPedido status={pedido.status}>
                        {renderTextStatusPedido(pedido.status)}
                      </StatusPedido>
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      <Stack direction="column">
                        <Typography
                          variant="span"
                          component="span"
                          sx={{ fontWeight: 700, fontSize: 12 }}
                        >
                          {formatarData(pedido.data)}
                        </Typography>
                        <Typography
                          variant="span"
                          component="span"
                          sx={{ fontWeight: 400, fontSize: 10 }}
                        >
                          {pedido.hora}
                        </Typography>
                      </Stack>
                    </CustomTableCellBody>
                    <CustomTableCellBody
                      align="center"
                      sx={{
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                      }}
                    >
                      <IconButton
                        sx={{
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          border: "1px solid transparent",
                          "&:hover": {
                            color: "#B83E94",
                            border: "1px solid #b83e94",
                          },
                        }}
                        onClick={() => {
                          setPedidosModalData(pedido);
                          handleOpenCloseModalDetalhes();
                        }}
                      >
                        <ArticleOutlinedIcon
                          sx={{
                            fontSize: 24,
                          }}
                        />
                      </IconButton>
                    </CustomTableCellBody>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {showMenssagemSemPedidos && <WarningNoDataFound />}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModalEnvio}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModalEnvio}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: 450,
                width: "100%",
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: "2px",
                //overflow: "hidden",
                maxHeight: 700,
                height: "100%",

                ["@media (max-width:600px)"]: {
                  // maxHeight: "100%",
                  // height: "100%",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 100,
                  width: "100%",
                  borderBottom: "1px solid #ccc",
                  padding: "10px 20px",
                  backgroundColor: "#842E6B",
                }}
              >
                <IconButton
                  aria-label="enviar"
                  size="large"
                  color="error"
                  onClick={() => {
                    handleOpenCloseModalEnvio();
                    setEntregadorSelecionado(null);
                    setRadioSelected(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" sx={{ color: "#fff" }} />
                </IconButton>

                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    textAlign: "left",
                    width: "100%",
                    marginLeft: "20px",
                    color: "#fff",
                  }}
                >
                  SELECIONE O ENTREGADOR
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 20px",
                  width: "100%",
                  height: 60,
                  borderBottom: "1px solid #ccc",
                }}
              >
                <TextField
                  id="entregador"
                  fullWidth
                  placeholder="Procurar..."
                  type="text"
                  size="small"
                  //value={nomeEntregadorSearch}
                  onChange={(e) =>
                    handleChangeInputDelaySearch(e.target.value.toUpperCase())
                  }
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  width: "100%",
                  height: 500,
                  ".firefoxScrollBar": {
                    "scrollbar-width": "auto",
                    "scrollbar-color": "#842E6B #f8e8ff",
                  },
                  "::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "::-webkit-scrollbar-track": {
                    boxShadow: "nset 0 0 6px grey",
                    //borderRadius: "5px",
                    backgroundColor: "#f8e8ff",
                  },
                  "::-webkit-scrollbar-thumb": {
                    backgroundColor: "#842E6B",
                    //borderRadius: "8px",
                    height: "2px",
                  },
                }}
              >
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <RadioGroup>
                    {entregadoresAtivosFiltro?.map((entregador) => (
                      <Box
                        key={entregador?.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "100%",
                          cursor: "pointer",
                          padding: "10px 20px",
                          height: 60,

                          "&:hover": { backgroundColor: "#f8e8ff" },
                        }}
                        onClick={() => {
                          handleSelectEntregador(entregador);
                        }}
                      >
                        <FormControlLabel
                          value={entregador.id}
                          control={<Radio />}
                          // onClick={(e) => {
                          //   setRadioSelected(e.target.value);
                          // }}
                          checked={radioSelected === entregador.id}
                          onClick={() => handleSelectEntregador(entregador)}
                          sx={{ marginRight: 0 }}
                        />
                        <RenderUserRow username={entregador?.username} />
                      </Box>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 100,
                  width: "100%",
                  borderTop: "1px solid #ccc",
                  padding: "10px 20px",
                  backgroundColor: "#842E6B",
                }}
              >
                {entregadorSelecionado ? (
                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      border: "2px solid #fff",
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <>
                      <PersonIcon sx={{ fontSize: 24, color: "#fff" }} />
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: 12,
                          textAlign: "left",
                          width: "100%",
                          marginLeft: "10px",
                          color: "#fff",
                        }}
                      >
                        {entregadorSelecionado?.username}
                      </Typography>
                    </>
                  </Stack>
                ) : (
                  <div />
                )}

                <Button
                  disabled={entregadorSelecionado ? false : true}
                  aria-label="enviar"
                  variant="contained"
                  disableElevation
                  size="large"
                  color="success"
                  endIcon={<SendIcon fontSize="inherit" />}
                  onClick={enviarPedidosEntregador}
                >
                  ENVIAR
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Paper>

      <Modal
        open={openModalDetalhes}
        onClose={handleOpenCloseModalDetalhes}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModalDetalhes}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "8px",
              padding: "20px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              minHeight: 400,
              maxHeight: 900,
              height: "auto",
              maxHeight: "80%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                position: "relative",
                width: "100%",
              }}
            >
              <IconButton
                size="medium"
                color="error"
                onClick={handleOpenCloseModalDetalhes}
                sx={{ position: "absolute", right: 0 }}
              >
                <CloseIcon fontSize="inherit" sx={{ color: "red" }} />
              </IconButton>

              <Typography
                variant="h6"
                component="h3"
                sx={{ color: "#B83E94", fontWeight: 900, fontSize: 16 }}
              >
                Detalhes do pedido
              </Typography>
            </Box>

            <Divider sx={{ width: "100%", marginBottom: 2, marginTop: 2 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#212529", fontWeight: 700, fontSize: 12 }}
                >
                  N° Pedido
                </Typography>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: "#B7B7B7",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "0px 25px",
                    backgroundColor: "#FAFAFA",
                    borderRadius: "28px",
                    border: "1px solid #b7b7b7",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {pedidosModalData?.id}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#000", fontWeight: 900, fontSize: 26 }}
                >
                  {pedidosModalData?.valor &&
                    formatarValorBRL(pedidosModalData?.valor)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <StatusPedido status={pedidosModalData?.status}>
                    {renderTextStatusPedido(pedidosModalData?.status)}
                  </StatusPedido>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignItems: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <TableContainer
                sx={{
                  mt: 1,
                  mb: 1,
                  border: "1px solid #ebebeb",
                  borderRadius: "8px",
                }}
              >
                <Table
                  size="small"
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                    "& .tableCellClasses.root": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableBody>
                    <TableRow
                      sx={{
                        height: 20,
                        border: "none",
                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Cliente
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.nome}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: 20,
                        border: "none",
                        backgroundColor: "#f5f5f5",
                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Telefone
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.celular}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: 14,
                        border: "none",
                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Endereço
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.logradouro} -{" "}
                        {pedidosModalData?.numLogr}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: 20,
                        border: "none",
                        backgroundColor: "#f5f5f5",
                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Complemento
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.complLogr}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: 20,
                        border: "none",

                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Ponto de referência
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.pontoreferencia}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: 20,
                        border: "none",
                        backgroundColor: "#f5f5f5",
                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Bairro
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.bairro}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: 20,
                        border: "none",

                        ".MuiTableCell-root": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopLeftRadius: "2px",
                          borderBottomLeftRadius: "2px",
                        }}
                      >
                        Observação do pedido
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          borderTopRightRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }}
                      >
                        {pedidosModalData?.observacao}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            <RenderModoPagamento
              formaPagamento={pedidosModalData?.formaPagamento}
            />

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TableContainer
                sx={{
                  mt: 1,
                  mb: 1,
                  border: "1px solid #ebebeb",
                  borderRadius: "8px",
                }}
              >
                <Table
                  size="small"
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                    "& .tableCellClasses.root": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableHead
                    sx={{
                      height: 20,
                      borderBottom: "1px solid #ccc",
                      overflow: "hidden",
                    }}
                  >
                    <TableRow sx={{ "& td": { border: 0 } }}>
                      <TableCell
                        align="left"
                        sx={{ fontSize: 12, fontWeight: 900 }}
                      >
                        PRODUTO(S)
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: 12, fontWeight: 900 }}
                      >
                        QUANTIDADE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pedidosModalData?.produtos?.map((produto, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          height: 20,
                          border: "none",
                          backgroundColor: index % 2 ? "#f5f5f5" : "#fff",
                          ".MuiTableCell-root": {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: 12,
                            fontWeight: 400,
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Image
                            src={`https://www.acaihomedelivery.com.br/sistema/images/arquivos/${produto?.imagem}`}
                            alt={produto?.titulo}
                            width={50}
                            height={50}
                          />
                          <Box sx={{ ml: 1 }} />
                          {produto?.titulo}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontSize: 12,
                            fontWeight: 400,
                            borderTopRightRadius: "2px",
                            borderBottomRightRadius: "2px",
                          }}
                        >
                          {produto?.quantidade}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

function RenderUserRow(props) {
  const { username } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AccountCircleIcon sx={{ fontSize: 40, color: "#842E6B" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 900,
            color: "#2e2e2e",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          {username}
        </Typography>
      </Box>
    </Box>
  );
}

const CustomTableCellHeader = styled(TableCell)((props) => ({
  fontSize: 12,
  color: props.theme.palette.colors.text_title,
  fontFamily: "Lato, sans-serif",
  fontWeight: 900,
}));

const CustomTableCellBody = styled(TableCell)((props) => ({
  fontSize: 12,
  color: props.theme.palette.colors.text_title,
  fontFamily: "Lato, sans-serif",
  fontWeight: 400,
}));

function SkeletonTable() {
  return (
    <Paper
      sx={{
        width: "100%",
        padding: "20px",
        marginBottom: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      elevation={0}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
        (item, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={"100%"}
            height={20}
            sx={{ mt: 1, mb: 1 }}
          />
        )
      )}
    </Paper>
  );
}

function RenderModoPagamento(props) {
  const { formaPagamento } = props;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: `1px solid ${formaPagamento == "PIX" ? "red" : "#20202033"}`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <PixIcon
          sx={{ color: formaPagamento == "PIX" ? "red" : "#20202033" }}
        />
        <Typography
          variant="span"
          component="span"
          sx={{
            fontWeight: 400,
            fontSize: 10,
            color: formaPagamento == "PIX" ? "red" : "#20202033",
          }}
        >
          Pix
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: `1px solid ${
            formaPagamento == "DEBITO" ? "red" : "#20202033"
          }`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <CreditCardIcon
          sx={{ color: formaPagamento == "DEBITO" ? "red" : "#20202033" }}
        />
        <Typography
          variant="span"
          component="span"
          sx={{
            fontWeight: 400,
            fontSize: 10,
            color: formaPagamento == "DEBITO" ? "red" : "#20202033",
          }}
        >
          Débito
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: `1px solid ${
            formaPagamento == "CREDITO" ? "red" : "#20202033"
          }`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <CreditCardIcon
          sx={{ color: formaPagamento == "CREDITO" ? "red" : "#20202033" }}
        />
        <Typography
          variant="span"
          component="span"
          sx={{
            fontWeight: 400,
            fontSize: 10,
            color: formaPagamento == "CREDITO" ? "red" : "#20202033",
          }}
        >
          Crédito
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: `1px solid ${
            formaPagamento == "DINHEIRO" ? "red" : "#20202033"
          }`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <LocalAtmIcon
          sx={{ color: formaPagamento == "DINHEIRO" ? "red" : "#20202033" }}
        />
        <Typography
          variant="span"
          component="span"
          sx={{
            fontWeight: 400,
            fontSize: 10,
            color: formaPagamento == "DINHEIRO" ? "red" : "#20202033",
          }}
        >
          Dinheiro
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: `1px solid ${
            formaPagamento == "DINHEIRO_CARTAO" ? "red" : "#20202033"
          }`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <LocalAtmIcon
            sx={{
              color: formaPagamento == "DINHEIRO_CARTAO" ? "red" : "#20202033",
            }}
          />
          <CreditCardIcon
            sx={{
              color: formaPagamento == "DINHEIRO_CARTAO" ? "red" : "#20202033",
            }}
          />
        </Box>
        <Typography
          variant="span"
          component="span"
          sx={{
            fontWeight: 400,
            fontSize: 10,
            color: formaPagamento == "DINHEIRO_CARTAO" ? "red" : "#20202033",
          }}
        >
          Misto
        </Typography>
      </Box>
    </Box>
  );
}
