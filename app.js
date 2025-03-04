import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix __dirname in ES Modules
const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Serve static files from the "public" directory
app.use(express.static(`${__dirname}/public`));

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Emit to the connected client only
  socket.emit("connection", `Connection established. Your ID: ${socket.id}`);

  // Correct way to listen for the "client" event from a specific socket
  socket.on("client", (data) => {
    console.log(`Received from ${socket.id}:`, data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
