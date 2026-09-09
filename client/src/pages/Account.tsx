import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, MapPin, LogOut, ShoppingBag, Clock } from "lucide-react";
import { getUserOrders, type OrderData } from "../services/orderService";
import { formatPrice } from "../utils/formatters";

export default function Account() {
  const { user, loading: authLoading, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile">("orders");
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (user) {
      setOrdersLoading(true);
      getUserOrders(user.uid).then((data) => {
        if (isMounted) {
          setOrders(data);
          setOrdersLoading(false);
        }
      });
    } else {
      setOrders([]);
      setOrdersLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-amber-800" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Sign In Required</h2>
        <p className="text-gray-600 max-w-md mb-6">
          Please sign in to view your orders, saved addresses, and profile details.
        </p>
        <button
          onClick={openAuthModal}
          className="bg-amber-800 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-amber-900 transition shadow-md flex items-center gap-2"
        >
          <span>Sign In with Google</span>
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Production":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Banner */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-800 text-white rounded-full flex items-center justify-center text-2xl font-bold uppercase shadow-sm">
              {user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {user.displayName || "Valued Customer"}
              </h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 border border-red-200 text-red-700 hover:bg-red-50 px-5 py-2.5 rounded-xl font-medium text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Account Tabs & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="bg-white rounded-2xl shadow-md p-4 space-y-2 h-fit">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === "orders"
                  ? "bg-amber-800 text-white shadow-sm"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <Package className="w-4 h-4" />
              Order History ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === "addresses"
                  ? "bg-amber-800 text-white shadow-sm"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Saved Addresses
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === "profile"
                  ? "bg-amber-800 text-white shadow-sm"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <User className="w-4 h-4" />
              Profile Details
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-amber-800" />
                    Your Orders
                  </h2>

                  {ordersLoading ? (
                    <div className="py-12 flex justify-center">
                      <div className="w-8 h-8 border-3 border-amber-800 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-gray-800">No orders placed yet</h3>
                      <p className="text-gray-500 text-sm max-w-sm mx-auto mt-1 mb-6">
                        You haven't placed any handicraft or furniture orders yet.
                      </p>
                      <Link
                        to="/products"
                        className="bg-amber-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-amber-900 transition"
                      >
                        Browse Furniture Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition bg-gray-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-gray-900">{order.id}</span>
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getStatusBadge(order.orderStatus)}`}>
                                {order.orderStatus}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">
                                {order.paymentStatus}
                              </span>
                            </div>

                            <p className="text-sm font-medium text-gray-700">
                              {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(", ")}
                            </p>

                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                            </span>
                          </div>

                          <div className="text-left sm:text-right">
                            <span className="text-lg font-bold text-amber-800">{formatPrice(order.grandTotal)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-800" />
                  Saved Shipping Address
                </h2>
                {orders.length > 0 ? (
                  <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Primary Delivery Address</span>
                    <h4 className="font-bold text-gray-900">{orders[0].customerName} ({orders[0].phone})</h4>
                    <p className="text-sm text-gray-600">{orders[0].address}</p>
                    <p className="text-sm text-gray-600">{orders[0].city}, {orders[0].state} - {orders[0].pincode}</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 text-center py-8">
                    <p className="text-gray-500 text-sm">No saved address found. Your delivery address will be saved here automatically when you place your first order.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-800" />
                  Account Details
                </h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Display Name</label>
                    <input
                      type="text"
                      disabled
                      value={user.displayName || "Not set"}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user.email || ""}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
