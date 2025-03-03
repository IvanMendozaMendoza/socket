import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

const PORT = process.env["PORT"] || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(`${__dirname}/public`));

io.on("connect", () => console.log("you has been connected successfully"));

app.listen(PORT, () => console.log("listening"));
