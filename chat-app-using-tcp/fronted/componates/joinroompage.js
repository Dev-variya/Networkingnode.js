import { useState } from "react";

export default function JoinRoom() {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");

  function checkRoom() {
    if (!name || !roomName || !password) {
      alert("Please fill all the fields.");
      return;
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-6 py-16">

      {/* Same reusable background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0A84FF] rounded-full blur-[140px] opacity-30" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-[#BF5AF2] rounded-full blur-[140px] opacity-25" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#30D158] rounded-full blur-[160px] opacity-15" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />
      </div>

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">
            Join a Room
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Enter the room name and password shared with you by the host to join this private conversation. Your name will only be visible to members already inside the room.
          </p>
        </div>

        {/* Form Card */}
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
            placeholder="Enter the room name"
            name="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value.trim())}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm mb-6 outline-none focus:border-[#0A84FF] focus:bg-white/10 transition-colors"
          />

          <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter the password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm mb-8 outline-none focus:border-[#0A84FF] focus:bg-white/10 transition-colors"
          />

          <button
            type="button"
            onClick={checkRoom}
            className="w-full py-3 rounded-2xl bg-[#0A84FF] text-white font-medium hover:bg-[#0A84FF]/90 active:scale-[0.98] transition-all duration-200"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}