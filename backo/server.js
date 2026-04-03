require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(cors());


const busRoutes = require("./routes/bus")(io);
app.use("/api/bus", busRoutes);

io.on("connection", (socket) => {
  console.log("Client connected ", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected ", socket.id);
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.log("MongoDB error ", err));

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000 🚀");
});