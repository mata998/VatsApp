const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`My server is alive and listening on port: ${PORT}`)
);

app.use(express.static("public"));

io.on("connection", (socket) => {
  //   console.log(`Socket: ${socket.id} connected!!!`);

  socket.on("message", (message) => {
    const author = message.author;
    const text = message.text;

    // console.log(`Author: ${author} sent: ${text}`);

    io.emit("message", message);
  });
});
