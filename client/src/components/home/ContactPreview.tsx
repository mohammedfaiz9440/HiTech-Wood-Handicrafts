import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { businessContact } from "../../data/contact";

function ContactPreview() {
  return (
    <section className="py-24 bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[4px] text-amber-300">
            Contact Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Let's Build Your Dream Furniture
          </h2>

          <p className="mt-6 text-gray-200 leading-8">
            Looking for premium handcrafted furniture or a custom design?
            Contact Hi Tech Wood Handicrafts today. Our team is ready to
            help you create furniture that perfectly fits your space.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <Phone className="text-amber-300" />
              <a href={businessContact.phoneHref}>{businessContact.phoneDisplay}</a>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-amber-300" />
              <a href={`mailto:${businessContact.email}`}>{businessContact.email}</a>
            </div>

            <a
              href={businessContact.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4"
            >
              <MapPin className="mt-0.5 shrink-0 text-amber-300" />
              <span>{businessContact.address}</span>
            </a>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl p-10 text-black"
        >
          <h3 className="text-3xl font-bold mb-6">
            Need a Custom Order?
          </h3>

          <p className="text-gray-600 mb-8">
            Contact us today for customized wooden furniture designed
            specifically for your home or office.
          </p>

          <div className="space-y-4">

            <Link
              to="/custom-order"
              className="block w-full text-center bg-amber-800 text-white py-4 rounded-lg hover:bg-amber-700 transition"
            >
              Request Custom Order
            </Link>

            <a
              href={businessContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>

            <Link
              to="/contact"
              className="block w-full text-center border-2 border-amber-800 text-amber-800 py-4 rounded-lg hover:bg-amber-800 hover:text-white transition"
            >
              Contact Page
            </Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default ContactPreview;
