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

      console.log("SOCKET>>>", socket);

      socket.on("connect", () => {
        console.log("Socket Conectado!");
      });

      socket.on("EVENT", (value) => {
        console.log("recebendo new event...", value);
        setEvento({ EVENT: value });
      });
    };

    // End WebSocket
    socketInitializer();

    return () => {
      console.log("Socket Desconectado!");
      socket.close();
    };
  }, []);

  return {
    evento,
  };
};

export default WebSocket;
