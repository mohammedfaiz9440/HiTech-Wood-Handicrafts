import React from "react";
import { Check } from "lucide-react";

interface FinishOption {
  id: string;
  name: string;
  color: string;
  texture?: string;
  description: string;
}

const WOOD_FINISHES: FinishOption[] = [
  {
    id: "natural-teak",
    name: "Natural Teak",
    color: "#B57B43",
    description: "Golden warm glow highlighting natural grain patterns",
  },
  {
    id: "dark-walnut",
    name: "Dark Walnut",
    color: "#3F2618",
    description: "Deep, rich coffee tone with elegant satin sheen",
  },
  {
    id: "honey-mahogany",
    name: "Honey Mahogany",
    color: "#83381B",
    description: "Warm amber-red classic royal polish",
  },
  {
    id: "antique-dark",
    name: "Heritage Rosewood",
    color: "#28150D",
    description: "Sophisticated dark heritage polish with subtle depth",
  },
];

const FABRIC_FINISHES: FinishOption[] = [
  {
    id: "emerald-velvet",
    name: "Forest Emerald Velvet",
    color: "#0F4D38",
    description: "Ultra-soft premium high-density velvet with jewel tone",
  },
  {
    id: "slate-blue",
    name: "Slate Blue Linen-Weave",
    color: "#3E576B",
    description: "Textured breathable weave, highly durable & stain-resistant",
  },
  {
    id: "caramel-leather",
    name: "Caramel Tan Leatherette",
    color: "#9C5D30",
    description: "Supple, easy-to-wipe vegan leather with rich patinated tone",
  },
  {
    id: "oatmeal-beige",
    name: "Warm Oatmeal Neutral",
    color: "#D9CFBE",
    description: "Serene Scandinavian minimalist neutral aesthetic",
  },
  {
    id: "charcoal-grey",
    name: "Charcoal Grey Tweed",
    color: "#383838",
    description: "Contemporary textured tone that conceals wear seamlessly",
  },
];

interface WoodFinishSelectorProps {
  category: string;
  selectedFinish: string;
  onSelectFinish: (finishName: string) => void;
}

export const WoodFinishSelector: React.FC<WoodFinishSelectorProps> = ({
  category,
  selectedFinish,
  onSelectFinish,
}) => {
  const isFabricCategory = category.toLowerCase() === "sofas";
  const finishes = isFabricCategory ? FABRIC_FINISHES : WOOD_FINISHES;
  const label = isFabricCategory ? "Upholstery & Color" : "Wood Polish & Finish";

  const currentOption = finishes.find((f) => f.name === selectedFinish) || finishes[0];

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200/80">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          {label}:{" "}
          <span className="text-amber-800 font-bold">{selectedFinish || currentOption.name}</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mb-2">
        {finishes.map((option) => {
          const isSelected = (selectedFinish || currentOption.name) === option.name;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectFinish(option.name)}
              className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg border text-xs font-medium transition duration-200 ${
                isSelected
                  ? "border-amber-800 bg-amber-50 text-amber-950 shadow-xs ring-1 ring-amber-800"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-black/10 shadow-inner flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: option.color }}
              >
                {isSelected && <Check size={10} className="text-white drop-shadow-xs" />}
              </span>
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-2 italic">
        {currentOption.description}
      </p>
    </div>
  );
};

export default WoodFinishSelector;
