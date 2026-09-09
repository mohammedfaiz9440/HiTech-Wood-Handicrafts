import { Link, useSearchParams } from "react-router-dom";
import { productCategories, products } from "../data/Product";

const allCatalog = "All";
const catalogs = [allCatalog, ...productCategories];

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCatalog = searchParams.get("category") ?? allCatalog;
  const activeCatalog = catalogs.includes(selectedCatalog)
    ? selectedCatalog
    : allCatalog;
  const catalogProducts = products.filter(
    (product) =>
      activeCatalog === allCatalog || product.category === activeCatalog
  );

  const selectCatalog = (catalog: string) => {
    if (catalog === allCatalog) {
      setSearchParams({});
      return;
    }

    setSearchParams({ category: catalog });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Furniture Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto">
            Browse our artisanal solid wood portfolio handcrafted for fine living spaces.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div
            role="tablist"
            aria-label="Furniture catalogs"
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {catalogs.map((catalog) => (
              <button
                key={catalog}
                type="button"
                role="tab"
                aria-selected={activeCatalog === catalog}
                onClick={() => selectCatalog(catalog)}
                className={`border px-5 py-2 text-sm font-medium transition ${
                  activeCatalog === catalog
                    ? "border-amber-800 bg-amber-800 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-amber-800 hover:text-amber-800"
                }`}
              >
                {catalog}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogProducts.flatMap((product) =>
              product.galleryImages.map((image, imageIndex) => (
                <Link
                  key={`${product.id}-${imageIndex}`}
                  to={`/products/${product.id}`}
                  className="block overflow-hidden rounded-lg shadow-md transition hover:shadow-xl"
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Gallery;
