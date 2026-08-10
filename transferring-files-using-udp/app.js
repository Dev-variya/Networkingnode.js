import dgram from "node:dgram";  
import { createWriteStream } from "node:fs";
import { writeFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

const writeStream = createWriteStream("numbers.mp4"); //that file download on current folder 
socket.on("message", async (message, remoteAddress) => {
  if (message.toString() === "EOF") {
    socket.send(
      "File Uploaded Successfully on the Server",
      remoteAddress.port,
      remoteAddress.address
    );
  } else {
    writeStream.write(message);
  }
});

socket.bind({ port: 4000 }, () => {
  console.log(socket.address());
  const address = socket.address();
  console.log(`Listening on port ${address.port}`);
});
