// Make connection
const socket = io.connect("http://localhost:5000");

// Select DOM
const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback"),
  userCount = document.getElementById("user-count"),
  joinChatRoom = document.getElementById("join-chat-room"),
  leaveChatRoom = document.getElementById("leave-chat-room"),
  joinGamingRoom = document.getElementById("join-gaming-room"),
  leaveGamingRoom = document.getElementById("leave-gaming-room"),
  joinDevRoom = document.getElementById("join-dev-room"),
  leaveDevRoom = document.getElementById("leave-dev-room"),
  joinMusicRoom = document.getElementById("join-music-room"),
  leaveMusicRoom = document.getElementById("leave-music-room");

// Join / Leave chat
joinChatRoom.addEventListener("click", () => {
  socket.emit("join", "chat");
});
leaveChatRoom.addEventListener("click", () => {
  socket.emit("leave", "chat");
});
// Join / Leave gaming
joinGamingRoom.addEventListener("click", () => {
  socket.emit("join", "gaming");
});
leaveGamingRoom.addEventListener("click", () => {
  socket.emit("leave", "gaming");
});
// Join / Leave dev
joinDevRoom.addEventListener("click", () => {
  socket.emit("join", "dev");
});
leaveDevRoom.addEventListener("click", () => {
  socket.emit("leave", "dev");
});
// Join / Leave music
joinMusicRoom.addEventListener("click", () => {
  socket.emit("join", "music");
});
leaveMusicRoom.addEventListener("click", () => {
  socket.emit("leave", "music");
});

// Events
btn.addEventListener("click", () => {
  if (handle.value === "") {
    handle.value = "Anonymous";
  }
  if (message.value === "") {
    return null;
  }
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", data => {
  feedback.innerHTML = "<p><em>" + data + "is typing a message...</em></p>";
});

// socket.on("userCount", data => {
//   userCount.innerHTML = "<p>" + "Users:" + data.length + "</p>";
// });
