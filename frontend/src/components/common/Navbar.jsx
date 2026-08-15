import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ChefHat, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, user, login, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-500 p-2 rounded-xl">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900">
              Quick<span className="text-primary-500">Bite</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/restaurants"
              className="text-secondary-600 hover:text-primary-500
                         font-medium transition-colors duration-200"
            >
              Restaurants
            </Link>

            {isAuthenticated && isAdmin() && (
              <Link
                to="/admin"
                className="text-secondary-600 hover:text-primary-500
                           font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2 text-secondary-600
                             hover:text-primary-500 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-500
                                     text-white text-xs rounded-full h-5 w-5
                                     flex items-center justify-center font-medium">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>

                {/* User menu */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-50
                                  rounded-xl px-3 py-2">
                    <div className="bg-primary-100 p-1.5 rounded-lg">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-secondary-700">
                      {user?.firstName || user?.username}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-secondary-500
                               hover:text-red-500 transition-colors p-2"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={login}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Log in
                </button>
                <button
                  onClick={login}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-secondary-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <X className="h-6 w-6" />
              : <Menu className="h-6 w-6" />
            }
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <Link
              to="/restaurants"
              className="block px-4 py-2 text-secondary-600
                         hover:text-primary-500 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Restaurants
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="block px-4 py-2 text-secondary-600
                             hover:text-primary-500 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-2
                             text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { login(); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-2
                           text-primary-500 font-medium"
              >
                Login / Register
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;