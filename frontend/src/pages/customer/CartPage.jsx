import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
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
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (itemId, itemName) => {
    try {
      await removeFromCart(itemId);
      toast.success(`${itemName} removed`);
    } catch {
      toast.error('Failed to remove');
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Clear all items from cart?')) return;
    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed to clear cart');
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
        />
      </div>
    );
  }

  const subtotal = cart.totalAmount || 0;
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8 slide-up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
              Your order
            </span>
          </div>
          <h1 className="section-title mb-0">
            Shopping <span className="text-gradient">Cart</span>
          </h1>
        </div>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 text-sm font-bold
                     flex items-center gap-2 bg-red-50 hover:bg-red-100
                     px-4 py-2.5 rounded-xl transition-all duration-300"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item, idx) => (
            <div key={item.id} className="card group slide-up"
                 style={{animationDelay: `${idx * 50}ms`}}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-secondary-900 text-lg mb-1">
                    {item.menuItemName}
                  </h3>
                  <p className="text-primary-600 font-black text-xl">
                    Rs. {item.unitPrice.toFixed(2)}
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-1 border border-gray-200">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    disabled={updating === item.id || item.quantity <= 1}
                    className="p-2.5 rounded-xl bg-white hover:bg-primary-50
                               disabled:opacity-50 transition-all duration-200
                               shadow-sm"
                  >
                    <Minus className="h-4 w-4 text-secondary-700" />
                  </button>

                  <span className="font-black w-10 text-center text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    disabled={updating === item.id}
                    className="p-2.5 rounded-xl bg-primary-500 hover:bg-primary-600
                               text-white transition-all duration-200 shadow-lg
                               shadow-primary-500/30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-28">
                  <div className="text-xs text-secondary-400 font-bold uppercase mb-1">
                    Subtotal
                  </div>
                  <p className="font-black text-secondary-900 text-lg">
                    Rs. {item.subtotal.toFixed(2)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.id, item.menuItemName)}
                  className="p-2.5 text-red-500 hover:bg-red-50
                             rounded-xl transition-all duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-28 slide-up">
            <h3 className="font-black text-secondary-900 text-xl mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-secondary-600">
                <span className="font-semibold">Subtotal ({cart.totalItems} items)</span>
                <span className="font-bold">Rs. {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-secondary-600">
                <span className="font-semibold">Delivery Fee</span>
                <span className="font-bold">Rs. {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 pt-4
                              flex justify-between font-black text-xl">
                <span className="text-secondary-900">Total</span>
                <span className="text-gradient">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full flex items-center
                         justify-center gap-2 text-base py-4"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate('/restaurants')}
              className="btn-secondary w-full mt-3
                         flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;