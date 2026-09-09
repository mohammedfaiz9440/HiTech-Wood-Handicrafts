import React, { useState } from "react";
import { Ruler, Award, ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Product } from "../../data/Product";

interface ProductSpecsTabsProps {
  product: Product;
}

export const ProductSpecsTabs: React.FC<ProductSpecsTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<"specs" | "craftsmanship" | "warranty" | "care">("specs");

  const getDimensions = (category: string) => {
    switch (category.toLowerCase()) {
      case "doors":
        return [
          { label: "Standard Height", value: "81\" to 84\" (approx. 7 Feet)" },
          { label: "Standard Width", value: "36\" to 38\" (Single) / 60\" - 72\" (Double)" },
          { label: "Core Thickness", value: "35 mm to 42 mm Solid Core" },
          { label: "Custom Sizing", value: "Custom dimensions cut to your frame measurements" },
        ];
      case "sofas":
        return [
          { label: "Seating Capacity", value: "3 to 7 Seater (Custom Modular Options)" },
          { label: "Total Length", value: "78\" to 108\" depending on configuration" },
          { label: "Seat Depth", value: "34\" deep ergonomic seating" },
          { label: "Back Height", value: "33\" to 36\" supportive backrest" },
        ];
      case "beds":
        return [
          { label: "Mattress Size", value: "King Size (72\" x 78\") / Queen Size (60\" x 78\")" },
          { label: "Headboard Height", value: "48\" to 54\" carved wooden headboard" },
          { label: "Underbed Clearance", value: "8\" to 10\" (Hydraulic/Box storage available)" },
        ];
      case "dining":
        return [
          { label: "Tabletop Dimensions", value: "72\" Length x 36\" Width x 30\" Height" },
          { label: "Seating", value: "6 to 8 Seater with ergonomic solid wood chairs" },
          { label: "Top Thickness", value: "1.25\" Solid seasoned teak plank" },
        ];
      case "wardrobes":
        return [
          { label: "Dimensions", value: "48\" - 60\" Width x 78\" Height x 22\" Depth" },
          { label: "Internal Shelving", value: "Custom hanging rods, brass drawer locks & shelves" },
        ];
      case "tv units":
        return [
          { label: "Dimensions", value: "60\" - 78\" Length x 16\" Depth x 22\" Height" },
          { label: "Cable Management", value: "Concealed rear wire passthroughs" },
        ];
      default:
        return [
          { label: "Dimensions", value: "Custom built to client room specifications" },
          { label: "Weight", value: "Heavy solid wood construction" },
        ];
    }
  };

  const dimensions = getDimensions(product.category);

  return (
    <div className="mt-12 bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto bg-gray-50/70">
        <button
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "specs"
              ? "border-amber-800 text-amber-900 bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Ruler size={16} />
          Dimensions & Fit
        </button>

        <button
          onClick={() => setActiveTab("craftsmanship")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "craftsmanship"
              ? "border-amber-800 text-amber-900 bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Sparkles size={16} />
          Materials & Wood
        </button>

        <button
          onClick={() => setActiveTab("warranty")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "warranty"
              ? "border-amber-800 text-amber-900 bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <ShieldCheck size={16} />
          Warranty & Safe Delivery
        </button>

        <button
          onClick={() => setActiveTab("care")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === "care"
              ? "border-amber-800 text-amber-900 bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Award size={16} />
          Care Guide
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {activeTab === "specs" && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Sizing & Technical Specifications
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              All our pieces are individually bench-made. If your doorway or room requires custom height or width, our master artisans will build it to your exact millimeters.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dimensions.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200/70">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "craftsmanship" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Heritage Woodworking & Joinery
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="border-l-2 border-amber-800 pl-4 space-y-1">
                <h4 className="font-bold text-gray-900">Kiln-Seasoned Solid Wood</h4>
                <p className="text-gray-600 leading-relaxed">
                  Carefully dried to 8–10% moisture content in vacuum kilns to prevent warping, cracking, or joint expansion across Indian weather conditions.
                </p>
              </div>

              <div className="border-l-2 border-amber-800 pl-4 space-y-1">
                <h4 className="font-bold text-gray-900">Mortise & Tenon Joinery</h4>
                <p className="text-gray-600 leading-relaxed">
                  Built using age-old interlocking wood-to-wood joinery rather than cheap nails or staples, ensuring generational structural longevity.
                </p>
              </div>

              <div className="border-l-2 border-amber-800 pl-4 space-y-1">
                <h4 className="font-bold text-gray-900">Multi-Layer PU Finish</h4>
                <p className="text-gray-600 leading-relaxed">
                  Sealed with 3 coats of polyurethane barrier that resists light water spills, cup rings, and surface scratches while showcasing natural grains.
                </p>
              </div>

              <div className="border-l-2 border-amber-800 pl-4 space-y-1">
                <h4 className="font-bold text-gray-900">High-Resilience Cushioning (Sofas)</h4>
                <p className="text-gray-600 leading-relaxed">
                  32+ density virgin foam core wrapped in feather-touch fiber batting for plush comfort without sagging over years of daily family use.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-2">
                  <ShieldCheck size={20} className="text-amber-800" />
                  5-Year Structural & Termite Warranty
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vacuum pressure treated with non-toxic anti-borer and anti-termite chemicals. Covered against manufacturing defects, termite infestation, and joint separation for a full 5 years.
                </p>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-900 font-bold mb-2">
                  <Truck size={20} className="text-emerald-800" />
                  Reinforced Wooden-Crate Transit
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Packaged in 4 protective layers: foam edge protectors, waterproof bubble wrap, corrugated casing, and heavy-duty timber crate packing for safe delivery across all states in India.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "care" && (
          <div className="text-sm text-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Preserving Your Handcrafted Woodwork
            </h3>
            <ul className="space-y-3 list-disc list-inside text-gray-600 leading-relaxed">
              <li><strong className="text-gray-800">Routine Dusting:</strong> Wipe along the grain with a clean, dry, lint-free microfiber cloth.</li>
              <li><strong className="text-gray-800">Moisture Protection:</strong> Use coasters under hot mugs and beverage glasses. Wipe any accidental liquid spills immediately.</li>
              <li><strong className="text-gray-800">Sunlight & Heat:</strong> Avoid positioning solid wood directly next to intense heating blowers or prolonged uncovered harsh midday sunlight.</li>
              <li><strong className="text-gray-800">Annual Nourishment:</strong> Apply high-grade natural beeswax or mineral oil polish once every 12-18 months to retain the natural luster.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecsTabs;
