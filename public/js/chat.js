const username = new URLSearchParams(window.location.search).get("username");
const form = document.querySelector("#chat-form");
const msgInput = document.querySelector("#msg");
const allMessages = document.querySelector(".chat-messages");

console.log(username);

const socket = io();

socket.on("message", (message) => {
  showMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msgText = msgInput.value;
  msgInput.value = "";

  const message = { author: username, text: msgText };

  socket.emit("message", message);
});

function showMessage(message) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `
    <p class="meta">${message.author}</p>
    <p class="text">
        ${message.text}
    </p>
    `;

  allMessages.appendChild(div);
  allMessages.scrollTop = allMessages.scrollHeight;
}
