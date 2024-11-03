import { MessageLog } from "@/components/alerts";
import React, { useContext, createContext, useState, useEffect } from "react";

type SocketContext = {
  socket: WebSocket;
  send: (data: any) => void;
  services: string[];
};

const context = createContext<SocketContext | undefined>(undefined);

export const useSocket = () => {
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return useContext(context);
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState(
    new WebSocket("ws://assured-grubworm-wrongly.ngrok-free.app/getAlerts")
  );

  const send = (data: any) => {
    socket.send(JSON.stringify(data));
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      const type = event.type;

      if (type === "message-logs") {
      } else if (type === "data-log") {
      } else if (type === "services") {
      }
    };

    return () => {
      socket.close;
    };
  }, []);

  return (
    <context.Provider value={{ socket, send, services: [] }}>
      {children}
    </context.Provider>
  );
}
