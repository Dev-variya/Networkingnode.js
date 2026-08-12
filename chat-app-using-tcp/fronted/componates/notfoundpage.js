import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-6 py-16">

      {/* Same reusable background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0A84FF] rounded-full blur-[140px] opacity-30" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-[#BF5AF2] rounded-full blur-[140px] opacity-25" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#30D158] rounded-full blur-[160px] opacity-15" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />
      </div>

      <div className="w-full max-w-md text-center">

        <p className="text-sm font-medium text-[#0A84FF] uppercase tracking-widest mb-4">
          Error 404
        </p>

        <h1 className="text-6xl font-semibold tracking-tight text-white mb-4">
          Room Not Found
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          The page you're looking for doesn't exist, or the room may have been closed by its host. Double-check the link, or head back and create your own private room.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-2xl bg-[#0A84FF] text-white font-medium hover:bg-[#0A84FF]/90 active:scale-[0.98] transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}