import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { BadgeStatusEntregador } from "@/helpers/utils";

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

function RenderUser() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 45,
          height: 45,
          backgroundColor: "#ccc",
          borderRadius: "50%",
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
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          NOME DO ENTREGADOR
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            marginTOp: "-15px",
          }}
        >
          nome
        </Typography>
      </Box>
    </Box>
  );
}

export default function TableEntregadoresStatus() {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <Box
        sx={{
          border: "1px solid #ccc",
          padding: "5px 10px",
          borderRadius: "28px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: "#000000",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          ENTREGADORES ONLINE: <span>17</span>
        </Typography>
      </Box>

      {/* <Divider sx={{ width: "100%", marginTop: 2, marginBottom: 2 }} /> */}

      <TableContainer>
        <Table
          size="small"
          sx={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <TableHead
            sx={{
              height: 30,
              borderBottom: "1px solid #ccc",
              overflow: "hidden",
            }}
          >
            <TableRow sx={{ "& td": { border: 0 } }}>
              <CustomTableCellHeader align="center">Nome</CustomTableCellHeader>
              <CustomTableCellHeader align="center">
                Status
              </CustomTableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
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
              <CustomTableCellBody align="left">
                <RenderUser />
              </CustomTableCellBody>
              <CustomTableCellBody align="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <BadgeStatusEntregador status="aguardando">
                    AGUARDANDO
                  </BadgeStatusEntregador>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      color: "#666666",
                      fontWeight: 400,
                      fontSize: 12,
                      marginTop: "5px",
                    }}
                  >
                    Zona sul
                  </Typography>
                </Box>
              </CustomTableCellBody>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
