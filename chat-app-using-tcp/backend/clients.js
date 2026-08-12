import net from "node:net";

const inputHandler =process.stdin.on('data',(input)=>{
    if(input.toString().toLocaleLowerCase().trim()=='exit'){
        return;
    }
    socket.write(input);
})

const socket = net.createConnection({port: 4500, host: "10.28.92.145"});

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
