import dgram from "node:dgram";  
import { createWriteStream } from "node:fs";
import { writeFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

const writeStream = createWriteStream("Documents.pdf"); //that file download on current folder or mantion path with provideing name
socket.on("message", async (message, remoteAddress) => {
  if (message.toString() === "EOF") {
    socket.send(
      "File Uploaded Successfully on the Server",
      remoteAddress.port,
      remoteAddress.address
    );
  } else {
    await writeStream.write(message);
  }
});

socket.bind( 4000 ,"10.28.92.145",() => {
  console.log(socket.address());
  const address = socket.address();
  console.log(`Listening on port ${address.port}`);
});
