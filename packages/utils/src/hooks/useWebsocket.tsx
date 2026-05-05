
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function useWebsocket(
  roomId: string,
  event: string,
  onResponse: (data: Record<string, any>) => void,
  url = `${process.env.NEXT_PUBLIC_API_URL}`
) {
  useEffect(() => {
    if (!roomId) return;

    const socket: Socket = io(url, {
      // auth: { userId: "your-user-id" }, // optional
      transports: ["websocket"],
      autoConnect: true,
    });

    const join = () =>
      socket.emit("join-room", roomId, (ok: boolean, msg?: string) => {
        if (!ok) console.warn("Failed to join:", msg);
      });

    const handleWSResponse = (data: Record<string, any>) => {
      onResponse?.(data);
    };

    const handleReconnect = () => {
      // Re-join after reconnects
      join();
    };

    socket.on("connect", join);
    socket.on("reconnect", handleReconnect);
    socket.on(event, handleWSResponse);

    return () => {
      socket.off(event, handleWSResponse);
      socket.emit(`leave-room`, roomId, () => {});
    //   socket.disconnect();
    };
  }, [roomId, onResponse, url]);
}
