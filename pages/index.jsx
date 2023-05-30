import { useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";

import { Button } from "@mui/material";


export default function Home() {
   const { evento } = useWebSocket();

    useEffect(() => {
        if (evento.NOVO_PEDIDO) {
            //Logica de negocio
            console.log("EVENTO>>>", evento)

        }
    }, [evento]);

  return (
    <Button variant="contained" disableElevation>
      Página home da aplicação.
    </Button>
  );
}
