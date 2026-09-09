import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Layers,
  Ruler,
  IndianRupee,
  FileText,
  UploadCloud,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
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
      `*CUSTOM FURNITURE ORDER REQUEST - HITECH WOOD HANDICRAFTS*\n\n` +
      `👤 *Full Name:* ${formData.fullName || "Customer"}\n` +
      `📞 *Phone:* ${formData.phone || "-"}\n` +
      `✉️ *Email:* ${formData.email || "-"}\n` +
      `🪑 *Furniture Type:* ${formData.furnitureType || "-"}\n` +
      `🪵 *Preferred Material:* ${formData.material || "-"}\n` +
      `📐 *Dimensions (L × W × H):* ${formData.dimensions || "-"}\n` +
      `💰 *Estimated Budget:* ${formData.estimatedBudget || "-"}\n` +
      `📝 *Requirements:* ${formData.requirements || "-"}\n` +
      (fileName ? `📎 *Reference File Attached:* ${fileName}\n` : "") +
      `\n_Sent via HiTech Wood Handicrafts Website_`
    );
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/916304270702?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.furnitureType) {
      setErrorMessage("Please fill in your name, phone number, and furniture type.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `CUST-${randomNum}`;

    try {
      // 1. Save to Cloud Firestore
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

      // 2. Save to local storage
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
      setErrorMessage("Failed to submit request online. Please use the WhatsApp option!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Banner */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Custom Woodwork
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Custom Furniture Order
          </h1>
          <p className="mt-4 text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto">
            Design your dream furniture exactly the way you want. Share your preferred material, dimensions, budget, and requirements.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 md:py-16 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200/80">
            
            <div className="border-b border-gray-100 pb-5 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Custom Furniture Specifications</h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill out the details below and our master carpenter will prepare an exact proposal for your space.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed Faiz"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email Address & Estimated Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Estimated Budget (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. ₹35,000 - ₹50,000"
                      value={formData.estimatedBudget}
                      onChange={(e) => handleChange("estimatedBudget", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Furniture Type & Preferred Material */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Select Furniture Type *
                  </label>
                  <select
                    required
                    value={formData.furnitureType}
                    onChange={(e) => handleChange("furnitureType", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-amber-800 focus:outline-none"
                  >
                    <option value="">Select Furniture Type</option>
                    <option value="Sofa">Sofa</option>
                    <option value="Dining Table">Dining Table</option>
                    <option value="Bed">Bed</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="TV Unit">TV Unit</option>
                    <option value="Office Furniture">Office Furniture</option>
                    <option value="Doors">Wooden Door</option>
                    <option value="Custom Project">Other Custom Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Preferred Material (Wood Species / Finish)
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Burma Teak, Sheesham, Oak, or PU Finish"
                      value={formData.material}
                      onChange={(e) => handleChange("material", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Dimensions (L × W × H) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Dimensions (L × W × H)
                </label>
                <div className="relative">
                  <Ruler className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. 7ft (L) × 3ft (W) × 3ft (H) or room space details"
                    value={formData.dimensions}
                    onChange={(e) => handleChange("dimensions", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 5: Detailed Requirements */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Requirements & Design Description
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={5}
                    placeholder="Describe your furniture requirements (e.g. hydraulic storage under bed, specific carving motifs, polish tone, cushioning fabric choice)..."
                    value={formData.requirements}
                    onChange={(e) => handleChange("requirements", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 6: File Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Upload Reference Photo / Sketch (Optional)
                </label>
                <label className="border-2 border-dashed border-gray-300 hover:border-amber-800 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-amber-50/30 transition">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <UploadCloud className="w-5 h-5 text-amber-800" />
                    <span>{fileName ? `Attached: ${fileName}` : "Select image or sketch from your device"}</span>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</span>
                </label>
              </div>

              {/* Dual Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Submitting..." : "Submit Request Online"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {submittedId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSubmittedId(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 z-10 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Custom Request Received!</h3>
            <p className="text-xs font-mono font-bold text-amber-800 mt-1">
              Reference #{submittedId}
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Thank you, <strong>{formData.fullName}</strong>! We have received your custom{" "}
              <strong>{formData.furnitureType}</strong> inquiry. Our master craftsman will review your
              material, budget, and requirements, and reach out to you within 24 hours.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Chat on WhatsApp Directly
              </button>
              <button
                onClick={() => setSubmittedId(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl font-semibold text-xs"
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
