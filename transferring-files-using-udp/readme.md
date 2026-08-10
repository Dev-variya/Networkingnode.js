# UDP File Transfer using Node.js

A simple **file transfer application using UDP (User Datagram
Protocol)** built with Node.js.

This project demonstrates how a file such as a **PDF, image, video,
audio, or text file** can be read as binary chunks and transferred from
a **sender (client)** to a **receiver (server)** using Node.js's
built-in `dgram` module.

------------------------------------------------------------------------

## 📌 Technologies Used

-   Node.js
-   UDP
-   `node:dgram` --- UDP socket communication
-   `node:fs` --- file streams
-   ES Modules

------------------------------------------------------------------------

## 📂 Project Structure

``` text
transferring-files-using-udp/
│
├── app.js              # UDP Receiver / Server
├── client.js           # UDP Sender / Client
├── Documents.pdf      # Received file
├── package.json
└── README.md
```

------------------------------------------------------------------------

# 🔄 How It Works

The project has two programs:

### 1. `client.js` --- Sender

The client:

1.  Opens the original file using `createReadStream()`.
2.  Reads the file in small binary chunks.
3.  Sends each chunk to the server using UDP.
4.  Sends an `EOF` message after the complete file has been read.
5.  Waits for the server's success response.

### 2. `app.js` --- Receiver

The server:

1.  Creates a UDP socket.
2.  Listens on port `4000`.
3.  Receives each binary chunk.
4.  Writes the received chunks into `Documents.pdf`.
5.  When it receives `EOF`, it sends a success message back to the
    client.

------------------------------------------------------------------------

# 📊 Communication Diagram

``` text
                    UDP FILE TRANSFER
                    =================

             Sender / Client
             client.js
                  |
                  |
                  |  UDP Packet #1
                  |  File Chunk
                  |---------------------------->
                  |
                  |  UDP Packet #2
                  |  File Chunk
                  |---------------------------->
                  |
                  |  UDP Packet #3
                  |  File Chunk
                  |---------------------------->
                  |
                  |              ...
                  |
                  |  UDP Packet #N
                  |  File Chunk
                  |---------------------------->
                  |
                  |  "EOF"
                  |---------------------------->
                  |
                  |       "File Uploaded
                  |        Successfully..."
                  |<----------------------------
                  |
                  |
             Receiver / Server
                app.js
                  |
                  v
             Documents.pdf
```

------------------------------------------------------------------------

# 🧩 Detailed Flow

``` text
Original File
     |
     v
createReadStream()
     |
     |  Read small binary chunk
     v
  Chunk 1
     |
     | UDP
     v
  Server
     |
     v
writeStream.write(chunk)
     |
     v
Documents.pdf


  Chunk 2
     |
     | UDP
     v
  Server
     |
     v
writeStream.write(chunk)
     |
     v
Documents.pdf

        ...

  EOF
     |
     | UDP
     v
  Server
     |
     v
Send Success Response
     |
     v
  Client
```

------------------------------------------------------------------------

# 🖥️ Receiver --- `app.js`

The receiver creates a UDP socket:

``` js
import dgram from "node:dgram";
import { createWriteStream } from "node:fs";

const socket = dgram.createSocket("udp4");
```

A write stream is created for the received file:

``` js
const writeStream = createWriteStream("Documents.pdf");
```

The server listens for incoming UDP messages:

``` js
socket.on("message", (message, remoteAddress) => {
    // ...
});
```

If the received message is `EOF`, the server knows that the complete
file has been sent:

``` js
if (message.toString() === "EOF") {
    socket.send(
        "File Uploaded Successfully on the Server",
        remoteAddress.port,
        remoteAddress.address
    );
}
```

Otherwise, the received binary data is written into the output file:

``` js
else {
    writeStream.write(message);
}
```

Finally, the UDP server binds to:

``` text
IP   : 10.28.92.145
Port : 4000
```

------------------------------------------------------------------------

# 📤 Sender --- `client.js`

The client creates a UDP socket:

``` js
const socket = dgram.createSocket("udp4");
```

The original file is opened as a readable stream:

``` js
const readStream = createReadStream(
    "D:\\Dev document\\DevSignture.pdf",
    { highWaterMark: 1000 }
);
```

`highWaterMark` controls the approximate size of chunks read from the
file.

In this project, the chunk size was reduced to around **1 KB** so that
each chunk can be sent as a UDP datagram without exceeding practical UDP
packet-size limits.

Each chunk is sent to the receiver:

``` js
readStream.on("data", (chunk) => {
    socket.send(chunk, 4000, "10.28.92.145");
});
```

After the entire file has been read, the client sends:

``` text
EOF
```

``` js
readStream.on("end", () => {
    socket.send("EOF", 4000, "10.28.92.145", () => {
        console.log("File sent");
    });
});
```

The client then receives the server's response:

``` text
File Uploaded Successfully on the Server
```

------------------------------------------------------------------------

# 📦 Why Small Chunks Are Used

Initially, a very large chunk size was used:

``` js
{ highWaterMark: 1000000 }
```

This attempted to send approximately **1 MB as a single UDP datagram**.

That is not suitable for UDP.

The project therefore uses a much smaller chunk size:

``` js
{ highWaterMark: 1000 }
```

Approximately:

``` text
File
 |
 +---- 1 KB ----> UDP
 |
 +---- 1 KB ----> UDP
 |
 +---- 1 KB ----> UDP
 |
 +---- 1 KB ----> UDP
 |
 +------ ...
```

This allows the file to be transferred as many small UDP datagrams.

------------------------------------------------------------------------

# ⚠️ Important UDP Limitation

This project is a **basic UDP file-transfer demonstration**.

UDP is **connectionless and unreliable**.

UDP does not automatically guarantee:

-   Delivery
-   Ordering
-   No duplicate packets
-   Retransmission of lost packets

For example:

``` text
Sender                         Receiver

Packet 1 --------------------> 1
Packet 2 --------------------> 2
Packet 3 --------------------> 3
Packet 4 --------X             LOST
Packet 5 --------------------> 5
```

The receiver may end up with:

``` text
1 → 2 → 3 → 5
```

instead of:

``` text
1 → 2 → 3 → 4 → 5
```

For a binary file such as a PDF, a missing or incorrectly ordered chunk
can result in a **corrupted file**.

A production-quality UDP file-transfer protocol would therefore need
additional mechanisms such as:

``` text
Sequence Numbers
       +
ACK
       +
Retransmission
       +
Packet Ordering
       +
Timeout Handling
```

------------------------------------------------------------------------

# 🆚 UDP vs TCP for File Transfer

``` text
TCP
---
File
  |
  v
Reliable ordered stream
  |
  v
Receiver
  |
  v
File


UDP
---
File
  |
  v
Small independent datagrams
  |
  +----> Packet 1
  +----> Packet 2
  +----> Packet 3
  +----> Packet 4
  +----> ...
  |
  v
Receiver
```

TCP already provides reliability, ordering, retransmission, and flow
control.

UDP does not provide these guarantees by itself.

This project intentionally uses UDP to demonstrate low-level
datagram-based communication.

------------------------------------------------------------------------

# ▶️ How to Run

## 1. Start the receiver

Open a terminal:

``` bash
node app.js
```

Expected output:

``` text
{ address: '10.28.92.145', family: 'IPv4', port: 4000 }
Listening on port 4000
```

## 2. Start the sender

Open another terminal:

``` bash
node client.js
```

Expected output:

``` text
File sent
File Uploaded Successfully on the Server
```

The received file will be created as:

``` text
Documents.pdf
```

inside the server's current working directory.

------------------------------------------------------------------------

# 🧠 Key Concepts Demonstrated

This project demonstrates:

-   UDP sockets
-   Client-server communication
-   `dgram.createSocket("udp4")`
-   UDP datagrams
-   Binary file transfer
-   Node.js readable streams
-   Node.js writable streams
-   `highWaterMark`
-   File chunking
-   End-of-file signaling using `EOF`
-   Sender/receiver communication
-   Limitations of UDP reliability

------------------------------------------------------------------------

## 🚀 Future Improvements

The current implementation can be improved by adding:

1.  Sequence numbers for every packet
2.  ACK messages from the receiver
3.  Retransmission of lost packets
4.  Packet ordering
5.  Timeout handling
6.  Transfer progress
7.  File-name and file-size metadata
8.  Multiple-file support
9.  Checksum/integrity verification

------------------------------------------------------------------------

## 📄 Note

This project is intended for learning and demonstrating **UDP networking
and file transfer with Node.js**. It is not intended to replace a
reliable production file-transfer protocol.
