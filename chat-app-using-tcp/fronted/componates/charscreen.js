import { useState } from "react";

export default function FinalRoom() {
  const [messages, setMessages] = useState([
    { sender: "System", text: "Room created. Chat anonymously — nothing here is logged.", self: false, system: true },
  ]);
  const [input, setInput] = useState("");

  const userName = "You"; // baad mein isko state/params se aayega

  function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: userName, text: input.trim(), self: true },
    ]);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex flex-col">

      {/* Same reusable background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0A84FF] rounded-full blur-[140px] opacity-30" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-[#BF5AF2] rounded-full blur-[140px] opacity-25" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#30D158] rounded-full blur-[160px] opacity-15" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />
      </div>

      {/* Header */}
      <div className="w-full max-w-3xl mx-auto px-6 pt-8 pb-4">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-medium text-lg">Room: friends-only</h1>
            <p className="text-gray-500 text-xs mt-0.5">End-to-end anonymous · No logs kept</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-6 overflow-y-auto flex flex-col gap-3 pb-4">
        {messages.map((msg, i) =>
          msg.system ? (
            <div key={i} className="text-center text-xs text-gray-500 py-2">
              {msg.text}
            </div>
          ) : (
            <div
              key={i}
              className={`flex flex-col max-w-[75%] ${msg.self ? "self-end items-end" : "self-start items-start"}`}
            >
              <span className="text-[11px] text-gray-500 mb-1 px-1">{msg.sender}</span>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.self
                    ? "bg-[#0A84FF] text-white rounded-br-md"
                    : "bg-white/10 text-gray-200 border border-white/10 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input bar */}
      <div className="w-full max-w-3xl mx-auto px-6 pb-8 pt-2">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">

          {/* Left: + icon with host/user name */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/40 flex items-center justify-center text-[#0A84FF] text-lg font-medium">
              +
            </div>
            <span className="text-xs text-gray-400 hidden sm:block">{userName}</span>
          </div>

          {/* Text input */}
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
          />

          {/* Right: Send button */}
          <button
            type="button"
            onClick={sendMessage}
            className="px-5 py-2 rounded-xl bg-[#0A84FF] text-white text-sm font-medium hover:bg-[#0A84FF]/90 active:scale-[0.98] transition-all duration-200 shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}