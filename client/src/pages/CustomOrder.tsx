import React, { useState } from "react";
import {
  Send,
  MessageCircle,
  CheckCircle2,
  Paperclip,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface CustomOrderFormData {
  fullName: string;
  email: string;
  phone: string;
  furnitureType: string;
  material: string;
  dimensions: string;
  estimatedBudget: string;
  requirements: string;
}

const initialForm: CustomOrderFormData = {
  fullName: "",
  email: "",
  phone: "",
  furnitureType: "",
  material: "",
  dimensions: "",
  estimatedBudget: "",
  requirements: "",
};

export default function CustomOrder() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CustomOrderFormData>({
    ...initialForm,
    fullName: user?.displayName || "",
    email: user?.email || "",
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof CustomOrderFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    return (
      `*CUSTOM ORDER REQUEST - HITECH WOOD HANDICRAFTS*\n\n` +
      `👤 *Name:* ${formData.fullName || "Customer"}\n` +
      `📞 *Phone:* ${formData.phone || "-"}\n` +
      `✉️ *Email:* ${formData.email || "-"}\n` +
      `🪑 *Item:* ${formData.furnitureType || "-"}\n` +
      `🪵 *Material:* ${formData.material || "-"}\n` +
      `📐 *Dimensions:* ${formData.dimensions || "-"}\n` +
      `💰 *Budget:* ${formData.estimatedBudget || "-"}\n` +
      `📝 *Requirements:* ${formData.requirements || "-"}\n` +
      (fileName ? `📎 *Attachment:* ${fileName}\n` : "") +
      `\n_Sent via HiTech Wood Website_`
    );
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number to continue.");
      return;
    }
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/916304270702?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.furnitureType) {
      setErrorMessage("Please fill in your name, phone, and furniture type.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `CUST-${randomNum}`;

    try {
      try {
        const docRef = doc(db, "custom_inquiries", orderId);
        await setDoc(docRef, {
          id: orderId,
          userId: user?.uid || "guest",
          ...formData,
          fileName: fileName || null,
          createdAt: new Date().toISOString(),
        });
      } catch (fsErr) {
        console.warn("Firestore custom inquiry fallback:", fsErr);
      }

      try {
        const existing = localStorage.getItem("hitech_custom_inquiries");
        const list = existing ? JSON.parse(existing) : [];
        list.unshift({
          id: orderId,
          ...formData,
          fileName: fileName || null,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("hitech_custom_inquiries", JSON.stringify(list));
      } catch (localErr) {
        console.error("Local storage error:", localErr);
      }

      setSubmittedId(orderId);
    } catch (err: any) {
      console.error("Custom order submission failed:", err);
      setErrorMessage("Failed to submit online. Please click 'Send via WhatsApp' instead!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Minimal Header */}
        <div className="text-center mb-8">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider block mb-1">
            Bespoke Woodworking
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Custom Order Request
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Share your requirements, preferred wood species, and budget. Our master craftsman will get back to you with an exact estimate.
          </p>
        </div>

        {/* Minimal Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Email & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Estimated Budget (₹)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹35,000 - ₹50,000"
                  value={formData.estimatedBudget}
                  onChange={(e) => handleChange("estimatedBudget", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Furniture Type & Material */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Furniture Type *
                </label>
                <select
                  required
                  value={formData.furnitureType}
                  onChange={(e) => handleChange("furnitureType", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-amber-800 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Sofa">Sofa / Sectional</option>
                  <option value="Doors">Wooden Door</option>
                  <option value="Dining Table">Dining Table</option>
                  <option value="Bed">Bed / Headboard</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="TV Unit">TV Unit</option>
                  <option value="Office Furniture">Office Chair / Desk</option>
                  <option value="Custom Project">Other Custom Piece</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Preferred Material
                </label>
                <input
                  type="text"
                  placeholder="e.g. Burma Teak, Sheesham, Oak"
                  value={formData.material}
                  onChange={(e) => handleChange("material", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Dimensions (L × W × H)
              </label>
              <input
                type="text"
                placeholder="e.g. 7ft (L) × 3ft (W) × 3ft (H) or room size"
                value={formData.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
              />
            </div>

            {/* Requirements Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Requirements & Details
              </label>
              <textarea
                rows={3}
                placeholder="Describe your design, specific carving patterns, finish polish, or storage requirements..."
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
              />
            </div>

            {/* Compact Reference Attachment */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Reference Photo / Sketch (Optional)
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 border border-gray-300 hover:border-amber-800 rounded-lg px-3.5 py-2 flex items-center justify-between cursor-pointer bg-gray-50/70 hover:bg-gray-50 transition text-xs">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                  <span className="flex items-center gap-2 text-gray-600 truncate">
                    <Paperclip size={14} className="text-amber-800 flex-shrink-0" />
                    <span className="truncate">{fileName ? fileName : "Attach reference photo or sketch"}</span>
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium ml-2 flex-shrink-0">Browse</span>
                </label>
                {fileName && (
                  <button
                    type="button"
                    onClick={() => setFileName(null)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition"
                    title="Remove attachment"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Send size={15} />
                <span>{submitting ? "Submitting..." : "Submit Online"}</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Confirmation Modal */}
      {submittedId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSubmittedId(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 z-10 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Request Received!</h3>
            <p className="text-xs font-mono font-bold text-amber-800 mt-1">
              Ref #{submittedId}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Thank you, <strong>{formData.fullName}</strong>. We will review your custom {formData.furnitureType} specifications and contact you shortly.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle size={15} className="fill-current" />
                Chat on WhatsApp Directly
              </button>
              <button
                onClick={() => setSubmittedId(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
