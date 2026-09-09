import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard"; 
import { productCategories } from "../../data/Product";
import { useProducts } from "../../hooks/useProducts";
import { parsePrice } from "../../utils/formatters";

const categories = [
  "All",
  ...productCategories,
];

function ProductGrid() {
  const { products, loading } = useProducts();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parsePrice(a.price) - parsePrice(b.price);
        case "price-high":
          return parsePrice(b.price) - parsePrice(a.price);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

          <input
            type="text"
            placeholder="Search furniture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white shadow-xs"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-5 py-3 bg-white shadow-xs"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>

        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition font-medium text-sm ${
                selectedCategory === category
                  ? "bg-amber-800 text-white shadow-md"
                  : "bg-white border border-gray-300 hover:bg-amber-100 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid / Skeletons */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded-full w-1/4" />
                  <div className="h-6 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-5 bg-gray-200 rounded-full w-1/3" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-10 bg-gray-200 rounded-lg" />
                    <div className="h-10 bg-gray-200 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-700">No furniture found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default ProductGrid;
