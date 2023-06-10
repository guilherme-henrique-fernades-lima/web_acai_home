import React, { useEffect, useContext, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";

//Context
import { AuthContext } from "@/context/AuthContext";

import GridPainelPedidos from "components/GridPainelPedidos";
import TablePainelPedidos from "components/TablePainelPedidos";
import TableEntregadoresStatus from "components/TableEntregadoresStatus";
import { STATUS_PEDIDO, ZONA_ENTREGA } from "@/helpers/constants";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

//Icons
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Home() {
  const { user } = useContext(AuthContext);

  console.log("USER>>>>", user);
  // const { evento } = useWebSocket();

  // useEffect(() => {
  //   if (evento.NOVO_PEDIDO) {
  //     //Logica de negocio
  //     console.log("EVENTO>>>", evento);
  //   }
  // }, [evento]);

  const [pedidos, setPedidos] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPedidos = async () => {
      const req = await fetch("/api/pedidos", {
        method: "GET",
        headers: {
          Authorization: user.token,
        },
      });

      if (req.status == 200) {
        const res = await req.json();

        console.log("RES>>>", res);
        console.log(res);

        setPedidos(res.data);
      }
    };

    user.token && getPedidos();
  }, [user]);

  return (
    <>
      <GridPainelPedidos status={cards} />

      <Grid container spacing={1} sx={{ marginTop: 0, padding: "5px" }}>
        <Grid item xs={9} sx={{ paddingRight: 1 }}>
          <Paper
            sx={{
              width: "100%",
              height: 70,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              marginBottom: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            elevation={0}
          >
            <FilterListIcon
              sx={{ fontSize: 40, marginLeft: "20px", marginRight: "20px" }}
            />
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  id="sexo"
                  select
                  fullWidth
                  placeholder="Zona de entrega"
                  label="Zona de entrega"
                  size="small"
                  // value={nome}
                  onChange={(e) => {
                    // setNome(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                >
                  {ZONA_ENTREGA.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="sexo"
                  fullWidth
                  placeholder="Status do pedido"
                  label="Status do pedido"
                  select
                  size="small"
                  // value={nome}
                  onChange={(e) => {
                    // setNome(e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                >
                  {STATUS_PEDIDO.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <Button variant="contained" disableElevation>
                  FILTRAR
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            sx={{
              width: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "10px 20px",
            }}
            elevation={0}
          >
            <TablePainelPedidos pedidos={pedidos} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <TableEntregadoresStatus />
        </Grid>
      </Grid>
    </>
  );
}
