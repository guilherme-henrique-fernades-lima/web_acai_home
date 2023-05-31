import { useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";

import GridPainelPedidos from "components/GridPainelPedidos";

export default function index() {
  // const { evento } = useWebSocket();

  // useEffect(() => {
  //   if (evento.NOVO_PEDIDO) {
  //     //Logica de negocio
  //     console.log("EVENTO>>>", evento);
  //   }
  // }, [evento]);

  return <GridPainelPedidos />;
}
