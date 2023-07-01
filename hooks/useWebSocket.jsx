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

      socket.on("NEW_ORDER_DELIVERY", (value) => {
        console.log("Atribuindo um novo pedido ao motorista...", value);
        setEvento({ NEW_ORDER_DELIVERY: value });
      });

      socket.on("REMOVE_ORDER_DELIVERY", (value) => {
        console.log("Removendo um pedido do motorista...", value);
        setEvento({ REMOVE_ORDER_DELIVERY: value });
      });

      socket.on("FINISH_ORDER_DELIVERY", (value) => {
        console.log("Fenalizando um pedido do motorista...", value);
        setEvento({ FINISH_ORDER_DELIVERY: value });
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
