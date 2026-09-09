import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatters";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    cartItems,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    let orderDetails = `*HiTech Wood Handicrafts - Cart Order Inquiry*\n\nHello! I would like to order the following pieces:\n\n`;
    cartItems.forEach((item, index) => {
      orderDetails += `${index + 1}. *${item.product.name}* (${item.product.category})\n   Quantity: ${item.quantity} | Unit Price: ${item.product.price}\n`;
    });
    orderDetails += `\n*Estimated Total:* ${formatPrice(subtotal)}`;
    orderDetails += `\n\nPlease confirm availability, custom finishes, and delivery timeframe.`;

    const whatsappNumber = "916304270702";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;
    window.open(url, "_blank");
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-amber-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <span className="bg-amber-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                {totalItems} {totalItems === 1 ? "Item" : "Items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-amber-800 rounded-full transition duration-200"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-amber-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 max-w-xs mb-6 text-sm">
                  Looks like you haven't added any handcrafted furniture to your cart yet.
                </p>
                <Link
                  to="/products"
                  onClick={closeCart}
                  className="bg-amber-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 shadow-xs hover:border-gray-200 transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-400 hover:text-red-600 transition p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xs text-amber-800 font-medium uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-amber-800">
                          {product.price}
                        </span>

                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-sm font-semibold text-gray-800">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-500 hover:text-red-600 underline font-medium transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <span>Subtotal</span>
                  <span className="text-amber-800 text-lg">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Taxes and shipping calculated at checkout. Free freight consultation on custom orders.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" /> Proceed to Checkout
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  Order via WhatsApp <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
