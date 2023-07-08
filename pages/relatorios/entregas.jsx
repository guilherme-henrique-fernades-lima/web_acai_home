import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

//Third party libraries
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

//Context
import { AuthContext } from "@/context/AuthContext";

//Mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TablePagination from "@mui/material/TablePagination";

import RenderIconFormaPagamento from "@/components/RenderIconFormaPagamento";
import DatepickerField from "@/components/DatepickerField";

//Formatters
import { formatarData, formatarValorBRL } from "@/helpers/utils";

//Constants
import { FORMA_PAGAMENTO } from "@/helpers/constants";

//Icons
import FilterListIcon from "@mui/icons-material/FilterList";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

import WarningNoDataFound from "@/components/WarningNoDataFound";

export default function Entregas() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [indicadores, setIndicadores] = useState([]);
  const [entregadores, setEntregadores] = useState([]);

  const [dateFilter, setDateFilter] = useState(new Date());
  const [formaPagamento, setFormaPagamento] = useState("TODAS");
  const [entregadorFilter, setEntregadorFilter] = useState(null);

  useEffect(() => {
    if (user?.token) {
      getEntregadoresAtivos();
    }
  }, [user]);

  const dataFormatoMoment = moment(dateFilter);
  const dataFormatada = dataFormatoMoment.format("YYYY-MM-DD");

  async function getPedidos() {
    const response = await fetch(
      `/api/relatorios/entregas/?date=${dataFormatada}&tp_pag=${
        formaPagamento == "TODAS" ? "" : formaPagamento
      }&cpf_motorista=${entregadorFilter != null ? entregadorFilter?.cpf : ""}`,
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
      setIndicadores(res.indicadores);
    }

    if (response.status == 400) {
      const res = await response.json();
      setPedidos(res.data);
      setIndicadores(res.indicadores);
    }
  }

  const getEntregadoresAtivos = async () => {
    const response = await fetch(`/api/relatorios/entregadores-ativos`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });

    if (response.ok) {
      const res = await response.json();
      setEntregadores(res);
    }
    if (response.status == 404) {
      setEntregadores(null);
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
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <DatepickerField
              value={dateFilter}
              textLabel="Insira a data"
              onChange={setDateFilter}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Autocomplete
              options={entregadores}
              autoHighlight
              getOptionLabel={(option) => option?.username}
              value={entregadorFilter}
              onChange={(event, newValue) => {
                setEntregadorFilter(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione o entregador"
                  size="small"
                  //InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
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
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={() => {
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
        sx={{
          width: "100%",
          padding: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          marginBottom: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
        }}
        elevation={0}
      >
        {/* <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: "#842E6B",
          }}
        >
          Quantidade de pedidos por forma de pagamento
        </Typography>

        <Divider sx={{ width: "100%" }} /> */}

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,

            color: "#842E6B",
          }}
        >
          Quantidade total de pedidos: {indicadores?.total_pedidos || 0}
        </Typography>

        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            xl={2.4}
            sx={{ height: 90, p: 1 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #842E6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "4px",
                padding: "0 20px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <PixIcon sx={{ color: "#842E6B", fontSize: 32 }} />
                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#842E6B",
                  }}
                >
                  PIX
                </Typography>
              </Stack>

              <Typography
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#842E6B",
                }}
              >
                {indicadores?.formas_pagamento?.pix || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            xl={2.4}
            sx={{ height: 90, p: 1 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #842E6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "4px",
                padding: "0 20px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <CreditCardIcon sx={{ color: "#842E6B", fontSize: 32 }} />
                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#842E6B",
                  }}
                >
                  CRÉDITO
                </Typography>
              </Stack>

              <Typography
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#842E6B",
                }}
              >
                {indicadores?.formas_pagamento?.credito || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            xl={2.4}
            sx={{ height: 90, p: 1 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #842E6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "4px",
                padding: "0 20px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <CreditCardIcon sx={{ color: "#842E6B", fontSize: 32 }} />
                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#842E6B",
                  }}
                >
                  DÉBITO
                </Typography>
              </Stack>

              <Typography
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#842E6B",
                }}
              >
                {indicadores?.formas_pagamento?.debito || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            xl={2.4}
            sx={{ height: 90, p: 1 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #842E6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "4px",
                padding: "0 20px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <LocalAtmIcon sx={{ color: "#842E6B", fontSize: 32 }} />
                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#842E6B",
                  }}
                >
                  DINHEIRO
                </Typography>
              </Stack>

              <Typography
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#842E6B",
                }}
              >
                {indicadores?.formas_pagamento?.dinheiro || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            xl={2.4}
            sx={{ height: 90, p: 1 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #842E6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "4px",
                padding: "0 20px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <LocalAtmIcon sx={{ color: "#842E6B", fontSize: 32 }} />
                <CreditCardIcon sx={{ color: "#842E6B", fontSize: 32 }} />

                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#842E6B",
                  }}
                >
                  DINHEIRO E CARTÃO
                </Typography>
              </Stack>

              <Typography
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#842E6B",
                }}
              >
                {indicadores?.formas_pagamento?.dinheiro_cartao || 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          marginBottom: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
        }}
        elevation={0}
      >
        {/* <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: "#842E6B",
          }}
        >
          Totalizadores de valores
        </Typography>

        <Divider sx={{ width: "100%" }} /> */}

        <TableContainer
          sx={{
            mt: 1,
            mb: 1,
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
                    fontSize: 16,
                    fontWeight: 400,
                    borderTopLeftRadius: "2px",
                    borderBottomLeftRadius: "2px",
                  }}
                >
                  Valor total produtos
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {indicadores?.valor_total_produtos
                    ? formatarValorBRL(indicadores?.valor_total_produtos)
                    : formatarValorBRL(0)}
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
                    fontSize: 16,
                    fontWeight: 400,
                    borderTopLeftRadius: "2px",
                    borderBottomLeftRadius: "2px",
                  }}
                >
                  Taxa de entrega
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {indicadores?.valor_total_taxa_entrega
                    ? formatarValorBRL(indicadores?.valor_total_taxa_entrega)
                    : formatarValorBRL(0)}
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  height: 20,
                  border: "none",
                  borderTop: "1px solid #ccc",
                  ".MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell
                  align="left"
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  Valor total dos pedidos
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                >
                  {indicadores?.valor_total_pedidos
                    ? formatarValorBRL(indicadores?.valor_total_pedidos)
                    : formatarValorBRL(0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
                  CLIENTE
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  DATA DE ENTREGA
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  FORM. PAGAMENTO
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  ENTREGADOR
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  VLR. TOTAL PRODUTOS
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  VLR. TAXA DE ENTREGA
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  VLR TOTAL PEDIDO
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  OBS. ENTREGA
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
                      borderTopLeftRadius: "4px",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <CustomTableCellBody align="center">
                    {pedido?.idPedido}
                  </CustomTableCellBody>
                  <CustomTableCellBody align="center">
                    {pedido?.cliente.toUpperCase()}
                  </CustomTableCellBody>
                  <CustomTableCellBody align="center">
                    <Stack direction="column">
                      <Typography
                        variant="span"
                        component="span"
                        sx={{ fontWeight: 700, fontSize: 12 }}
                      >
                        {formatarData(pedido?.data)}
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
                    <RenderIconFormaPagamento
                      formaPagamento={pedido.formaPagamento}
                    />
                  </CustomTableCellBody>
                  <CustomTableCellBody align="center">
                    {pedido.motorista}
                  </CustomTableCellBody>
                  <CustomTableCellBody align="center">
                    {formatarValorBRL(pedido.valor - pedido.taxaentrega)}
                  </CustomTableCellBody>
                  <CustomTableCellBody align="center">
                    {formatarValorBRL(pedido.taxaentrega)}
                  </CustomTableCellBody>
                  <CustomTableCellBody align="center">
                    {formatarValorBRL(pedido.valor)}
                  </CustomTableCellBody>
                  <CustomTableCellBody
                    align="center"
                    sx={{
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    {pedido.observacao}
                  </CustomTableCellBody>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pedidos?.length == 0 && <WarningNoDataFound />}

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
              `${from}-${to} de ${count !== -1 ? count : "mais de " + to}`
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
        </TableContainer>
      </Paper>
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
