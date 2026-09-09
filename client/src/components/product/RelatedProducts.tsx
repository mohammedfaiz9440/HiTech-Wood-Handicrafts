import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import type { Product } from "../../data/Product";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface RelatedProductsProps {
  currentProductId: number;
  currentCategory: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  currentCategory,
}) => {
  const [related, setRelated] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProducts().then((all) => {
      // Products in same category, excluding current
      const sameCategory = all.filter(
        (p) => p.id !== currentProductId && p.category.toLowerCase() === currentCategory.toLowerCase()
      );
      // Fallback from other categories if not enough
      const others = all.filter(
        (p) => p.id !== currentProductId && p.category.toLowerCase() !== currentCategory.toLowerCase()
      );

      const combined = [...sameCategory, ...others].slice(0, 4);
      setRelated(combined);
    });
  }, [currentProductId, currentCategory]);

  if (related.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block mb-1">
            Complementary Pieces
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            You May Also Like
          </h2>
        </div>
        <Link
          to={`/products?category=${encodeURIComponent(currentCategory)}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900 transition"
        >
          View More in {currentCategory} <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <Link
              to={`/products/${item.id}`}
              className="relative aspect-square overflow-hidden bg-gray-100 flex items-center justify-center p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm">
                {item.category}
              </span>
            </Link>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <Link
                  to={`/products/${item.id}`}
                  className="font-semibold text-gray-900 hover:text-amber-800 transition line-clamp-1 text-sm sm:text-base"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-base font-bold text-amber-800">
                  {item.price}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  to={`/products/${item.id}`}
                  className="text-xs font-semibold text-gray-600 hover:text-amber-800 transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="p-2 rounded-lg bg-amber-50 hover:bg-amber-800 text-amber-900 hover:text-white transition duration-200"
                  title="Add to Cart"
                  aria-label="Add to Cart"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
