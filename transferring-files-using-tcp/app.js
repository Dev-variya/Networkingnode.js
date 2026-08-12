import { createReadStream, createWriteStream, read } from "node:fs";
import net from "node:net";


const server = net.createServer((socket) => {

   
  const writeStream = createWriteStream("story.pdf");
  socket.pipe(writeStream);
  
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  socket.on("error", () => {
    console.log("Client Lost");
  });
  console.log("Client Connected", socket.remoteAddress);
});

server.listen(4000, "10.28.92.145", () => {
  console.log("Server started on port 4000");
});
