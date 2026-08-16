import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, fetchCart, removeFromCart, updateCartItem, clearCart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

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
      toast.success(`${itemName} removed from cart`);
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <LoadingSpinner text="Loading your cart..." />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="page-container">
        <h1 className="section-title">Shopping Cart</h1>
        <EmptyState
          title="Your cart is empty"
          message="Add some delicious food from our restaurants!"
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title mb-0">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 text-sm font-medium
                     flex items-center space-x-1"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-900">
                    {item.menuItemName}
                  </h3>
                  <p className="text-primary-600 font-bold mt-1">
                    Rs. {item.unitPrice.toFixed(2)}
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center space-x-3 ml-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    disabled={updating === item.id || item.quantity <= 1}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200
                               disabled:opacity-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="font-semibold w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    disabled={updating === item.id}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200
                               disabled:opacity-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="ml-6 text-right min-w-24">
                  <p className="font-bold text-secondary-900">
                    Rs. {item.subtotal.toFixed(2)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.id, item.menuItemName)}
                  className="ml-4 p-2 text-red-500 hover:bg-red-50
                             rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="font-bold text-secondary-900 text-lg mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-secondary-600">
                <span>Subtotal ({cart.totalItems} items)</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-secondary-600">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-3
                              flex justify-between font-bold text-lg
                              text-secondary-900">
                <span>Total</span>
                <span className="text-primary-600">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-primary w-full flex items-center
                         justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate('/restaurants')}
              className="btn-secondary w-full mt-3
                         flex items-center justify-center space-x-2"
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