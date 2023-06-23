import React, { useState } from "react";

//Mui components
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

//Custom components
import { BadgeStatusEntregador } from "@/helpers/utils";

//Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function TableEntregadoresStatus(props) {
  const { entregadores } = props;

  console.log(entregadores);

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
            fontSize: {
              xs: 14,
              sm: 14,
              md: 14,
              lg: 12,
              xl: 16,
            },
          }}
        >
          ENTREGADORES DISPONÍVEIS: <span>{entregadores?.length}</span>
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
            {entregadores?.map((entregador) => (
              <TableRow
                key={entregador.id}
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
                  <RenderUser entregador={entregador} />
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
                    <BadgeStatusEntregador status="ativo">
                      ATIVO
                    </BadgeStatusEntregador>
                  </Box>
                </CustomTableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
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

function RenderUser(props) {
  const { entregador } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <AccountCircleIcon sx={{ fontSize: 40, color: "#616161" }} />
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
          {entregador.username}
        </Typography>
      </Box>
    </Box>
  );
}
