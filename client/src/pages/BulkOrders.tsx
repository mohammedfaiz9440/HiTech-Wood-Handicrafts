import React, { useState } from "react";
import {
  Building2,
  UtensilsCrossed,
  Hotel,
  CheckCircle2,
  Send,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface BulkFormData {
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  business_type: string;
  items_description: string;
  quantity: string;
  delivery_timeline: string;
  notes: string;
}

const initialForm: BulkFormData = {
  business_name: "",
  contact_person: "",
  email: "",
  phone: "",
  business_type: "",
  items_description: "",
  quantity: "",
  delivery_timeline: "",
  notes: "",
};

export default function BulkOrders() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BulkFormData>({
    ...initialForm,
    contact_person: user?.displayName || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (field: keyof BulkFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // WhatsApp template for Hotels & Resorts
  const hotelWhatsAppMessage = `Hello Hitech Wood Handicraft! 🏨

I'm inquiring about a *bulk furniture order for a hotel / resort*.

• Property name: ${formData.business_name || "-"}
• Contact person: ${formData.contact_person || "-"}
• Phone: ${formData.phone || "-"}
• No. of rooms / suites: ${formData.quantity || "-"}
• Furniture needed (beds, wardrobes, luggage racks, lobby seating, etc.): ${formData.items_description || "-"}
• Preferred wood / finish: Solid Hardwood / Custom Commercial Grade
• Target installation date: ${formData.delivery_timeline || "-"}

Please share a tailored hospitality catalog and volume pricing.`;

  // WhatsApp template for Restaurants & Cafés
  const restaurantWhatsAppMessage = `Hello Hitech Wood Handicraft! 🍽️

I'm inquiring about a *bulk furniture order for a restaurant / café*.

• Outlet name: ${formData.business_name || "-"}
• Contact person: ${formData.contact_person || "-"}
• Phone: ${formData.phone || "-"}
• Seating capacity / Quantity: ${formData.quantity || "-"}
• Items needed (dining tables, chairs, booths, bar counters, etc.): ${formData.items_description || "-"}
• Style / theme: Commercial Hardwood Interior
• Opening / setup date: ${formData.delivery_timeline || "-"}

Please share commercial-grade options and a volume quote.`;

  const getWhatsAppLink = (text: string) =>
    `https://wa.me/916304270702?text=${encodeURIComponent(text)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.business_name.trim() || !formData.contact_person.trim() || !formData.phone.trim() || !formData.items_description.trim()) {
      setErrorMsg("Please fill in all required fields marked with *.");
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const inquiryId = `BULK-${randomNum}`;

    try {
      // 1. Save to Firestore if available
      try {
        const docRef = doc(db, "bulk_inquiries", inquiryId);
        await setDoc(docRef, {
          id: inquiryId,
          userId: user?.uid || "guest",
          ...formData,
          createdAt: new Date().toISOString(),
        });
      } catch (fsErr) {
        console.warn("Firestore bulk inquiry save fallback:", fsErr);
      }

      // 2. Save locally
      try {
        const existing = localStorage.getItem("hitech_bulk_inquiries");
        const list = existing ? JSON.parse(existing) : [];
        list.unshift({ id: inquiryId, ...formData, createdAt: new Date().toISOString() });
        localStorage.setItem("hitech_bulk_inquiries", JSON.stringify(list));
      } catch (localErr) {
        console.error("Local storage error:", localErr);
      }

      setSubmittedId(inquiryId);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMsg("Failed to send inquiry online. You can chat with us directly on WhatsApp!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block font-medium text-amber-300 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
            For Hotels & Restaurants
          </span>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Customise Your Bulk Order
          </h1>

          <p className="text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
            Tailor-made wooden furniture crafted for hotels, restaurants, cafés and resorts.
            Share your requirements and we'll design a quote that fits your space and budget.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Why Bulk Order & WhatsApp Quick Templates */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Why bulk-order with us? */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-7">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Why bulk-order with us?
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Trusted commercial woodwork crafted directly in our manufacturing workshop.
              </p>

              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>Custom designs matched to your interior architecture</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>Premium solid hardwood, built for heavy commercial use</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>Volume tier discounts for 10+ pieces</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>Pan-India freight delivery & on-site installation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>Dedicated project account manager & CAD drawings</span>
                </li>
              </ul>
            </div>

            {/* Quick WhatsApp Templates */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold text-center mb-1">
                Quick WhatsApp Templates
              </p>

              <a
                href={getWhatsAppLink(hotelWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-all"
              >
                <Hotel className="w-4 h-4" />
                <span>For Hotels & Resorts</span>
              </a>

              <a
                href={getWhatsAppLink(restaurantWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-amber-800 hover:bg-amber-900 text-white px-5 py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-all"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>For Restaurants & Cafés</span>
              </a>
            </div>

            {/* Direct Phone Helpline */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-amber-950 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600">Commercial Projects Hotline</div>
                <a href="tel:+916304270702" className="text-base font-bold text-amber-900 hover:underline">
                  +91 6304270702
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Commercial Bulk Order Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-stone-200/90 p-5 sm:p-6 space-y-3.5"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Commercial Inquiry Form</h2>
                  <p className="text-xs text-gray-500">Fast direct-factory quote for hotels, restaurants & commercial spaces.</p>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                  Direct Factory Rates
                </span>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Business Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Business name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="e.g. Grand Hyatt / Olive Bistro"
                    value={formData.business_name}
                    onChange={(e) => handleChange("business_name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Contact person *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.contact_person}
                    onChange={(e) => handleChange("contact_person", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    placeholder="e.g. procurement@hotel.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Business type *
                  </label>
                  <select
                    required
                    value={formData.business_type}
                    onChange={(e) => handleChange("business_type", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  >
                    <option value="">Select property type...</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Café / Coffee Shop">Café / Coffee Shop</option>
                    <option value="Resort">Resort</option>
                    <option value="Banquet / Event Space">Banquet / Event Space</option>
                    <option value="Office / Co-Working">Office / Co-Working</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Approx. quantity */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Approx. quantity
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    placeholder="e.g. 30 pieces / 15 rooms"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>

                {/* Items / furniture needed */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Items / furniture needed *
                  </label>
                  <textarea
                    required
                    rows={2}
                    maxLength={2000}
                    placeholder="e.g. 20 dining chairs, 10 tables (4-seater), 1 reception counter, 15 king beds with headboards"
                    value={formData.items_description}
                    onChange={(e) => handleChange("items_description", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none resize-none"
                  />
                </div>

                {/* Delivery timeline */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Delivery timeline
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    placeholder="e.g. within 6 weeks / urgent"
                    value={formData.delivery_timeline}
                    onChange={(e) => handleChange("delivery_timeline", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Additional notes / wood preference
                  </label>
                  <input
                    type="text"
                    maxLength={2000}
                    placeholder="e.g. Teak, Sheesham, CAD drawings available"
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors disabled:opacity-60 mt-1"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Sending Inquiry..." : "Send Commercial Inquiry"}</span>
              </button>
            </form>
          </div>

        </div>
      </main>

      {/* Success Modal */}
      {submittedId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSubmittedId(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 z-10 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Inquiry Sent!</h3>
            <p className="text-xs font-mono font-bold text-amber-800 mt-1">
              Reference #{submittedId}
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Thank you, <strong>{formData.contact_person}</strong>! Our commercial project manager will review your{" "}
              <strong>{formData.business_name}</strong> requirements and contact you within 24 hours.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={getWhatsAppLink(
                  formData.business_type === "Hotel" || formData.business_type === "Resort"
                    ? hotelWhatsAppMessage
                    : restaurantWhatsAppMessage
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Send via WhatsApp Too
              </a>
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
