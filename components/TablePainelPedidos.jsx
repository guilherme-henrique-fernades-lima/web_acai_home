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
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";

//Icons
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

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

const TextStatusPedido = styled(Typography)((props) => ({
  fontSize: 10,
  fontFamily: "Lato, sans-serif",
  fontWeight: 400,
  padding: "5px 10px",
  borderRadius: "30px",

  ...(props.status == 4 && {
    color: "#45B802",
    // border: "1px solid #9bf7c4",
    backgroundColor: "#c3ffa1",
  }),
}));

export default function TablePainelPedidos(props) {
  const { pedidos } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer>
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
              <CustomTableCellHeader align="center">N°</CustomTableCellHeader>

              <CustomTableCellHeader align="center">
                PRODUTO
              </CustomTableCellHeader>
              <CustomTableCellHeader align="center">
                ML. DO AÇAI
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
              <CustomTableCellHeader align="center">DATA</CustomTableCellHeader>
              <CustomTableCellHeader align="center">
                AÇÕES
              </CustomTableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>

            {pedidos.map((item, index) => {
              console.log("ITEM>>>", item)
              return (<></>
              )})}

            <TableRow
              sx={{
                transition: "all 0.3s ease",
                height: 50,
                border: "none",
                //"&:hover": { backgroundColor: "#f8e8ff" },
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
              <CustomTableCellBody align="center">100ml</CustomTableCellBody>
              <CustomTableCellBody align="center">#PD0002</CustomTableCellBody>
              <CustomTableCellBody align="center">R$ 25,36</CustomTableCellBody>
              <CustomTableCellBody align="center">CARTÃO</CustomTableCellBody>
              <CustomTableCellBody align="center">NORTE</CustomTableCellBody>
              <CustomTableCellBody align="center">6</CustomTableCellBody>
              <CustomTableCellBody align="center">
                <TextStatusPedido status={4} component="span">
                  CANCELADO
                </TextStatusPedido>
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
                    "&:hover": { color: "#B83E94", backgroundColor: "#f8e8ff" },
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
              // border: "2px solid #000",
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
              sx={{ color: "#B83E94", fontWeight: 700 }}
            >
              Ações
            </Typography>

            <Divider sx={{ width: "100%" }} />

            <Typography sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
