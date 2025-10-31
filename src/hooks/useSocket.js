import { useEffect } from "react";
import { io } from "socket.io-client";
import { useToast } from "./useToast";

let socket;

export const useSocket = (userId, onNotification) => {
    const {showNotification} = useToast();
  useEffect(() => {
    if (!userId) return;

    socket = io(`${import.meta.env.VITE_SOCKET_URL}/`, {
      transports: ["websocket"],
    });

    // Register the user
    socket.emit("register", userId);

    // Listen for notifications
    socket.on("notification", (data) => {
      console.log("🔔 Notification:", data);

    showNotification(data)

      // Optional callback to update app state (e.g. Redux or local state)
      if (onNotification) onNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, onNotification]);

  return socket;
};
