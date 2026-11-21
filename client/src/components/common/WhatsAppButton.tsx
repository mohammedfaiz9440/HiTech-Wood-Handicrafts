import { openWhatsAppChat } from "../../utils/shareUtils";

// Official WhatsApp SVG Logo
export function WhatsAppIcon({ className = "w-8 h-8" }: { className?: string }) {
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
  const handleClick = () => {
    const defaultMsg =
      "Hello HiTech Wood Handicrafts! I am browsing your website and would like to ask about custom furniture, solid teak doors, and pricing.";
    openWhatsAppChat(defaultMsg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with HiTech Wood Handicrafts on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 fill-white" />
      </button>
    </div>
  );
}

export default WhatsAppButton;
