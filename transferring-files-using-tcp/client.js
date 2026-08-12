import { createReadStream, createWriteStream } from "node:fs";
import net from "node:net";

process.stdin.on("data", (input) => {
  const inputString = input.toString().trim();
  console.dir(inputString);
  if (inputString === "send") {
    const readStream = createReadStream(
      "C:\\Users\\Dev\\Downloads\\ApplicationForm.pdf"
    );

    readStream.pipe(socket);
    readStream.on("end", () => {
      console.log("File send sucessfully !!!");
    });
  }
});

const socket = net.createConnection({ host: "10.28.92.145", port: 4000 });



socket.on("data", (chunk) => {
  console.log(chunk.toString());
});

socket.on("error", () => {
  console.log("can't find server or server temp close or Lost the server !!!");
  process.exit(1);
});
socket.on("close", () => {
    console.log("Connection closed.");
    process.exit(0);
});


