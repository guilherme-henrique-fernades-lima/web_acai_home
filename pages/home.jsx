import React, { useEffect, useContext, useState, useMemo } from "react";

import Image from "next/image";

//Third party libs
import moment from "moment";

//Context
import { AuthContext } from "@/context/AuthContext";

//Mui components
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

//Mui icons
import FilterListIcon from "@mui/icons-material/FilterList";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CloseIcon from "@mui/icons-material/Close";

//Custom components
import GridPainelPedidos from "components/GridPainelPedidos";
import TableEntregadoresStatus from "components/TableEntregadoresStatus";
import DatepickerField from "@/components/DatepickerField";
import RenderIconFormaPagamento from "@/components/RenderIconFormaPagamento";
import WarningNoDataFound from "@/components/WarningNoDataFound";
import {
  StatusPedido,
  formatarData,
  formatarValorBRL,
  renderTextStatusPedido,
} from "@/helpers/utils";
import { FORMA_PAGAMENTO, STATUS_PEDIDO } from "@/helpers/constants";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false); //State para controle do modal
  const [pedidos, setPedidos] = useState([]);
  const [cards, setCards] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [pedidosModalData, setPedidosModalData] = useState({}); //State pra armazenar os dados do modal
  const [detalhesEntrega, setDetalhesEntrega] = useState({});

  //States para Filtros
  const [loading, setLoading] = useState(true);
  const [statusPedido, setStatusPedido] = useState("TODAS");
  const [formaPagamento, setFormaPagamento] = useState("TODAS");
  const [dateFilter, setDateFilter] = useState(new Date());
  const [showMenssagemSemPedidos, setShowMenssagemSemPedidos] = useState(false);
  const [showMenssagemSemEntregadores, setShowMenssagemSemEntregadores] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [observacaoSobreEntrega, setObservacaoSobreEntrega] = useState("");

  const dataFormatoMoment = moment(dateFilter);
  const dataFormatada = dataFormatoMoment.format("YYYY-MM-DD");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDialog = () => {
    if (openDialog) {
      setDetalhesEntrega({});
    }
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    if (user?.token) {
      getPedidos();
      getEntregadoresDisponiveis();
    }
  }, [user]);

  useEffect(() => {
    // Cria uma revalidação dos dados a cada 30 segundos;

    const intervalID = setInterval(() => {
      getPedidosSemLoading(formaPagamento, dataFormatada, statusPedido);
      getEntregadoresDisponiveisSemLoading();
    }, 30000);
  
    return () => {
      clearInterval(intervalID);
    };

  }, [loading]);
  
  const getPedidosSemLoading = async (formaPagamento, dataFormatada, statusPedido) => {
  
    const response = await fetch(
      `/api/home/?date=${dataFormatada}&tp_pag=${
        formaPagamento === "TODAS" ? "" : formaPagamento
      }&status=${statusPedido === "TODAS" ? "" : statusPedido}`,
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
    }
  
    if (response.status === 404) {
      setShowMenssagemSemPedidos(true);
      setPedidos([]);
      setCards([]);
    }
  };
  

  async function getEntregadoresDisponiveisSemLoading() {

    const response = await fetch(`/api/home/entregadores`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });
    if (response.ok) {
      const res = await response.json();
      setEntregadores(res);
      setShowMenssagemSemEntregadores(false);
    }

    if (response.status == 404) {
      setShowMenssagemSemEntregadores(true);
    }
  }

  const getPedidos = async () => {
    setLoading(true);
    setShowMenssagemSemPedidos(false);
    const response = await fetch(
      `/api/home/?date=${dataFormatada}&tp_pag=${
        formaPagamento == "TODAS" ? "" : formaPagamento
      }&status=${statusPedido == "TODAS" ? "" : statusPedido}`,
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
      setLoading(false);
      setShowMenssagemSemPedidos(true);
      setPedidos([]);
      setCards([]);
    }
  };

  const getEntregadoresDisponiveis = async () => {
    setShowMenssagemSemEntregadores(false);
    const response = await fetch(`/api/home/entregadores`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });
    if (response.ok) {
      const res = await response.json();
      setEntregadores(res);
      setLoading(false);
    }

    if (response.status == 404) {
      setLoading(false);
      setShowMenssagemSemEntregadores(true);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pedidos.length) : 0;
  const displayedData = pedidos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <GridPainelPedidos
        status={cards}
        entregadores={entregadores}
        loading={loading}
      />

      <Grid container spacing={1} sx={{ marginTop: 0, padding: "5px" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          xl={9}
          sx={{ paddingRight: 1 }}
        >
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
            <FilterListIcon
              sx={{ fontSize: 40, marginLeft: "20px", marginRight: "20px" }}
            />

            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2.4}>
                <TextField
                  id="status_pedido"
                  select
                  fullWidth
                  placeholder="Status do pedido"
                  label="Status do pedido"
                  size="small"
                  value={statusPedido}
                  onChange={(e) => {
                    setStatusPedido(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                >
                  {STATUS_PEDIDO.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2.4}>
                <TextField
                  id="forma_pagamento"
                  select
                  fullWidth
                  placeholder="Forma de pagamento"
                  label="Forma de pagamento"
                  size="small"
                  value={formaPagamento}
                  onChange={(e) => {
                    setFormaPagamento(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                >
                  {FORMA_PAGAMENTO.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2.4}>
                <DatepickerField
                  value={dateFilter}
                  textLabel="Data dos pedidos"
                  onChange={setDateFilter}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2.4}>
                <Button
                  variant="contained"
                  disableElevation
                  fullWidth
                  onClick={getPedidos}
                >
                  FILTRAR
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            sx={{
              width: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "10px 20px",
            }}
            elevation={0}
          >
            {loading ? (
              <SkeletonTable />
            ) : (
              <TableContainer sx={{ width: "100%" }}>
                <Table
                  size="small"
                  sx={{
                    width: "100%",
                    minWidth: 900,
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
                        SEQ.
                      </CustomTableCellHeader>

                      <CustomTableCellHeader align="center">
                        N° PEDIDO
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
                        DETALHES ENTREGA
                      </CustomTableCellHeader>
                      <CustomTableCellHeader align="center">
                        DETALHES PEDIDO
                      </CustomTableCellHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedData?.map((pedido, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          transition: "all 0.3s ease",
                          height: 50,
                          border: "none",
                          "&:hover": { backgroundColor: "#f8e8ff" },
                          ".MuiTableCell-root": {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <TableCell
                          align="center"
                          sx={{
                            borderTopLeftRadius: "30px",
                            borderBottomLeftRadius: "30px",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <CustomTableCellBody align="center">
                          {pedido.id}
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
                        <CustomTableCellBody align="center">
                          {pedido.entrega?.idPedido ? (
                            <Tooltip
                              title="Visualizar observação sob entrega"
                              placement="top"
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
                                  setObservacaoSobreEntrega(pedido?.observacao);
                                  setDetalhesEntrega(pedido?.entrega);
                                  handleDialog();
                                }}
                              >
                                <MarkUnreadChatAltIcon
                                  sx={{
                                    fontSize: 24,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            "---"
                          )}
                        </CustomTableCellBody>

                        <CustomTableCellBody
                          align="center"
                          sx={{
                            borderTopRightRadius: "30px",
                            borderBottomRightRadius: "30px",
                          }}
                        >
                          <Tooltip
                            title="Visualizar detalhes do pedido"
                            placement="top"
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
                                handleOpen();
                              }}
                            >
                              <ArticleOutlinedIcon
                                sx={{
                                  fontSize: 24,
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCellBody>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {!showMenssagemSemPedidos && (
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100, 150, 200]}
                    component="div"
                    count={pedidos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);
                    }}
                    labelRowsPerPage="Linhas por página:"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} de ${
                        count !== -1 ? count : "mais de " + to
                      }`
                    }
                    labelPagination={(page) => `Página ${page + 1}`}
                    nextIconButtonProps={{
                      "aria-label": "Próxima página",
                      title: "Próxima página",
                    }}
                    previousIconButtonProps={{
                      "aria-label": "Página anterior",
                      title: "Página anterior",
                    }}
                  />
                )}
              </TableContainer>
            )}

            {showMenssagemSemPedidos && <WarningNoDataFound />}
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={3}
          xl={3}
          sx={{ height: "auto" }}
        >
          <TableEntregadoresStatus
            entregadores={entregadores}
            loading={loading}
            showMenssagemSemEntregadores={showMenssagemSemEntregadores}
          />
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
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
                onClick={handleClose}
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

      <Dialog
        open={openDialog}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ margin: "10px" }}
      >
        <DialogTitle id="alert-dialog-title">
          Pedido: {detalhesEntrega?.idPedido}
        </DialogTitle>
        <DialogContent>
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
                <TableBody>
                  <TableRow
                    sx={{
                      height: 20,
                      border: "none",
                      backgroundColor: "#fff",
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
                      Entregador
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
                      {detalhesEntrega?.motorista}
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      Data de entrega
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
                      {detalhesEntrega?.data
                        ? formatarData(detalhesEntrega?.data)
                        : ""}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      height: 20,
                      border: "none",
                      backgroundColor: "#fff",
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
                      Hora da entrega
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
                      {detalhesEntrega?.hora}
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      Observação sobre entrega
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
                      {observacaoSobreEntrega}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
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