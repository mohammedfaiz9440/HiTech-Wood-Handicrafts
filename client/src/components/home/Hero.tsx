import { motion } from "framer-motion";
import { products } from "../../data/Product";

function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          `url('${products[0].image}')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 text-white"
        >
          <p className="uppercase tracking-[4px] text-amber-400 mb-4">
            Welcome to
          </p>

          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            Hi Tech Wood
            <br />
            Handicrafts
          </h1>

          <p className="mt-6 text-xl max-w-2xl text-gray-200">
            Premium handcrafted wooden furniture designed with elegance,
            durability, and timeless craftsmanship.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <button className="bg-amber-800 px-8 py-4 rounded-lg hover:bg-amber-700 transition">
              Explore Collection
            </button>

            <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition">
              Custom Order
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
