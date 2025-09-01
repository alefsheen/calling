import { io } from "socket.io-client";
// export const server_url = "http://127.0.0.1:3000";
export const server_url = import.meta.env.VITE_SERVER;
export const socket = io(server_url);
