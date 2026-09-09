import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/formatters";
import { createOrder, type OrderData } from "../services/orderService";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, ShieldCheck, Truck, ArrowLeft, Loader2, CheckCircle, Percent } from "lucide-react";

export default function Checkout() {
  const { cartItems, subtotal, clearCart, closeCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Telangana");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "advance25" | "cod">("online");
  const [loading, setLoading] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-900 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Calculate freight shipping
  const shipping = subtotal > 20000 ? 0 : 750;
  const grandTotal = subtotal + shipping;
  const advanceAmount = Math.round(grandTotal * 0.25);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomNum}`;

    let status: "Paid" | "25% Advance Paid" | "Pending COD" = "Pending COD";
    if (paymentMethod === "online") status = "Paid";
    if (paymentMethod === "advance25") status = "25% Advance Paid";

    const newOrder: OrderData = {
      id: orderId,
      userId: user?.uid || "guest",
      customerName: name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items: [...cartItems],
      subtotal,
      shipping,
      grandTotal,
      paymentMethod,
      paymentStatus: status,
      orderStatus: "Placed",
      createdAt: new Date().toISOString(),
    };

    // Simulate 1.2 second processing
    setTimeout(async () => {
      await createOrder(newOrder);
      clearCart();
      closeCart();
      setLoading(false);
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-amber-800 font-medium mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-800" />
                Shipping & Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address & Landmark *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Plot No., Street Name, Area, Landmark"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="500001"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-700 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-800" />
                Select Payment Option
              </h2>

              <div className="space-y-3">
                {/* Option 1: Online Payment */}
                <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "online" ? "border-amber-800 bg-amber-50/60 ring-1 ring-amber-800" : "border-gray-200 hover:border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="mt-1 accent-amber-800"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-sm">Full Online Payment (UPI, Cards, Netbanking)</span>
                      <span className="text-xs bg-green-100 text-green-800 font-bold px-2.5 py-0.5 rounded-full">Recommended</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Instant confirmation & priority workshop processing.</p>
                  </div>
                </label>

                {/* Option 2: 25% Advance Booking */}
                <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "advance25" ? "border-amber-800 bg-amber-50/60 ring-1 ring-amber-800" : "border-gray-200 hover:border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "advance25"}
                    onChange={() => setPaymentMethod("advance25")}
                    className="mt-1 accent-amber-800"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-sm">Pay 25% Advance ({formatPrice(advanceAmount)})</span>
                      <Percent className="w-4 h-4 text-amber-800" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Pay 25% now for wood selection & crafting. Pay balance upon delivery.</p>
                  </div>
                </label>

                {/* Option 3: COD */}
                <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "cod" ? "border-amber-800 bg-amber-50/60 ring-1 ring-amber-800" : "border-gray-200 hover:border-gray-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 accent-amber-800"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 text-sm">Cash on Delivery (COD)</span>
                    <p className="text-xs text-gray-500 mt-1">Pay in cash or UPI to the freight team upon furniture arrival.</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing Order...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" /> Place Order ({formatPrice(paymentMethod === "advance25" ? advanceAmount : grandTotal)})
                </>
              )}
            </button>

          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-28 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Order Summary</h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-amber-800">{product.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Freight Delivery</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? <span className="text-green-600 font-bold">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>

                <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Grand Total</span>
                  <span className="text-amber-800 text-xl">{formatPrice(grandTotal)}</span>
                </div>

                {paymentMethod === "advance25" && (
                  <div className="p-3 bg-amber-50 rounded-xl text-xs space-y-1 text-amber-900 border border-amber-200">
                    <div className="flex justify-between font-bold">
                      <span>25% Payable Now:</span>
                      <span>{formatPrice(advanceAmount)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>75% Balance on Delivery:</span>
                      <span>{formatPrice(grandTotal - advanceAmount)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3 text-xs text-gray-500">
                <ShieldCheck className="w-8 h-8 text-amber-800 shrink-0" />
                <span>100% Handcrafted Assurance. Guaranteed quality teak &Sheesham wood construction.</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
