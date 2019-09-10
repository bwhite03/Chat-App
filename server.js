const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
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

    // Show user count in room when joining
    io.in("chat").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("chatRoomCount", data);
    });
    io.in("gaming").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("gamingRoomCount", data);
    });
    io.in("dev").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("devRoomCount", data);
    });
    io.in("music").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("musicRoomCount", data);
    });
  });

  // Leave room
  socket.on("leave", room => {
    socket.leave(room);
    console.log("left " + room);

    // Show user count in room when leaving
    io.in("chat").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("chatRoomCount", data);
    });
    io.in("gaming").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("gamingRoomCount", data);
    });
    io.in("dev").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("devRoomCount", data);
    });
    io.in("music").clients((error, data) => {
      if (error) throw error;
      io.sockets.emit("musicRoomCount", data);
    });
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

  // Show user count in room when connected
  io.in("chat").clients((error, data) => {
    if (error) throw error;
    io.sockets.emit("chatRoomCount", data);
  });
  io.in("gaming").clients((error, data) => {
    if (error) throw error;
    io.sockets.emit("gamingRoomCount", data);
  });
  io.in("dev").clients((error, data) => {
    if (error) throw error;
    io.sockets.emit("devRoomCount", data);
  });
  io.in("music").clients((error, data) => {
    if (error) throw error;
    io.sockets.emit("musicRoomCount", data);
  });

  // Display welcome message
  socket.emit("welcome", "Welcome, select a chat room to start chatting");
});
