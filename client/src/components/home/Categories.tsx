import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/Product";

const categories = products.filter(
  (product, index, allProducts) =>
    allProducts.findIndex((item) => item.category === product.category) === index
);

function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Shop by Category
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((product, index) => (
            <motion.div
              key={product.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                <img
                  src={product.image}
                  alt={product.category}
                  className="h-72 w-full object-cover hover:scale-110 transition duration-500"
                />

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold">
                    {product.category}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;
