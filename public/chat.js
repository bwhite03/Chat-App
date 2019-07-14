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
  styleChatRoom = document.getElementById("chat-room"),
  leaveChatRoom = document.getElementById("leave-chat-room"),
  joinGamingRoom = document.getElementById("join-gaming-room"),
  stylegamingRoom = document.getElementById("gaming-room"),
  leaveGamingRoom = document.getElementById("leave-gaming-room"),
  joinDevRoom = document.getElementById("join-dev-room"),
  styleDevRoom = document.getElementById("dev-room"),
  leaveDevRoom = document.getElementById("leave-dev-room"),
  joinMusicRoom = document.getElementById("join-music-room"),
  styleMusicRoom = document.getElementById("music-room"),
  leaveMusicRoom = document.getElementById("leave-music-room"),
  selectRoomTitle = document.getElementById("select-room-title"),
  allButtons = document.querySelectorAll(".button");

// Events

// Join / Leave chat
joinChatRoom.addEventListener("click", () => {
  socket.emit("join", "chat");
  styleChatRoom.style.background = "#E5E5E5";
  selectRoomTitle.innerHTML = "<h1>Chat room</h1>";
  allButtons.forEach(button => (button.disabled = true));
  leaveChatRoom.disabled = false;
});
leaveChatRoom.addEventListener("click", () => {
  socket.emit("leave", "chat");
  styleChatRoom.style.background = "#fff";
  selectRoomTitle.innerHTML = "<h1>Select room</h1>";
  allButtons.forEach(button => (button.disabled = false));
});
// Join / Leave gaming
joinGamingRoom.addEventListener("click", () => {
  socket.emit("join", "gaming");
  stylegamingRoom.style.background = "#E5E5E5";
  selectRoomTitle.innerHTML = "<h1>Gaming room</h1>";
  allButtons.forEach(button => (button.disabled = true));
  leaveGamingRoom.disabled = false;
});
leaveGamingRoom.addEventListener("click", () => {
  socket.emit("leave", "gaming");
  stylegamingRoom.style.background = "#fff";
  selectRoomTitle.innerHTML = "<h1>Select room</h1>";
  allButtons.forEach(button => (button.disabled = false));
});
// Join / Leave dev
joinDevRoom.addEventListener("click", () => {
  socket.emit("join", "dev");
  styleDevRoom.style.background = "#E5E5E5";
  selectRoomTitle.innerHTML = "<h1>Dev room</h1>";
  allButtons.forEach(button => (button.disabled = true));
  leaveDevRoom.disabled = false;
});
leaveDevRoom.addEventListener("click", () => {
  socket.emit("leave", "dev");
  styleDevRoom.style.background = "#fff";
  selectRoomTitle.innerHTML = "<h1>Select room</h1>";
  allButtons.forEach(button => (button.disabled = false));
});
// Join / Leave music
joinMusicRoom.addEventListener("click", () => {
  socket.emit("join", "music");
  styleMusicRoom.style.background = "#E5E5E5";
  selectRoomTitle.innerHTML = "<h1>Music room</h1>";
  allButtons.forEach(button => (button.disabled = true));
  leaveMusicRoom.disabled = false;
});
leaveMusicRoom.addEventListener("click", () => {
  socket.emit("leave", "music");
  styleMusicRoom.style.background = "#fff";
  selectRoomTitle.innerHTML = "<h1>Select room</h1>";
  allButtons.forEach(button => (button.disabled = false));
});

// Send Message Event
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
