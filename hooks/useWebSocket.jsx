import { useEffect, useState } from "react";
import io from "socket.io-client";

const WebSocket = () => {
  const [evento, setEvento] = useState({});

  let socket;

  useEffect(() => {
    // Start WebSocket
    const socketInitializer = async () => {
      await fetch("/api/websocket");
      socket = io();

      socket.on("connect", () => {
        console.log("Socket Conectado!");
      });

      socket.on("NOVO_PEDIDO", (value) => {
        console.log("recebendo new event...", value);
        setEvento({ NOVO_PEDIDO: value });
      });
    };

    // End WebSocket
    socketInitializer();
  }, []);

  return {
    evento,
  };
};

export default WebSocket;
