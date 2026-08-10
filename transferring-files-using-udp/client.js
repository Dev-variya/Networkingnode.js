import dgram from "node:dgram"; //UDP
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.close();
});

const readStream = createReadStream(
  "C:\\Users\\dev\\OneDrive\\Desktop\\Story of Internet.mp4", //mention file path here u want to send
  { highWaterMark: 1000 }
);

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "192.168.0.105"); //last argu is IPV4 appress enter sender ip address...
});

readStream.on("end", () => {
  socket.send("EOF", 4000, "192.168.0.105", () => {
    console.log("File sent");
  });
});

