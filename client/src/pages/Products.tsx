import ProductGrid from "../components/product/ProductGrid";

function Products() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Products
          </h1>
          <p className="mt-4 text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto">
            Discover premium handcrafted wooden furniture for every space.
          </p>
        </div>
      </section>

      <ProductGrid />
    </div>
  );
}

export default Products;
