import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Mail, MapPin, Phone } from "lucide-react";
import { db } from "../../firebase/firebase";
import { businessContact } from "../data/contact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      setLoading(true);

      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSuccess("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto">
            We'd love to hear from you. Visit our workshop or reach out directly.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={businessContact.phoneHref}
            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm text-gray-700 hover:text-amber-800 hover:border-amber-800 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Call Us</div>
              <div className="font-semibold text-sm">{businessContact.phoneDisplay}</div>
            </div>
          </a>

          <a
            href={`mailto:${businessContact.email}`}
            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm text-gray-700 hover:text-amber-800 hover:border-amber-800 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-amber-800" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs text-gray-500 font-medium">Email Us</div>
              <div className="font-semibold text-sm truncate">{businessContact.email}</div>
            </div>
          </a>

          <a
            href={businessContact.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm text-gray-700 hover:text-amber-800 hover:border-amber-800 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Location</div>
              <div className="font-semibold text-xs leading-snug line-clamp-2">Punjagutta, Hyderabad</div>
            </div>
          </a>

          <a
            href={businessContact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm text-gray-700 hover:text-amber-800 hover:border-amber-800 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-800"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Instagram</div>
              <div className="font-semibold text-sm">{businessContact.instagramHandle}</div>
            </div>
          </a>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200/80 space-y-6"
          >
            <div className="border-b border-gray-100 pb-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              <p className="text-xs text-gray-500 mt-1">
                Have a question or custom design idea? Send us a quick note below.
              </p>
            </div>

            {success && (
              <div className="bg-green-50 border border-green-300 text-green-700 p-4 rounded-xl text-sm font-medium">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Mohammed Faiz"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-amber-800 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-sm text-white shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-800 hover:bg-amber-900 active:scale-[0.99]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
