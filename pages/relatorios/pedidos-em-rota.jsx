import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

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
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//Custon components
import RenderIconFormaPagamento from "@/components/RenderIconFormaPagamento";
import { formatarData, formatCpf } from "@/helpers/utils";
import DatepickerField from "@/components/DatepickerField";

export default function PedidosEmRota() {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialogRetirarPedido, setOpenDialogRetirarPedido] = useState(false);
  const [pedidoParaDeletar, setPedidoParaDeletar] = useState(null);

  console.log(pedidoParaDeletar);

  const handleDialog = () => {
    setOpenDialogRetirarPedido(!openDialogRetirarPedido);
  };

  useEffect(() => {
    if (user?.token) {
      getPedidos();
    }
  }, [user]);

  const getPedidos = async () => {
    setLoading(true);
    const response = await fetch(`/api/relatorios/pedidos-em-rota`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });

    if (response.status == 200) {
      const res = await response.json();
      setPedidos(res);
      setLoading(false);
    }
  };

  function getPayloadPedidosEnvio() {
    const data = {
      cpf_motorista: pedidoParaDeletar?.cpf_motorista,
      motorista: pedidoParaDeletar?.motorista,
      cpf_user: pedidoParaDeletar?.cpf_user,
      usuario: pedidoParaDeletar?.usuario,
      pedidos: [pedidoParaDeletar?.idPedido],
    };

    return data;
  }

  async function retirarPedidosEntregador() {
    console.log("Entrou no retirar pedidos");
    const payload = getPayloadPedidosEnvio();

    const response = await fetch(`/api/relatorios/pedidos-em-rota/`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast.success(`Pedido ${payload.pedidos[0]} removido com sucesso!`);
      getPedidos();
      handleDialog();
      setTimeout(() => {
        setPedidoParaDeletar(null);
      }, 500);
    } else {
      toast.error(
        `Erro ao remover pedido, tente novamente ou recarregue a página.`
      );
    }
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />

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
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            mb: 1,
            mt: 1,
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

              ["@media (max-width:599px)"]: {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            {loading ? (
              <Skeleton
                variant="rounded"
                width={240}
                height={38}
                sx={{ borderRadius: "8px" }}
              />
            ) : (
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
                Total de pedidos em rota: {pedidos?.length || "--"}
              </Typography>
            )}
          </Stack>
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
                    SEQ.
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    N° PEDIDO
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    MOTORISTA
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
                {pedidos?.map((pedido, index) => (
                  <TableRow
                    key={index}
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
                    <TableCell align="center">{index + 1}</TableCell>
                    <CustomTableCellBody align="center">
                      {pedido.idPedido}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {pedido.motorista}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      NOME DO CLIENTE
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {formatarData(pedido.data)}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {pedido.hora}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {formatCpf(pedido?.cpf_motorista)}
                    </CustomTableCellBody>

                    <CustomTableCellBody align="center">
                      <Tooltip
                        title="Retirar pedido do entregador"
                        placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDialog();
                            setPedidoParaDeletar(pedido);
                          }}
                        >
                          <DeleteForeverIcon
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
          </TableContainer>
        )}
      </Paper>

      <Dialog
        open={openDialogRetirarPedido}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ margin: "10px" }}
      >
        <DialogTitle id="alert-dialog-title">
          Retirar pedido: {pedidoParaDeletar?.idPedido} do entregador?
        </DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleDialog}
            disableElevation
            fullWidth
          >
            NÃO
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={retirarPedidosEntregador}
            autoFocus
            disableElevation
            fullWidth
          >
            SIM
          </Button>
        </DialogActions>
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
