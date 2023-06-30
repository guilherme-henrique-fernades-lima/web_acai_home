import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

//Context
import { AuthContext } from "@/context/AuthContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
//Icons
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useRouter } from "next/router";

export default function PedidosEmRota(props) {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [observacao, setObservacao] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [pedidoParaConcluir, setPedidoParaConcluir] = useState([]);
  const [pedidosExibidos, setPedidosExibidos] = useState("pendentes");
  const [alturaPagina, setAlturaPagina] = useState(0);
  const [openDialogSairSistema, setOpenDialogSairSistema] = useState(false);

  console.log("pedidos....:", pedidoParaConcluir);

  // useLayoutEffect(() => {
  //   if (user?.funcao == "admin") {
  //     router.push("/home");
  //   }
  // }, [user]);

  const handleOpenAndCloseModal = () => setOpen(!open);

  const handleSairSistemaDialog = () => {
    setOpenDialogSairSistema(!openDialogSairSistema);
  };

  const handleOpenWhatsapp = (number) => {
    window.open(`whatsapp://send?phone=55${number}`, "_blank");
  };

  const handleOpenCallNumber = (number) => {
    window.open(`tel:+55${number}`, "_blank");
  };

  useEffect(() => {
    if (user?.token) {
      getPedidosParaEntrega();
    }
  }, [user]);

  useEffect(() => {
    const alturaViewport = window.innerHeight;
    setAlturaPagina(alturaViewport);
  }, []);

  const handlePedidosExibidos = (event, newAlignment) => {
    if (newAlignment !== null) {
      setPedidosExibidos(newAlignment);
    }
  };

  function getPayload() {
    const data = {
      idPedido: pedidoParaConcluir?.idPedido,
      cpf_motorista: pedidoParaConcluir?.cpf_motorista,
      motorista: pedidoParaConcluir?.motorista,
      observacao: observacao ? observacao : "",
    };

    return data;
  }

  async function concluirEntrega() {
    const payload = getPayload();

    console.log("Entrou na função de concluir entrega");
    console.log("PAYLOAD: ", payload);

    const response = await fetch(`/api/entregadores/pedidos-em-rota`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: JSON.stringify(payload),
    });

    console.log(response);

    if (response.ok) {
      const res = await response.json();
      toast.success("Pedido finalizado com sucesso!");
      handleOpenAndCloseModal();
      getPedidosParaEntrega();
    } else {
      toast.error("Não foi possível concluir a entrega");
    }
  }

  async function getPedidosParaEntrega() {
    setLoading(true);
    const response = await fetch(
      `/api/entregadores/pedidos-em-rota/?date=2023-06-29&cpf_motorista=05251596308`,
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
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#842E6B",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", right: 10, top: 10 }}
            onClick={handleSairSistemaDialog}
          >
            <PowerSettingsNewIcon sx={{ color: "#fff", fontSize: 26 }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 56, color: "#fff" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <Typography sx={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>
                {user?.username?.toUpperCase()}
              </Typography>
              {/* <Typography sx={{ fontWeight: 400, fontSize: 14, color: "#fff" }}>
                (86) 99999-9999
              </Typography> */}
            </Box>
          </Box>
        </Box>

        <ToggleButtonGroup
          color="primary"
          value={pedidosExibidos}
          exclusive
          onChange={handlePedidosExibidos}
          aria-label="Platform"
          sx={{
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#fff",
            width: "100%",
            borderBottom: "3px solid #842E6B",
            borderRadius: 0,
          }}
          size="small"
        >
          <ToggleButton value="pendentes" sx={{ backgroundColor: "#fff" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              PENDENTES
            </Typography>
          </ToggleButton>

          <ToggleButton value="concluidos">
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              CONCLUÍDOS
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        {pedidosExibidos == "pendentes" ? (
          <>
            <Box
              id="pedidosPendentes"
              sx={{
                p: 1,
                width: "100%",
                height: alturaPagina - 110 - 80,
                borderBottom: "1px solid #ccc",
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#F8F8F8",
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
              {loading ? (
                <>
                  {[1, 2, 3, 4].map((item, index) => (
                    <SkeletonCards key={index} />
                  ))}
                </>
              ) : (
                <>
                  {pedidos?.pendentes?.map((pedido) => (
                    <Box
                      key={pedido.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        //height: 120,
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        marginBottom: "10px",
                        border: "1px solid #f5f5f5",
                        padding: "10px",
                        position: "relative",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          position: "absolute",
                          top: 10,
                          right: 10,
                        }}
                      >
                        {pedido.celular && (
                          <>
                            <IconButton
                              size="small"
                              variant="contained"
                              sx={{
                                marginRight: "5px",
                              }}
                              color="primary"
                              onClick={() => {
                                handleOpenWhatsapp(pedido.celular);
                              }}
                            >
                              <WhatsAppIcon sx={{ color: "#25d366" }} />
                            </IconButton>

                            <IconButton
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleOpenCallNumber(pedido.celular);
                              }}
                            >
                              <CallIcon sx={{ color: "#221446" }} />
                            </IconButton>
                          </>
                        )}
                      </Box>

                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          marginBottom: "10px",
                          marginTop: 4,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography sx={{ fontWeight: 900, fontSize: 12 }}>
                            CLIENTE: {pedido.cliente}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Forma de pagamento: {pedido.formaPagamento}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Endereço: {pedido.logradouro}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Complemento: {pedido.numLogr}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Bairro: {pedido.bairro}
                          </Typography>
                        </Box>
                      </Box>

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
                                sx={{ fontSize: 10, fontWeight: 900 }}
                              >
                                PRODUTO(S)
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontSize: 10, fontWeight: 900 }}
                              >
                                N° PEDIDO
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pedido?.produtos?.map((produto, index) => (
                              <TableRow
                                key={index}
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
                                    fontSize: 10,
                                    fontWeight: 400,
                                    borderTopLeftRadius: "2px",
                                    borderBottomLeftRadius: "2px",
                                  }}
                                >
                                  {produto.titulo}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    fontSize: 10,
                                    fontWeight: 400,
                                    borderTopRightRadius: "2px",
                                    borderBottomRightRadius: "2px",
                                  }}
                                >
                                  {produto.quantidade}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Button
                        variant="contained"
                        color="success"
                        size="medium"
                        disableElevation
                        fullWidth
                        sx={{ fontWeight: 400, fontSize: 12, mt: 2 }}
                        onClick={() => {
                          setPedidoParaConcluir(pedido);
                          handleOpenAndCloseModal();
                        }}
                      >
                        CONCLUIR ENTREGA
                      </Button>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </>
        ) : (
          <>
            <Box
              id="pedidosPendentes"
              sx={{
                p: 1,
                width: "100%",
                height: alturaPagina - 110 - 80,
                borderBottom: "1px solid #ccc",
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#F8F8F8",
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
              {loading ? (
                <>
                  {[1, 2, 3, 4].map((item, index) => (
                    <SkeletonCards key={index} />
                  ))}
                </>
              ) : (
                <>
                  {pedidos?.concluidos?.map((pedido) => (
                    <Box
                      key={pedido.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        //height: 120,
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        marginBottom: "10px",
                        border: "1px solid #f5f5f5",
                        padding: "10px",
                        position: "relative",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          position: "absolute",
                          top: 10,
                          right: 10,
                        }}
                      >
                        {pedido.celular && (
                          <>
                            <IconButton
                              size="small"
                              variant="contained"
                              sx={{
                                marginRight: "5px",
                              }}
                              color="primary"
                              onClick={() => {
                                handleOpenWhatsapp(pedido.celular);
                              }}
                            >
                              <WhatsAppIcon sx={{ color: "#25d366" }} />
                            </IconButton>

                            <IconButton
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleOpenCallNumber(pedido.celular);
                              }}
                            >
                              <CallIcon sx={{ color: "#221446" }} />
                            </IconButton>
                          </>
                        )}
                      </Box>

                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          marginBottom: "10px",
                          marginTop: 4,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography sx={{ fontWeight: 900, fontSize: 12 }}>
                            CLIENTE: {pedido.cliente}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Forma de pagamento: {pedido.formaPagamento}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Endereço: {pedido.logradouro}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Complemento: {pedido.numLogr}
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                            Bairro: {pedido.bairro}
                          </Typography>
                        </Box>
                      </Box>

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
                                sx={{ fontSize: 10, fontWeight: 900 }}
                              >
                                PRODUTO(S)
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontSize: 10, fontWeight: 900 }}
                              >
                                N° PEDIDO
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pedido?.produtos?.map((produto, index) => (
                              <TableRow
                                key={index}
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
                                    fontSize: 10,
                                    fontWeight: 400,
                                    borderTopLeftRadius: "2px",
                                    borderBottomLeftRadius: "2px",
                                  }}
                                >
                                  {produto.titulo}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    fontSize: 10,
                                    fontWeight: 400,
                                    borderTopRightRadius: "2px",
                                    borderBottomRightRadius: "2px",
                                  }}
                                >
                                  {produto.quantidade}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </>
        )}
      </Box>

      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, fontSize: 16, fontWeight: 900 }}
          >
            Concluir entrega?
          </Typography>
          <TextField
            label="Observações"
            multiline
            rows={4}
            placeholder="Aqui você pode incluir observações relevantes sobre a entrega"
            fullWidth
            value={observacao}
            onChange={(e) => {
              setObservacao(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              disableElevation
              fullWidth
              sx={{ fontWeight: 400, fontSize: 12, mr: 1 }}
              onClick={handleOpenAndCloseModal}
            >
              CANCELAR
            </Button>
            <Button
              variant="contained"
              color="success"
              disableElevation
              fullWidth
              sx={{ fontWeight: 400, fontSize: 12 }}
              onClick={() => concluirEntrega()}
            >
              CONFIRMAR
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={openDialogSairSistema}
        onClose={handleSairSistemaDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Você deseja realmente sair do sistema?
        </DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleSairSistemaDialog}
            disableElevation
            fullWidth
          >
            NÃO
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={logout}
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

function SkeletonCards() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "4px",
        marginBottom: "10px",
        border: "1px solid #f5f5f5",
        padding: "10px",
        position: "relative",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        border: "1px solid #ccc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Skeleton
          variant="circular"
          width={28}
          height={28}
          sx={{ marginRight: "5px" }}
        />

        <Skeleton
          variant="circular"
          width={28}
          height={28}
          sx={{ marginRight: "5px" }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          marginBottom: "10px",
          marginTop: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="rounded" width={90} height={14} />
          <Skeleton variant="rounded" width={180} height={14} sx={{ mt: 1 }} />
          <Skeleton variant="rounded" width={180} height={14} sx={{ mt: 1 }} />
          <Skeleton variant="rounded" width={180} height={14} sx={{ mt: 1 }} />
          <Skeleton variant="rounded" width={180} height={14} sx={{ mt: 1 }} />
        </Box>
      </Box>

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
              <TableCell align="left" sx={{ fontSize: 10, fontWeight: 900 }}>
                <Skeleton variant="rounded" width={"100%"} height={14} />
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 10, fontWeight: 900 }}>
                <Skeleton variant="rounded" width={"100%"} height={14} />
              </TableCell>
            </TableRow>
          </TableHead>
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
                  fontSize: 10,
                  fontWeight: 400,
                  borderTopLeftRadius: "2px",
                  borderBottomLeftRadius: "2px",
                }}
              >
                <Skeleton variant="rounded" width={"100%"} height={14} />
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: 10,
                  fontWeight: 400,
                  borderTopRightRadius: "2px",
                  borderBottomRightRadius: "2px",
                }}
              >
                <Skeleton variant="rounded" width={"100%"} height={14} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Skeleton variant="rounded" width={"100%"} height={30} sx={{ mt: 2 }} />
    </Box>
  );
}
