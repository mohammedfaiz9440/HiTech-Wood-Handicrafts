import { Phone, Mail, MapPin } from "lucide-react";
import { businessContact } from "../../data/contact";

function Topbar() {
  return (
    <div className="bg-amber-900 text-white text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-2">

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <a href={businessContact.phoneHref}>{businessContact.phoneDisplay}</a>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            <a href={`mailto:${businessContact.email}`}>{businessContact.email}</a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <a
            href={businessContact.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Srinagar Colony, Hyderabad
          </a>
        </div>

      </div>
    </div>
  );
}

export default Topbar;
