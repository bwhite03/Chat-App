const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const server = app.listen(5000, () => {
  console.log("listening for requests on port 5000,");
});

// Static files
app.use(express.static("public"));

// Socket setup & pass server
const io = socket(server);
io.on("connection", socket => {
  console.log("made socket connection");

  // Handle chat event
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

  // Gets user count
  io.clients((error, data) => {
    if (error) throw error;
    io.sockets.emit("userCount", data);
  });
});
