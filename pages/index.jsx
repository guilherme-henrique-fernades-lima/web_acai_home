import { useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";

import GridPainelPedidos from "components/GridPainelPedidos";
import TablePainelPedidos from "components/TablePainelPedidos";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function index() {
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
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", height: 100 }} elevation={1}></Paper>
        </Grid>
        <Grid item xs={9} sx={{ paddingRight: 1 }}>
          <Paper sx={{ width: "100%" }} elevation={1}>
            <TablePainelPedidos />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ width: "100%", height: "100%" }} elevation={1}>
            asd
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
