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

  // Join room
  socket.on("join", room => {
    socket.join(room);
    console.log("Joined " + room);
  });

  // Leave room
  socket.on("leave", room => {
    socket.leave(room);
    console.log("left " + room);
  });

  // Handle chat events for multiple roooms
  socket.on("chat", data => io.sockets.to("chat").emit("chat", data));
  socket.on("chat", data => io.sockets.to("gaming").emit("chat", data));
  socket.on("chat", data => io.sockets.to("dev").emit("chat", data));
  socket.on("chat", data => io.sockets.to("music").emit("chat", data));

  // Handle typing event for multiple rooms
  socket.on("typing", data => socket.broadcast.to("chat").emit("typing", data));
  socket.on("typing", data =>
    socket.broadcast.to("gaming").emit("typing", data)
  );
  socket.on("typing", data => socket.broadcast.to("dev").emit("typing", data));
  socket.on("typing", data =>
    socket.broadcast.to("music").emit("typing", data)
  );

  // Gets user count
  io.clients((error, data) => {
    if (error) throw error;
    io.sockets.emit("userCount", data);
  });
});
