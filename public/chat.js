// Make connection
const socket = io.connect("http://localhost:5000");

let users;

// Select DOM
const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback"),
  userCount = document.getElementById("user-count");

// Events
btn.addEventListener("click", () => {
  if (handle.value === "") {
    handle.value = "Anonymous";
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

socket.on("userCount", data => {
  userCount.innerHTML = "<p>" + "Users:" + data.length + "</p>";
});
