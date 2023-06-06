import { useEffect, useContext } from "react";
import useWebSocket from "@/hooks/useWebSocket";

//Context
import { AuthContext } from "@/context/AuthContext";

import GridPainelPedidos from "components/GridPainelPedidos";
import TablePainelPedidos from "components/TablePainelPedidos";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function index() {
  const { user } = useContext(AuthContext);

  console.log("USER>>>>", user);
  // const { evento } = useWebSocket();

  // useEffect(() => {
  //   if (evento.NOVO_PEDIDO) {
  //     //Logica de negocio
  //     console.log("EVENTO>>>", evento);
  //   }
  // }, [evento]);

  return (
    <>
      <GridPainelPedidos />

      <Grid container spacing={1} sx={{ marginTop: 0, padding: "5px" }}>
        {/* <Grid item xs={12}>
          <Paper
            sx={{
              width: "100%",
              height: 70,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            elevation={0}
          ></Paper>
        </Grid> */}
        <Grid item xs={9} sx={{ paddingRight: 1 }}>
          <Paper
            sx={{
              width: "100%",
              height: 70,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              marginBottom: 1,
            }}
            elevation={0}
          ></Paper>
          <Paper
            sx={{
              width: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "10px 20px",
            }}
            elevation={0}
          >
            <TablePainelPedidos />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: 3,
            }}
            elevation={0}
          >
            ENTREGADORES
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
