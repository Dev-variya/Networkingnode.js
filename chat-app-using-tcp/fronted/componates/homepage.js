import { Link } from "react-router";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-6 py-16">

      {/* Reusable Apple-style wallpaper background — copy this div structure on every page */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0A84FF] rounded-full blur-[140px] opacity-30" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-[#BF5AF2] rounded-full blur-[140px] opacity-25" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#30D158] rounded-full blur-[160px] opacity-15" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center">

        {/* Hero */}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white text-center mb-3">
          Welcome to <span className="bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] bg-clip-text text-transparent">Huddle</span>
        </h1>
        <p className="text-gray-400 text-lg text-center max-w-xl mb-16">
          Private, encrypted group conversations — built for the people you trust.
        </p>

        {/* Two columns: Create left, Join right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          {/* Create Room — LEFT */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.07] transition-colors duration-300">
            <h2 className="text-2xl font-medium text-white mb-3">Create a Room</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
              Start a brand new private space for your group in seconds. Once your room is created, you'll receive a unique secret key that acts as the only way in — think of it as the master key to your conversation. Share this key exclusively with the people you want in your group, whether that's your close friends, your team at work, or your family. Anyone without the key simply cannot enter, so your conversations stay completely private and out of reach from outsiders.
            </p>
            <Link to="/host">
            <button className="w-full py-3 rounded-2xl bg-[#0A84FF] text-white font-medium hover:bg-[#0A84FF]/90 active:scale-[0.98] transition-all duration-200">
              Create Room
            </button>
            </Link>
          </div>

          {/* Join Room — RIGHT */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.07] transition-colors duration-300">
            <h2 className="text-2xl font-medium text-white mb-3">Join a Room</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
              Already have a secret key from someone in your group? Enter it here to instantly connect to their private room and pick up the conversation right where everyone left off. There's no sign-up, no waiting, and no approval needed — the secret key is your identity and your access pass at the same time. Just make sure you got the key directly from a trusted member of the group, since whoever holds it can join the room.
            </p>
            <Link to="/joinroom">
            <button className="w-full py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 active:scale-[0.98] transition-all duration-200">
              Join Room
            </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}