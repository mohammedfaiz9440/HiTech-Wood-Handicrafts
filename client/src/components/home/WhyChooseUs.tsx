import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Hammer,
  BadgeDollarSign,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: <Hammer size={40} className="text-amber-800" />,
      title: "Expert Craftsmanship",
      description:
        "Every furniture piece is handcrafted by experienced artisans using premium wood.",
    },
    {
      icon: <ShieldCheck size={40} className="text-amber-800" />,
      title: "Premium Quality",
      description:
        "We use high-quality materials to ensure durability and long-lasting elegance.",
    },
    {
      icon: <Truck size={40} className="text-amber-800" />,
      title: "Fast Delivery",
      description:
        "Safe and timely delivery across Hyderabad and surrounding areas.",
    },
    {
      icon: <BadgeDollarSign size={40} className="text-amber-800" />,
      title: "Best Pricing",
      description:
        "Affordable pricing without compromising quality or craftsmanship.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold">
            Why Choose Us
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We combine traditional craftsmanship with modern designs to
            create furniture that enhances your home and office.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="bg-gray-50 rounded-xl shadow-md p-8 text-center"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;