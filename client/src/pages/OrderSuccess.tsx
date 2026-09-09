import { useLocation, useParams, Link } from "react-router-dom";
import { formatPrice } from "../utils/formatters";
import type { OrderData } from "../services/orderService";
import { CheckCircle2, Package, MapPin, Truck, ArrowRight } from "lucide-react";

export default function OrderSuccess() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const order = location.state?.order as OrderData | undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center p-8 sm:p-12 border border-gray-100 space-y-6">
          
          {/* Success Animated Icon */}
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-800">Order Confirmed</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">Thank You for Your Order!</h1>
            <p className="text-gray-500 text-sm mt-2">
              Your order <span className="font-bold text-gray-800">#{orderId}</span> has been received and sent to our carpentry workshop.
            </p>
          </div>

          {order && (
            <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 text-sm border border-gray-100">
              
              {/* Order Info Bar */}
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-gray-200 pb-3 text-xs">
                <div>
                  <span className="text-gray-500">Order ID: </span>
                  <span className="font-bold text-gray-900">{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-500">Payment Status: </span>
                  <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">{order.paymentStatus}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                  <Package className="w-4 h-4 text-amber-800" /> Items Ordered
                </h4>
                {order.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <h5 className="font-semibold text-gray-900">{product.name}</h5>
                        <span className="text-xs text-gray-500">Quantity: {quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-amber-800">{product.price}</span>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="pt-2">
                <h4 className="font-bold text-gray-900 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-1">
                  <MapPin className="w-4 h-4 text-amber-800" /> Delivery Address
                </h4>
                <p className="text-gray-700 font-medium">{order.customerName} ({order.phone})</p>
                <p className="text-gray-500 text-xs">{order.address}, {order.city}, {order.state} - {order.pincode}</p>
              </div>

              {/* Total Summary */}
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-base font-bold text-gray-900">
                <span>Total Paid / Reserved</span>
                <span className="text-amber-800 text-xl">{formatPrice(order.grandTotal)}</span>
              </div>
            </div>
          )}

          <div className="p-4 bg-amber-50 rounded-2xl flex items-center gap-3 text-xs text-amber-900 border border-amber-200 text-left">
            <Truck className="w-6 h-6 shrink-0 text-amber-800" />
            <div>
              <p className="font-bold">Estimated Delivery: 7–10 Working Days</p>
              <p className="text-amber-800/80">Our dispatch team will contact you via WhatsApp/Call prior to freight loading.</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/account"
              className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
            >
              Track Order in Account <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products"
              className="flex-1 border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
