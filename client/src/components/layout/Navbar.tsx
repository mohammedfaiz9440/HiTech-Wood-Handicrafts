import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, LogOut, Package } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Custom Order", path: "/custom-order" },
    { name: "Bulk Orders", path: "/bulk-orders" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold text-amber-800">
              Hi Tech Wood
            </span>

            <span className="text-xs tracking-[3px] uppercase text-gray-500">
              Handicrafts
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-amber-800 border-b-2 border-amber-800 pb-1"
                      : "text-gray-700 hover:text-amber-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-amber-800 hover:bg-amber-50 rounded-full transition"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth / Account Profile Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 bg-amber-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-xs hover:bg-amber-900 transition"
                  title={user.displayName || user.email || "Account"}
                >
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || "U"}
                </button>

                {/* Profile Dropdown */}
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {user.displayName || "Customer"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition"
                    >
                      <Package className="w-4 h-4" />
                      My Account & Orders
                    </Link>

                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        logout();
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 text-gray-700 hover:text-amber-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-amber-50 transition"
              >
                <User size={20} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Desktop Quote Button */}
            <Link
              to="/contact"
              className="hidden lg:block bg-amber-800 text-white px-5 py-2.5 rounded-lg hover:bg-amber-700 transition font-medium text-sm"
            >
              Get a Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {isOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6">

            <nav className="flex flex-col gap-5">

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `font-medium ${
                      isActive
                        ? "text-amber-800"
                        : "text-gray-700 hover:text-amber-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {user ? (
                <Link
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  className="bg-amber-100 text-amber-900 font-semibold text-center py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <User size={18} /> My Account
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAuthModal();
                  }}
                  className="bg-amber-800 text-white text-center py-3 rounded-lg font-medium"
                >
                  Sign In / Register
                </button>
              )}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="border-2 border-amber-800 text-amber-800 text-center py-3 rounded-lg font-semibold"
              >
                Get a Quote
              </Link>

            </nav>

          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;
