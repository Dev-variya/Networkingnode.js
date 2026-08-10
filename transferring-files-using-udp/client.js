import dgram from "node:dgram"; //UDP
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.close();
});

//anything u can send video , audio , text , PDF , JPEG.....
const readStream = createReadStream(
  "D:\\Dev document\\DevSignture.pdf", //mention file path here u want to send
  { highWaterMark: 10000  } // Sends data using 10KB chunks. The transfer speed can be set anything, ensuring server-side write backpressure is respected.
);

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "10.28.92.145"); //last argu is IPV4 appress enter sender ip address...
});

readStream.on("end", () => {
  socket.send("EOF", 4000, "10.28.92.145", () => {
    console.log("File sent");
  });
});

