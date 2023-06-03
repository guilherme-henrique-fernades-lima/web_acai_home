import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TablePainelPedidos(props) {
  return (
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
            height: 80,
            borderBottom: "1px solid #ccc",
            overflow: "hidden",
          }}
        >
          <TableRow sx={{ "& td": { border: 0 } }}>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
                borderBottom: "none",
              }}
            >
              N°
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              PRODUTO
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              ML. AÇAI
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              N° PEDIDO
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              VALOR
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              ZONA
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              STATUS
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900,
                color: "#2e2e2e",
              }}
            >
              AÇÕES
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              transition: "all 0.3s ease",
              height: 50,
              border: "none",
              "&:hover": { backgroundColor: "#f8e8ff" },
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
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell
              align="center"
              sx={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              6
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
