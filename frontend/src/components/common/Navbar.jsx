import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ChefHat, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, user, login, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                    ${scrolled
                      ? 'bg-white/80 backdrop-blur-2xl shadow-2xl shadow-black/5 py-2'
                      : 'bg-white/60 backdrop-blur-xl py-4'}
                    border-b border-white/50`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-orange-500
                              rounded-2xl blur-lg opacity-60 group-hover:opacity-100
                              transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600
                              p-3 rounded-2xl shadow-xl shadow-primary-500/40
                              group-hover:shadow-2xl group-hover:shadow-primary-500/60
                              group-hover:scale-110 group-hover:rotate-6
                              transition-all duration-500">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-secondary-900 tracking-tight">
                Quick<span className="text-gradient">Bite</span>
              </div>
              <div className="text-xs text-secondary-500 font-medium -mt-1">
                Delivered fast 🚀
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-white/50
                          rounded-2xl p-1.5 backdrop-blur-md border border-white/50">
            <Link to="/restaurants"
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300
                              ${isActive('/restaurants')
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'text-secondary-700 hover:bg-white'}`}>
              Restaurants
            </Link>

            {isAuthenticated && (
              <Link to="/orders"
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300
                                ${isActive('/orders')
                                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                                  : 'text-secondary-700 hover:bg-white'}`}>
                My Orders
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Cart with animation */}
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-3.5 rounded-2xl bg-white/70 hover:bg-white
                             backdrop-blur-md border border-white/50
                             text-secondary-700 hover:text-primary-600
                             hover:shadow-xl hover:shadow-primary-200
                             hover:-translate-y-0.5
                             transition-all duration-300 group"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1
                                     bg-gradient-to-br from-red-500 to-pink-600
                                     text-white text-xs rounded-full
                                     h-6 w-6 flex items-center justify-center
                                     font-black shadow-lg shadow-red-500/50
                                     ring-2 ring-white animate-bounce-subtle">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 bg-gradient-to-r
                                from-primary-50 via-orange-50 to-yellow-50
                                rounded-2xl px-4 py-2.5
                                border border-primary-100 shadow-md
                                hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-orange-500
                                    rounded-xl blur-md opacity-60"></div>
                    <div className="relative bg-gradient-to-br from-primary-500 to-primary-600
                                    h-10 w-10 rounded-xl flex items-center justify-center
                                    shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary-500 font-medium">Hi there 👋</div>
                    <div className="text-sm font-black text-secondary-900 -mt-0.5">
                      {user?.firstName || user?.username}
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-3.5 rounded-2xl bg-white/70 hover:bg-red-50
                             backdrop-blur-md border border-white/50
                             text-secondary-700 hover:text-red-600
                             hover:shadow-xl hover:-translate-y-0.5
                             transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={login} className="btn-secondary text-sm py-2.5 px-6">
                  Log in
                </button>
                <button onClick={login} className="btn-primary text-sm py-2.5 px-6">
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-white/70 backdrop-blur-md
                       border border-white/50 text-secondary-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4 slide-down">
            <Link to="/restaurants" onClick={() => setMobileOpen(false)}
                  className="block px-5 py-3 bg-white/70 backdrop-blur-md
                             rounded-2xl font-bold text-secondary-700
                             border border-white/50">
              🍽️ Restaurants
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" onClick={() => setMobileOpen(false)}
                      className="block px-5 py-3 bg-white/70 backdrop-blur-md
                                 rounded-2xl font-bold text-secondary-700
                                 border border-white/50">
                  🛒 Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)}
                      className="block px-5 py-3 bg-white/70 backdrop-blur-md
                                 rounded-2xl font-bold text-secondary-700
                                 border border-white/50">
                  📦 My Orders
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }}
                        className="block w-full text-left px-5 py-3 bg-red-50
                                   rounded-2xl font-bold text-red-600">
                  🚪 Logout
                </button>
              </>
            ) : (
              <button onClick={() => { login(); setMobileOpen(false); }}
                      className="btn-primary w-full">
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