import React, { useState } from "react";

//Mui icons
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

//Icons
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

import {
  StatusPedido,
  BadgeZonaEntrega,
  RenderIconFormaPagamento,
} from "@/helpers/utils";

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

function RenderModoPagamento() {
  const [modoPagamento, setModoPagamento] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid red",
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <PixIcon sx={{ color: "red" }} />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #20202033",
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <CreditCardIcon sx={{ color: "#20202033" }} />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #20202033",
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <CreditCardIcon sx={{ color: "#20202033" }} />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #20202033",
          borderRadius: "8px",
          width: "60px",
          margin: "3px",
        }}
      >
        <LocalAtmIcon sx={{ color: "#20202033" }} />
      </Box>
    </Box>
  );
}

export default function TablePainelPedidos(props) {
  const { pedidos } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
              <CustomTableCellHeader align="center">SEQ.</CustomTableCellHeader>

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
              <CustomTableCellHeader align="center">ZONA</CustomTableCellHeader>
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
            {/* {pedidos.map((item, index) => {
              console.log("ITEM>>>", item);
              return <></>;
            })} */}

            <TableRow
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
                1
              </TableCell>
              <CustomTableCellBody align="center">
                Açai de maça com abacaxi
              </CustomTableCellBody>
              <CustomTableCellBody align="center">#PD0002</CustomTableCellBody>
              <CustomTableCellBody align="center">R$ 25,36</CustomTableCellBody>
              <CustomTableCellBody align="center">
                <RenderIconFormaPagamento formaPagamento="CREDITO" />
              </CustomTableCellBody>
              <CustomTableCellBody align="center">
                <BadgeZonaEntrega zona="norte">NORTE</BadgeZonaEntrega>
              </CustomTableCellBody>
              <CustomTableCellBody align="center">
                <StatusPedido status={5}>ABERTO</StatusPedido>
              </CustomTableCellBody>
              <CustomTableCellBody align="center">
                <Stack direction="column">
                  <Typography
                    variant="span"
                    component="span"
                    sx={{ fontWeight: 700, fontSize: 12 }}
                  >
                    11/06/2023
                  </Typography>
                  <Typography
                    variant="span"
                    component="span"
                    sx={{ fontWeight: 400, fontSize: 10 }}
                  >
                    10:48:23
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
                  onClick={handleOpen}
                >
                  <ArticleOutlinedIcon
                    sx={{
                      fontSize: 24,
                    }}
                  />
                </IconButton>
              </CustomTableCellBody>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

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
                  backgroundColor: "#ccc",
                }}
              >
                FOTO
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
                  PD00001
                </Typography>

                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#B7B7B7", fontWeight: 300, fontSize: 10 }}
                >
                  25/06/2023 19:23:53
                </Typography>

                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: "#000", fontWeight: 900, fontSize: 16 }}
                >
                  Nome do produto
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ width: "100%", marginTop: 1, marginBottom: 2 }} />

            <Typography
              variant="h6"
              component="span"
              sx={{ color: "#000", fontWeight: 900, fontSize: 26 }}
            >
              R$ 25,36
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
              <BadgeZonaEntrega zona="norte">ZONA NORTE</BadgeZonaEntrega>
              <Box sx={{ marginRight: "5px", marginLeft: "5px" }} />
              <StatusPedido status={1}>PENDENTE</StatusPedido>
            </Box>

            <Box>
              <RenderModoPagamento />
            </Box>

            <Divider sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} />

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "#20202033",
                fontWeight: 400,
                fontSize: 12,
                textAlign: "left",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Typography>

            <Button
              variant="contained"
              color="success"
              size="small"
              disableElevation
              sx={{
                borderRadius: "38px",
                height: "20",
                fontSize: 12,
                marginTop: 4,
                marginBottom: 2,
              }}
            >
              ENVIAR IMPRESSÃO
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
