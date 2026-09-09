import { useState, useEffect } from "react";
import { X, Send, CheckCheck } from "lucide-react";
import { openWhatsAppChat } from "../../utils/shareUtils";
import { motion, AnimatePresence } from "framer-motion";

// Official WhatsApp SVG Logo
export function WhatsAppIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.39C16.32 14.26 15.1 13.66 14.88 13.58C14.65 13.5 14.49 13.46 14.32 13.71C14.16 13.96 13.69 14.51 13.55 14.68C13.4 14.84 13.26 14.86 13.01 14.74C12.76 14.61 11.97 14.35 11.03 13.52C10.3 12.87 9.8 12.07 9.66 11.82C9.51 11.57 9.64 11.44 9.77 11.31C9.88 11.2 10.02 11.02 10.14 10.87C10.27 10.73 10.31 10.62 10.39 10.46C10.47 10.3 10.43 10.15 10.37 10.03C10.31 9.9 9.82 8.7 9.61 8.21C9.41 7.73 9.21 7.8 9.06 7.79C8.92 7.78 8.75 7.78 8.59 7.78C8.42 7.78 8.16 7.84 7.93 8.09C7.71 8.34 7.07 8.94 7.07 10.15C7.07 11.37 7.96 12.54 8.08 12.71C8.21 12.87 9.83 15.38 12.31 16.45C12.9 16.71 13.36 16.86 13.72 16.98C14.32 17.17 14.86 17.14 15.29 17.08C15.77 17.01 16.77 16.48 16.98 15.89C17.18 15.3 17.18 14.8 17.12 14.7C17.06 14.6 16.82 14.52 16.57 14.39Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);

  // Auto pop-up after 2.5 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedBefore) {
        setIsOpen(true);
        setHasOpenedBefore(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [hasOpenedBefore]);

  const handleSendMessage = (msgToSend?: string) => {
    const text =
      msgToSend ||
      customMessage.trim() ||
      "Hello HiTech Wood Handicrafts! I am browsing your website and would like to ask about custom furniture, solid teak doors, and pricing.";
    openWhatsAppChat(text);
    setCustomMessage("");
    setIsOpen(false);
  };

  const quickPrompts = [
    "🚪 Teak Doors Catalog & Pricing",
    "🛋️ Custom Sofa Suite Quote",
    "📐 Custom Sizing & Designs",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Pop-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-4 w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                {/* Avatar with Woodwork Badge */}
                <div className="relative w-11 h-11 rounded-full bg-amber-800 border-2 border-white/80 flex items-center justify-center font-bold text-white shadow-xs text-sm">
                  HTW
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight flex items-center gap-1.5">
                    HiTech Wood Handicrafts
                    <span className="text-emerald-300 text-xs">✓</span>
                  </h3>
                  <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Typically replies instantly
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* WhatsApp Chat Body */}
            <div
              className="p-4 bg-[#EFEAE2] flex flex-col gap-3 min-h-[220px] max-h-[320px] overflow-y-auto"
              style={{
                backgroundImage: `radial-gradient(#d1cdc7 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            >
              {/* Date chip */}
              <div className="flex justify-center">
                <span className="bg-white/80 backdrop-blur-xs text-gray-500 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wide">
                  Today
                </span>
              </div>

              {/* Bot / Business Welcome Message */}
              <div className="self-start max-w-[85%] bg-white text-gray-800 p-3.5 rounded-2xl rounded-tl-xs shadow-xs text-xs sm:text-sm leading-relaxed relative">
                <p className="font-semibold text-amber-900 text-xs mb-1">
                  Master Craftsman • HiTech Wood
                </p>
                <p>
                  Hello! 👋 Welcome to <strong>HiTech Wood Handicrafts</strong>.
                </p>
                <p className="mt-1.5 text-gray-600">
                  Looking for custom solid teak doors, luxury sofa suites, or bulk pricing? We are online and ready to assist you.
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                  <span>Just now</span>
                  <CheckCheck size={14} className="text-sky-500" />
                </div>
              </div>

              {/* Quick Action Suggestion Chips */}
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[11px] font-semibold text-gray-500 ml-1">
                  Frequently requested:
                </span>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="self-start text-left bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200/90 hover:border-emerald-300 rounded-full px-3.5 py-1.5 text-xs font-medium transition shadow-2xs hover:shadow-xs active:scale-98"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Direct WhatsApp CTA Footer */}
            <div className="p-3 bg-white border-t border-gray-200 flex flex-col gap-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#25D366] text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md transition duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                  title="Send via WhatsApp"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>

              {/* Primary Direct WhatsApp Action */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                Start Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        title="Chat with us on WhatsApp"
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? (
          <X size={28} className="text-white" />
        ) : (
          <>
            <WhatsAppIcon className="w-8 h-8 fill-white" />
            {/* Notification Pulsing Ping Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white text-[9px] font-bold text-white items-center justify-center">
                1
              </span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export default WhatsAppButton;