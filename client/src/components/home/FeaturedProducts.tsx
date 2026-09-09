import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-amber-700 font-semibold uppercase tracking-widest text-sm">
            Our Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">
            Featured Products
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our handcrafted wooden furniture designed with
            premium materials and exceptional craftsmanship.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-1/3" />
                  <div className="h-6 bg-gray-200 rounded-full w-2/3" />
                  <div className="h-5 bg-gray-200 rounded-full w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            to="/products"
            className="inline-block border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-lg hover:bg-amber-800 hover:text-white transition font-semibold"
          >
            View All Products
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturedProducts;
