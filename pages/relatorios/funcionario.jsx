import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

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

//Formatters
import { formatCpf } from "@/helpers/utils";

//Icons
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function RelacaoFuncionario() {
  const { user } = useContext(AuthContext);

  const [dataSet, setDataset] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    if (user?.token) {
      getUsersData();
    }
  }, [user]);

  async function getUsersData() {
    setLoading(true);

    const response = await fetch(`/api/relatorios/funcionario/`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    });

    const res = await response.json();

    if (response.ok) {
      setDataset(res);
      setLoading(false);
    }
  }

  return (
    <Container>
      {loading ? (
        <SkeletonTable />
      ) : (
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
                    CPF
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    FUNÇÃO
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    STATUS
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    TELEFONE
                  </CustomTableCellHeader>
                  <CustomTableCellHeader align="center">
                    AÇÃO
                  </CustomTableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSet?.map((funcionario) => (
                  <TableRow
                    key={funcionario.id}
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
                    <CustomTableCellBody align="center">
                      <AccountCircleIcon
                        sx={{ fontSize: 40, color: "#616161" }}
                      />
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {funcionario.username.toUpperCase()}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {formatCpf(funcionario.cpf)}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {funcionario.funcao.toUpperCase()}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {funcionario.is_active ? (
                        <Chip
                          label="ATIVO"
                          size="small"
                          color="success"
                          variant="contained"
                          sx={{ fontSize: 12 }}
                        />
                      ) : (
                        <Chip
                          label="INATIVO"
                          size="small"
                          color="error"
                          variant="contained"
                          sx={{ fontSize: 12 }}
                        />
                      )}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      {funcionario?.celular}
                    </CustomTableCellBody>
                    <CustomTableCellBody align="center">
                      <Tooltip
                        title="Editar dados do funcionário"
                        placement="top"
                      >
                        <Link
                          href={{
                            pathname: "/cadastros/funcionario",
                            query: {
                              id: funcionario.id,
                            },
                          }}
                        >
                          <IconButton
                            sx={{ "&:hover": { svg: { color: "#842E6B" } } }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </CustomTableCellBody>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
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
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
