const express = require("express");
const httpServer = require("http");
const { Server } = require("socket.io");

const app = express();

const server = httpServer.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

require("./socket")(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`We are up at ${PORT}`));
