import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, AlertCircle, Loader2, ShieldCheck, Check, Sparkles } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else {
        setError(err?.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Badge & Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Sign In with Google
          </h2>
          <p className="text-sm text-gray-500 mt-1.5 max-w-xs mx-auto">
            Access your orders, track custom woodwork delivery, and enjoy quick checkout.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Benefits list */}
        <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 mb-6 space-y-2.5 text-xs text-amber-950">
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </span>
            <span>Instant 1-click sign in — no passwords to remember</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </span>
            <span>Track your handcrafted furniture order live</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5" />
            </span>
            <span>Saved delivery addresses for faster checkout</span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full border-2 border-gray-200 hover:border-amber-800 hover:bg-gray-50 bg-white text-gray-800 py-3.5 px-4 rounded-xl font-semibold shadow-sm transition flex items-center justify-center gap-3 active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-amber-800" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Security badge note */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
          <span>Secured with official Google Authentication</span>
        </div>

      </div>
    </div>
  );
}
