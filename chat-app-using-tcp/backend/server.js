import net from "node:net";
const server = net.createServer();

const clientsList = [];

server.listen(4500, "10.28.92.145", () => {
  console.log("Server listen on port 4500");
});

server.on("connection", (socket) => {
  clientsList.push({ name, socket });
  socket.on("data", (chunk) => {
    clientsList.forEach((socket) => {
      socket.write(`${socket.remoteAddress}||${socket.remotePort})` + chunk);
    });
  });
  console.log(
    `(${socket.remoteAddress}||${socket.remotePort}):Client connected`,
  );
  socket.write(
    `Hello (${socket.remoteAddress}||${socket.remotePort}) from server ❤️ !!!\n` +
      `In this conversation ${clientsList.length} people are active\n` +
      `what is your name for this conversation...\n` +
      `if u want leave just type EXIT`,
  );
});

socket.on("error", () => {
  console.log(`(${socket.remoteAddress}||${socket.remotePort})||:client Lost`);
  clientsList.forEach((socket) => {
    socket.write(
      `${socket.remoteAddress}||${socket.remotePort}):Accedently lost`,
    );
  });
});
socket.on("close", () => {
  console.log(
    `(${socket.remoteAddress}||${socket.remotePort})||:client Disconted`,
  );
  clientsList.forEach((socket) => {
    socket.write(
      `${socket.remoteAddress}||${socket.remotePort}):is Disconnect`,
    );
  });
});
