import { io } from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-kanban-gaf2.onrender.com/";
const socket = io(backendUrl);

export default socket;
