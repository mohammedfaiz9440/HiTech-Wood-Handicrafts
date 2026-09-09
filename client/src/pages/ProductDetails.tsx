import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../data/Product";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Sparkles,
  Share2,
  Check,
  MessageCircle,
} from "lucide-react";
import ProductZoomImage from "../components/product/ProductZoomImage";
import WoodFinishSelector from "../components/product/WoodFinishSelector";
import ProductSpecsTabs from "../components/product/ProductSpecsTabs";
import RelatedProducts from "../components/product/RelatedProducts";
import { shareProduct } from "../utils/shareUtils";
import { useMetaTags } from "../hooks/useMetaTags";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Dynamic meta tags for rich social and WhatsApp link previews (must be at top level before conditional returns)
  useMetaTags({
    title: product ? product.name : undefined,
    description: product
      ? `Handcrafted ${product.name} (${product.category}) from HiTech Wood Handicrafts. Price: ${product.price}. 100% solid seasoned teak wood, custom finishes, and safe crate transit across India.`
      : undefined,
    image: product?.image,
  });

  useEffect(() => {
    let isMounted = true;
    if (id) {
      setLoading(true);
      getProductById(id).then((data) => {
        if (isMounted) {
          setProduct(data || null);
          if (data) {
            setSelectedFinish(
              data.category.toLowerCase() === "sofas"
                ? "Forest Emerald Velvet"
                : "Natural Teak"
            );
          }
          setLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gray-200 min-h-[400px] lg:min-h-[600px]" />
              <div className="p-8 space-y-6">
                <div className="h-4 bg-gray-200 rounded-full w-1/4" />
                <div className="h-10 bg-gray-200 rounded-full w-3/4" />
                <div className="h-8 bg-gray-200 rounded-full w-1/3" />
                <div className="h-24 bg-gray-200 rounded-xl" />
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If product doesn't exist
  if (!product) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-4">
            Sorry, the product you are looking for does not exist in our catalog.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
          >
            ← Back to Products
          </button>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart(product!, quantity);
  };

  // WhatsApp order function with selected finish and link
  const handleWhatsAppOrder = () => {
    if (!product) return;
    const pageUrl = window.location.href;
    const message = `Hello HiTech Wood Handicrafts, I am interested in this piece:

*Product:* ${product.name}
*Category:* ${product.category}
*Selected Finish:* ${selectedFinish || "Natural Wood / Standard"}
*Price:* ${product.price}
*Quantity:* ${quantity}
*Product Link:* ${pageUrl}

I would like to inquire about customization options, delivery timeline, and placing an order.`;

    const whatsappNumber = "916304270702";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  // Share via WhatsApp or Native Web Share
  const handleShareWhatsApp = async () => {
    if (!product) return;
    await shareProduct(product, selectedFinish);
  };

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Breadcrumb & Share */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-800 font-medium transition duration-300 text-sm"
          >
            <span className="text-lg">←</span>
            Back to Products Catalog
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 text-green-800 text-xs font-semibold transition"
              title="Share on WhatsApp"
            >
              <MessageCircle size={14} className="text-green-600" />
              Share on WhatsApp
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold transition"
              title="Copy Page Link"
            >
              {copiedLink ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= INTERACTIVE IMAGE ZOOM ================= */}
            <div className="p-6 sm:p-8 lg:p-10 bg-gray-50/50 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
              <ProductZoomImage
                image={product.image}
                galleryImages={product.galleryImages}
                name={product.name}
                category={product.category}
              />
            </div>

            {/* ================= PRODUCT DETAILS ================= */}
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Category & Heritage tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-amber-800 font-bold uppercase tracking-widest text-xs">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    SKU: HTW-{product.id.toString().padStart(4, "0")}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                  {product.name}
                </h1>

                {/* Price & Tax notice */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-800">
                    {product.price}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Inclusive of GST • Direct Workshop Price
                  </span>
                </div>

                {/* Brief artisan description */}
                <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  Precision-crafted from seasoned hardwood by master artisans. Designed with enduring structural integrity, heritage elegance, and tailored finishes for contemporary Indian homes.
                </p>

                {/* Wood Finish / Fabric Swatch Selector */}
                <div className="mt-6">
                  <WoodFinishSelector
                    category={product.category}
                    selectedFinish={selectedFinish}
                    onSelectFinish={(finish) => setSelectedFinish(finish)}
                  />
                </div>

                {/* Trust Highlights Strip */}
                <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <Sparkles size={16} className="text-amber-700 flex-shrink-0" />
                    <span>100% Solid Seasoned Wood</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <ShieldCheck size={16} className="text-amber-700 flex-shrink-0" />
                    <span>5-Yr Termite & Structural Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <Truck size={16} className="text-amber-700 flex-shrink-0" />
                    <span>Timber-Crate All-India Transit</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <MessageCircle size={16} className="text-amber-700 flex-shrink-0" />
                    <span>Custom Dimensions on Request</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Order Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2 hover:bg-gray-200 transition text-gray-700"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 font-bold text-gray-900 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-2 hover:bg-gray-200 transition text-gray-700"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Primary CTA: Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-amber-800 hover:bg-amber-900 text-white px-6 py-3.5 rounded-xl font-semibold transition duration-200 shadow-md flex items-center justify-center gap-2.5 text-sm sm:text-base"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>

                  {/* Secondary CTA: WhatsApp Customization */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold transition duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <MessageCircle size={18} />
                    Request on WhatsApp
                  </button>
                </div>

                <button
                  onClick={() => navigate("/custom-order")}
                  className="w-full mt-3 text-xs font-semibold text-amber-900 hover:text-amber-950 py-2 transition text-center"
                >
                  Need completely custom dimensions or carving? <span className="underline">Request a Custom Order →</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ================= DETAILED SPECIFICATIONS TABS ================= */}
        <ProductSpecsTabs product={product} />

        {/* ================= RELATED PRODUCTS ================= */}
        <RelatedProducts
          currentProductId={product.id}
          currentCategory={product.category}
        />

      </div>
    </section>
  );
}

export default ProductDetails;