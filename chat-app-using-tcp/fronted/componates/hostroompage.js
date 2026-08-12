import { useState } from "react";

export default function HostRoomCreation() {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [existingRooms, setExistingRooms] = useState([]); // abhi ke liye local — baad me backend se aayega

  function findRoomname() {
    if (!name || !roomName || !password) {
      alert("Please fill all the fields.");
      return;
    }

    const roomExist = existingRooms.find((room) => room.roomName === roomName);

    if (roomExist) {
      alert("This room name is already taken. Try a different one.");
      return;
    }

    setExistingRooms((prev) => [...prev, { name, roomName, password }]);

    // fields clear kar do room create hone ke baad
    setName("");
    setRoomName("");
    setPassword("");

    alert("Room created successfully!");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-6 py-16">

      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0A84FF] rounded-full blur-[140px] opacity-30" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-[#BF5AF2] rounded-full blur-[140px] opacity-25" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#30D158] rounded-full blur-[160px] opacity-15" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />
      </div>

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">
            Welcome, Host
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            This is a private room where you can chat anonymously. No third-party tool or external device can track you here, and nothing about this conversation is ever logged or stored. Since there's no record left behind, chat freely and remember to keep your own conduct in check.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">

          <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm mb-6 outline-none focus:border-[#0A84FF] focus:bg-white/10 transition-colors"
          />

          <div className="h-px bg-white/10 mb-6" />

          <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Room Name
          </label>
          <input
            type="text"
            placeholder="What do you want to name this room?"
            name="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value.trim())}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm mb-6 outline-none focus:border-[#0A84FF] focus:bg-white/10 transition-colors"
          />

          <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Set a Password
          </label>
          <input
            type="password"
            placeholder="Enter a strong password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm mb-8 outline-none focus:border-[#0A84FF] focus:bg-white/10 transition-colors"
          />

          <button
            type="button"
            onClick={findRoomname}
            className="w-full py-3 rounded-2xl bg-[#0A84FF] text-white font-medium hover:bg-[#0A84FF]/90 active:scale-[0.98] transition-all duration-200"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}