import React, { useState, useEffect, useContext, useRef } from "react";
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

//Icons
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function PedidosEmRota(props) {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [pedidoParaConcluir, setPedidoParaConcluir] = useState([]);
  const [pedidosExibidos, setPedidosExibidos] = useState("pendentes");
  const [alturaPagina, setAlturaPagina] = useState(0);

  //console.log("PEDIDOS: ", pedidos);

  const handleOpenAndCloseModal = () => setOpen(!open);

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
      observacao: observacao ? observacao : null,
    };

    return data;
  }

  async function concluirEntrega() {
    const payload = getPayload();
    console.log("PAYLOAD: ", payload);
    const response = await fetch(`/api/entregadores/pedidos-em-rota`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      toast.success("Pedido finalizado com sucesso!");
      //setLoading(false);
    }
  }

  async function getPedidosParaEntrega() {
    //setLoading(true);
    const response = await fetch(`/api/entregadores/pedidos-em-rota`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });

    if (response.status == 200) {
      const res = await response.json();
      setPedidos(res);
      //setLoading(false);
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
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
            <SkeletonCards />

            {[1, 2, 2, 2, 2].map((item, index) => (
              <Box
                key={index}
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
                  <IconButton
                    size="small"
                    disableElevation
                    variant="contained"
                    sx={{
                      marginRight: "5px",
                    }}
                    color="primary"
                  >
                    <WhatsAppIcon sx={{ color: "#25d366" }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    disableElevation
                    variant="contained"
                    color="primary"
                  >
                    <CallIcon sx={{ color: "#221446" }} />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginBottom: "10px",
                    marginTop: 2,
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
                      CLIENTE
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                      Forma de pagamento: DÉBITO
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                      Endereço:
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                      Complemento:
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                      Bairro:
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
                          Nome
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
                          Qtd
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
                            fontSize: 10,
                            fontWeight: 400,
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                          }}
                        >
                          Nome
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
                          Qtd
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
                            fontSize: 10,
                            fontWeight: 400,
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                          }}
                        >
                          Nome
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
                          Qtd
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
                            fontSize: 10,
                            fontWeight: 400,
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                          }}
                        >
                          Nome
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
                          Qtd
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
                            fontSize: 10,
                            fontWeight: 400,
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                          }}
                        ></TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: 10, fontWeight: 900 }}
                        >
                          Valor total: R$ 25,00
                        </TableCell>
                      </TableRow>
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
                  onClick={handleOpenAndCloseModal}
                >
                  CONCLUIR ENTREGA
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <>
            {" "}
            <Box
              sx={{
                p: 1,
                width: "100%",
                height: 450,
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
              {[1, 2, 2, 2, 2].map((item, index) => (
                <Box
                  key={index}
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
                    <IconButton
                      size="small"
                      disableElevation
                      variant="contained"
                      sx={{
                        marginRight: "5px",
                      }}
                      color="primary"
                    >
                      <WhatsAppIcon sx={{ color: "#25d366" }} />
                    </IconButton>

                    <IconButton
                      size="small"
                      disableElevation
                      variant="contained"
                      color="primary"
                    >
                      <CallIcon sx={{ color: "#221446" }} />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      marginBottom: "10px",
                      marginTop: 2,
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
                        CLIENTE
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                        Forma de pagamento: DÉBITO
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                        Endereço:
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                        Complemento:
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                        Bairro:
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
                            Nome
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
                            Qtd
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
                              fontSize: 10,
                              fontWeight: 400,
                              borderTopLeftRadius: "2px",
                              borderBottomLeftRadius: "2px",
                            }}
                          >
                            Nome
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
                            Qtd
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
                              fontSize: 10,
                              fontWeight: 400,
                              borderTopLeftRadius: "2px",
                              borderBottomLeftRadius: "2px",
                            }}
                          >
                            Nome
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
                            Qtd
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
                              fontSize: 10,
                              fontWeight: 400,
                              borderTopLeftRadius: "2px",
                              borderBottomLeftRadius: "2px",
                            }}
                          >
                            Nome
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
                            Qtd
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
                              fontSize: 10,
                              fontWeight: 400,
                              borderTopLeftRadius: "2px",
                              borderBottomLeftRadius: "2px",
                            }}
                          ></TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontSize: 10, fontWeight: 900 }}
                          >
                            Valor total: R$ 25,00
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
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
              onClick={() => {}}
            >
              CONFIRMAR
            </Button>
          </Box>
        </Box>
      </Modal>
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
          marginTop: 2,
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
