import React, { useEffect, useContext, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import Image from "next/image";

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
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

//Mui icons
import FilterListIcon from "@mui/icons-material/FilterList";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

//Custom components
import GridPainelPedidos from "components/GridPainelPedidos";
import TableEntregadoresStatus from "components/TableEntregadoresStatus";
import DatepickerField from "@/components/DatepickerField";
import {
  StatusPedido,
  BadgeZonaEntrega,
  RenderIconFormaPagamento,
  BadgeStatusEntregador,
  formatarData,
  formatarValorBRL,
} from "@/helpers/utils";
import {
  FORMA_PAGAMENTO,
  STATUS_PEDIDO,
  ZONA_ENTREGA,
} from "@/helpers/constants";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [pedidos, setPedidos] = useState([]);
  const [cards, setCards] = useState([]);
  const [pedidosModalData, setPedidosModalData] = useState({}); //State pra armazenar os dados do modal

  //States para Filtros
  const [zonaEntrega, setZonaEntrega] = useState("TODAS");
  const [statusPedido, setStatusPedido] = useState("TODAS");
  const [formaPagamento, setFormaPagamento] = useState("TODAS");
  const [dateFilter, setDateFilter] = useState(new Date());

  console.log("dateFilter: ", dateFilter);

  const [open, setOpen] = useState(false); //State para controle do modal

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(pedidosModalData);

  // const { evento } = useWebSocket();

  // useEffect(() => {
  //   if (evento.NOVO_PEDIDO) {
  //     //Logica de negocio
  //     console.log("EVENTO>>>", evento);
  //   }
  // }, [evento]);

  useEffect(() => {
    const getPedidos = async () => {
      const req = await fetch(
        `/api/pedidos/?date=&tp_pag=${
          formaPagamento == "TODAS" ? "" : formaPagamento
        }&status=${statusPedido == "TODAS" ? "" : statusPedido}&zona=`,
        {
          method: "GET",
          headers: {
            Authorization: user.token,
          },
        }
      );

      if (req.status == 200) {
        const res = await req.json();
        setPedidos(res.data);
        setCards(res.status);
      }
    };

    user?.token && getPedidos();
  }, [user]);

  return (
    <>
      <GridPainelPedidos status={cards} />

      <Grid container spacing={1} sx={{ marginTop: 0, padding: "5px" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
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
                  id="zona_entrega"
                  select
                  fullWidth
                  placeholder="Zona de entrega"
                  label="Zona de entrega"
                  size="small"
                  value={zonaEntrega}
                  onChange={(e) => {
                    setZonaEntrega(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                >
                  {ZONA_ENTREGA.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

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
                <Button variant="contained" disableElevation fullWidth>
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
              // overflow: "scroll",
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
                      PRODUTO
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
                      ZONA
                    </CustomTableCellHeader>
                    <CustomTableCellHeader align="center">
                      STATUS
                    </CustomTableCellHeader>
                    <CustomTableCellHeader align="center">
                      DATA/HORA
                    </CustomTableCellHeader>
                    <CustomTableCellHeader align="center">
                      AÇÕES
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
                      <CustomTableCellBody align="left">
                        {pedido.descricao}
                      </CustomTableCellBody>
                      <CustomTableCellBody align="center">
                        {pedido.id}
                      </CustomTableCellBody>
                      <CustomTableCellBody align="center">
                        {/* {formatarValorBRL(pedido.valor)} --- */}
                      </CustomTableCellBody>
                      <CustomTableCellBody align="center">
                        <RenderIconFormaPagamento
                          formaPagamento={pedido.formaPagamento}
                        />
                      </CustomTableCellBody>
                      <CustomTableCellBody align="center">
                        {/* <BadgeZonaEntrega zona="norte">NORTE</BadgeZonaEntrega> */}
                        ---
                      </CustomTableCellBody>
                      <CustomTableCellBody align="center">
                        {/* <StatusPedido status={5}>ABERTO</StatusPedido> */}
                        {pedido.status}
                      </CustomTableCellBody>
                      <CustomTableCellBody align="center">
                        <Stack direction="column">
                          <Typography
                            variant="span"
                            component="span"
                            sx={{ fontWeight: 700, fontSize: 12 }}
                          >
                            {/* {formatarData(pedido.data)} */} ---
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
                          borderTopRightRadius: "30px",
                          borderBottomRightRadius: "30px",
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
                            handleOpen();
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
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <TableEntregadoresStatus />
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "8px",
              padding: "20px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              minHeight: 400,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{ color: "#B83E94", fontWeight: 900, fontSize: 16 }}
            >
              Ações
            </Typography>

            <Divider sx={{ width: "100%", marginBottom: 2, marginTop: 2 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                //height: 170,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                  height: "100%",
                }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_IMAGE}/${pedidosModalData?.imagem}`}
                  alt={`${pedidosModalData?.descricao}`}
                  // layout="fill"
                  // objectFit="contain"
                  width="90"
                  height="90"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: "50%",
                  height: "100%",
                  padding: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#212529", fontWeight: 700, fontSize: 10 }}
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

                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#B7B7B7", fontWeight: 300, fontSize: 10 }}
                >
                  {/* {formatarData(pedidosModalData?.data)}{" "}
                  {pedidosModalData?.hora} */}
                  ---
                </Typography>

                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#000", fontWeight: 900, fontSize: 14 }}
                >
                  {pedidosModalData?.descricao}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ width: "100%", marginTop: 1, marginBottom: 2 }} />

            <Typography
              variant="h6"
              component="span"
              sx={{ color: "#000", fontWeight: 900, fontSize: 26 }}
            >
              {/* {formatarValorBRL(pedidosModalData?.valor)} --- */}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              {/* <BadgeZonaEntrega zona="norte">ZONA NORTE</BadgeZonaEntrega> */}{" "}
              ---
              <Box sx={{ marginRight: "5px", marginLeft: "5px" }} />
              {/* <StatusPedido status={1}>PENDENTE</StatusPedido> */}
              {pedidosModalData?.status}
            </Box>

            <Box>
              <RenderModoPagamento
                formaPagamento={pedidosModalData?.formaPagamento}
              />
            </Box>

            <Divider sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} />

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Cliente: {pedidosModalData?.nome}
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Telefone: {pedidosModalData?.celular}
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Endereço: {pedidosModalData?.logradouro}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Complemento: {pedidosModalData?.complLogr}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Ponto de referência: {pedidosModalData?.pontoReferencia}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Bairro: {pedidosModalData?.bairro}
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#202020",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
                width: "100%",
              }}
            >
              Observação do pedido: {pedidosModalData?.observacao}
            </Typography>
          </Box>
        </Fade>
      </Modal>
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
          border: `1px solid ${formaPagamento == "PIX" ? "red" : "#20202033"}`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <PixIcon
          sx={{ color: formaPagamento == "PIX" ? "red" : "#20202033" }}
        />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      </Box>

      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${
            formaPagamento == "DINHEIRO_CARTAO" ? "red" : "#20202033"
          }`,
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
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
    </Box>
  );
}
