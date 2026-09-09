function Stats() {
  const stats = [
    {
      number: "10+",
      title: "Years Experience",
    },
    {
      number: "500+",
      title: "Happy Customers",
    },
    {
      number: "1200+",
      title: "Furniture Delivered",
    },
    {
      number: "50+",
      title: "Furniture Designs",
    },
  ];

  return (
    <section className="py-20 bg-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item) => (
            <div
              key={item.title}
              className="text-center"
            >
              <h2 className="text-5xl font-bold">
                {item.number}
              </h2>

              <p className="mt-3 text-xl">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;