import React from "react";

//Mui components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
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
          NOME
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

export default function RelacaoFuncionario() {
  return (
    <Container>
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
                <CustomTableCellHeader align="center">
                  AVATAR
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  NOME
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  STATUS
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  CPF
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  FUNÇÃO
                </CustomTableCellHeader>
                <CustomTableCellHeader align="center">
                  ATIVO
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
                  //"&:hover": { backgroundColor: "#f8e8ff" },
                  ".MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}
              >
                <CustomTableCellBody align="center">IMAGEM</CustomTableCellBody>
                <CustomTableCellBody align="center">NOME</CustomTableCellBody>
                <CustomTableCellBody align="center">ATIVO</CustomTableCellBody>
                <CustomTableCellBody align="center">
                  123-***-***-11
                </CustomTableCellBody>
                <CustomTableCellBody align="center">NOME</CustomTableCellBody>
                <CustomTableCellBody align="center">NOME</CustomTableCellBody>
                <CustomTableCellBody align="center">NOME</CustomTableCellBody>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
