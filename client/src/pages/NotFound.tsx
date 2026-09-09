import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-200/80">
        <h1 className="text-6xl font-extrabold text-amber-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          The handcrafted furniture piece or page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
