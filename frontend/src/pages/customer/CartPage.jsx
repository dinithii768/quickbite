import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, fetchCart, removeFromCart, updateCartItem, clearCart, loading } = useCart();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  useEffect(() => { fetchCart(); }, []);

  const handleQuantityChange = async (itemId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    try {
      setUpdating(itemId);
      await updateCartItem(itemId, newQty);
      toast.success('Updated', { icon: '✅' });
    } catch {
      toast.error('Failed');
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (itemId, itemName) => {
    try {
      await removeFromCart(itemId);
      toast.success(`${itemName} removed`, { icon: '🗑️' });
    } catch {
      toast.error('Failed');
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Clear all items from cart?')) return;
    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed');
    }
  };

  if (loading) return <LoadingSpinner text="Loading your cart..." />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="page-container">
        <h1 className="section-title">
          Shopping <span className="text-gradient">Cart</span>
        </h1>
        <EmptyState
          title="Your cart is empty"
          message="Add delicious food from our restaurants!"
          action={() => navigate('/restaurants')}
          actionLabel="Browse Restaurants"
          emoji="🛒"
        />
      </div>
    );
  }

  const subtotal = cart.totalAmount || 0;
  const deliveryFee = 150;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 slide-up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-full p-2 animate-pulse-glow">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
              {cart.totalItems} items in cart
            </span>
          </div>
          <h1 className="section-title mb-0">
            Your <span className="text-gradient">Cart</span>
          </h1>
        </div>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 text-sm font-bold
                     flex items-center gap-2 bg-red-50 hover:bg-red-100
                     px-4 py-2.5 rounded-2xl transition-all duration-300
                     shadow-md hover:shadow-lg"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item, idx) => (
            <div key={item.id} className="card group slide-up hover:scale-[1.01]"
                 style={{animationDelay: `${idx * 100}ms`}}>
              <div className="flex items-center gap-4">
                {/* Item image placeholder */}
                <div className="w-20 h-20 flex-shrink-0 rounded-2xl
                                bg-gradient-to-br from-primary-100 to-orange-200
                                flex items-center justify-center text-4xl shadow-lg">
                  🍽️
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-secondary-900 text-lg mb-1 line-clamp-1">
                    {item.menuItemName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-primary-600 font-black text-xl">
                      Rs. {item.unitPrice.toFixed(2)}
                    </p>
                    <span className="text-secondary-400 text-sm">×{item.quantity}</span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1 bg-gradient-to-r from-gray-50 to-white
                                rounded-2xl p-1.5 border border-gray-200 shadow-md">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    disabled={updating === item.id || item.quantity <= 1}
                    className="p-2.5 rounded-xl bg-white hover:bg-red-50 hover:text-red-600
                               disabled:opacity-40 transition-all shadow-sm"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="font-black w-10 text-center text-lg text-secondary-900">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    disabled={updating === item.id}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600
                               hover:from-primary-600 hover:to-primary-700
                               text-white transition-all shadow-lg shadow-primary-500/40"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-28">
                  <div className="text-xs text-secondary-400 font-bold uppercase mb-1">
                    Subtotal
                  </div>
                  <p className="font-black text-gradient text-xl">
                    Rs. {item.subtotal.toFixed(2)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.id, item.menuItemName)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-2xl
                             transition-all hover:scale-110"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Promo card */}
          <div className="card bg-gradient-to-r from-primary-50 via-orange-50 to-yellow-50
                          border-2 border-primary-200 slide-up">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary-500 to-orange-500
                              p-3 rounded-2xl shadow-lg animate-bounce-subtle">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-black text-secondary-900">Free delivery on orders over Rs. 2000!</p>
                <p className="text-secondary-500 text-sm">
                  {subtotal < 2000
                    ? `Add Rs. ${(2000 - subtotal).toFixed(2)} more to unlock free delivery`
                    : "You've unlocked free delivery! 🎉"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-28 slide-up bg-gradient-to-br from-white to-orange-50/50">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary-500" />
              <h3 className="font-black text-secondary-900 text-xl">Order Summary</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 font-semibold">
                  Subtotal ({cart.totalItems} items)
                </span>
                <span className="font-bold text-secondary-900">Rs. {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-secondary-600 font-semibold flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Delivery Fee
                </span>
                <span className="font-bold text-secondary-900">Rs. {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-secondary-600 font-semibold">Tax (5%)</span>
                <span className="font-bold text-secondary-900">Rs. {tax.toFixed(2)}</span>
              </div>

              <div className="border-t-2 border-dashed border-primary-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-black text-secondary-900 text-lg">Total</span>
                  <span className="text-gradient font-black text-3xl">
                    Rs. {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate('/restaurants')}
              className="btn-secondary w-full mt-3 py-3"
            >
              Continue Shopping
            </button>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-2xl mb-1">🚀</div>
                  <p className="text-xs text-secondary-600 font-bold">Fast Delivery</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="text-xs text-secondary-600 font-bold">Secure</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">✅</div>
                  <p className="text-xs text-secondary-600 font-bold">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;