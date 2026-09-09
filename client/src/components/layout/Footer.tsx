import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { businessContact } from "../../data/contact";

function Footer() {
  return (
    <footer className="bg-[#2b1c12] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold text-amber-400">
            Hi Tech Wood Handicrafts
          </h2>

          <p className="mt-4 text-gray-300 leading-7">
            Crafting premium wooden furniture with elegance, quality,
            and timeless craftsmanship.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/custom-order">Custom Order</Link></li>
            <li><Link to="/bulk-orders">Bulk Orders</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Categories
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Sofas</li>
            <li>Dining Tables</li>
            <li>Beds</li>
            <li>Wardrobes</li>
            <li>TV Units</li>
            <li>Office Furniture</li>
            <li>Doors</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <a
            href={businessContact.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 text-gray-300 transition hover:text-amber-300"
          >
            <MapPin size={18} className="mt-1 text-amber-400 shrink-0" />
            <span>{businessContact.address}</span>
          </a>

          <div className="mt-3 flex items-center gap-3 text-gray-300">
            <Phone size={18} className="text-amber-400 shrink-0" />
            <a
              href={businessContact.phoneHref}
              className="hover:text-amber-300 transition"
            >
              {businessContact.phoneDisplay}
            </a>
          </div>

          <div className="mt-3 flex items-center gap-3 text-gray-300">
            <Mail size={18} className="text-amber-400 shrink-0" />
            <a
              href={`mailto:${businessContact.email}`}
              className="hover:text-amber-300 transition"
            >
              {businessContact.email}
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Hi Tech Wood Handicrafts. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
