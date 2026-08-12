import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roomsFilePath = path.join(__dirname, "../DB/rooms.json");


// Read all rooms
export async function readRooms() {
  const data = await fs.readFile(roomsFilePath, "utf-8");

  return JSON.parse(data);
}


// Find a room by room name
export async function findRoom(roomName) {
  const rooms = await readRooms();

  return rooms.find((room) => room.roomName === roomName);
}


// Add a new room
export async function addRoom(room) {
  const rooms = await readRooms();

  const roomExist = rooms.find(
    (existingRoom) => existingRoom.roomName === room.roomName
  );

  if (roomExist) {
    return false;
  }

  rooms.push(room);

  await fs.writeFile(
    roomsFilePath,
    JSON.stringify(rooms, null, 2)
  );

  return true;
}


// Delete a room
export async function deleteRoom(roomName) {
  const rooms = await readRooms();

  const filteredRooms = rooms.filter(
    (room) => room.roomName !== roomName
  );

  if (filteredRooms.length === rooms.length) {
    return false;
  }

  await fs.writeFile(
    roomsFilePath,
    JSON.stringify(filteredRooms, null, 2)
  );

  return true;
}