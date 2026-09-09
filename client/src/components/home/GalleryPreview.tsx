import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../../data/Product";

const galleryProducts = products;

function GalleryPreview() {
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
          <p className="uppercase tracking-[4px] text-amber-700 font-semibold">
            Gallery
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Our Recent Furniture Collection
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore a selection of our handcrafted wooden furniture,
            designed for homes, offices, and commercial spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {galleryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl shadow-lg group relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
                {product.name}
              </div>
            </motion.div>
          ))}

        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block border-2 border-amber-800 text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 hover:text-white transition"
          >
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}

export default GalleryPreview;
