import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

//Third party libraries
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

//Context
import { AuthContext } from "@/context/AuthContext";

//Mui components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import DatepickerField from "@/components/DatepickerField";

//Formatters
import { formatCpf, formatarTelefone } from "@/helpers/utils";

import { FORMA_PAGAMENTO } from "@/helpers/constants";

//Icons
import FilterListIcon from "@mui/icons-material/FilterList";

import WarningNoDataFound from "@/components/WarningNoDataFound";

export default function Entregas() {
  const { user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  console.log(pedidos);

  const [dateFilter, setDateFilter] = useState(new Date());

  const [formaPagamento, setFormaPagamento] = useState("TODAS");
  const [entregadorFilter, setEntregadorFilter] = useState(null);
  console.log(entregadorFilter);

  useEffect(() => {
    if (user?.token) {
      getPedidos();
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
      setPedidos(res);
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
                  SEQ.
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  N° PEDIDO
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  ENTREGADOR
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  CLIENTE
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  DATA
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  HORA
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  CPF
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  AÇÃO
                </CustomTableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  transition: "all 0.3s ease",
                  height: 50,
                  border: "none",
                  // backgroundColor: pedidosParaEntrega.includes(pedido.id)
                  //   ? "#f8e8ff"
                  //   : "transparent",
                  "&:hover": { backgroundColor: "#f8e8ff" },
                  ".MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}
              >
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center">-</CustomTableCellBody>
                <CustomTableCellBody align="center"></CustomTableCellBody>
              </TableRow>
            </TableBody>
          </Table>
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
