import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    review:
      "Excellent craftsmanship and premium quality furniture. Delivery was on time and the finishing is outstanding.",
  },
  {
    id: 2,
    name: "Priya Reddy",
    review:
      "The custom dining table exceeded our expectations. Highly recommended for anyone looking for wooden furniture.",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    review:
      "Professional service and beautiful furniture. The team helped us design exactly what we wanted.",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-10 text-center">

                <div className="text-yellow-500 text-2xl mb-4">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="text-lg italic text-gray-600">
                  "{item.review}"
                </p>

                <h3 className="mt-6 text-xl font-bold">
                  {item.name}
                </h3>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Testimonials;
