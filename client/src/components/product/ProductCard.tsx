import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Share2, Check } from "lucide-react";
import { shareProduct } from "../../utils/shareUtils";
import { products as localProducts } from "../../data/Product";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: string;
}

function ProductCard({ id, name, price, image, category = "Handicrafts" }: ProductCardProps) {
  const { addToCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [currentImg, setCurrentImg] = useState(image);

  React.useEffect(() => {
    setCurrentImg(image);
  }, [image]);

  const handleImageError = () => {
    const fallback = localProducts.find((p) => p.id === id);
    if (fallback && fallback.image !== currentImg) {
      setCurrentImg(fallback.image);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
      category,
      galleryImages: [image],
    });
  };

  const handleQuickShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await shareProduct({ id, name, price, category });
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between overflow-hidden border border-gray-100 group">
      {/* Image container with Category Tag & Share Button */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/products/${id}`} className="block">
          <img
            src={currentImg}
            alt={name}
            onError={handleImageError}
            className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>

        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-sm">
          {category}
        </span>

        {/* Quick Share on WhatsApp / Social button */}
        <button
          onClick={handleQuickShare}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-green-700 shadow-md backdrop-blur-xs transition duration-200 opacity-90 hover:opacity-100"
          title="Share via WhatsApp"
          aria-label="Share product"
        >
          {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider">
            {category}
          </span>
          <Link to={`/products/${id}`}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-1 line-clamp-1 hover:text-amber-800 transition">
              {name}
            </h3>
          </Link>

          <div className="flex items-baseline justify-between mt-2">
            <p className="text-amber-800 text-xl font-bold">
              {price}
            </p>
            <span className="text-[11px] text-gray-500 font-medium">
              Direct Workshop
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-5">
          <Link to={`/products/${id}`}>
            <button className="w-full border-2 border-amber-800 text-amber-800 py-2.5 rounded-lg hover:bg-amber-800 hover:text-white transition font-medium text-sm">
              View Details
            </button>
          </Link>

          <button
            onClick={handleQuickAdd}
            className="w-full bg-amber-800 text-white py-2.5 rounded-lg hover:bg-amber-900 transition font-medium text-sm flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;