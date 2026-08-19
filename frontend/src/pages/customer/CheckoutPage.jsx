import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, CreditCard, ArrowLeft, Sparkles, ShieldCheck, Zap, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart, fetchCart, customerId } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [placing, setPlacing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchCart();
      setLoading(false);
    };
    load();
  }, []);

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }

    try {
      setPlacing(true);
      const orderData = {
        customerId: customerId,
        restaurantId: cart.restaurantId,
        cartId: cart.id,
        deliveryAddress: deliveryAddress,
        notes: notes || '',
      };
      const response = await orderService.createOrder(orderData);
      const orderId = response.data.id;
      await orderService.checkoutOrder(orderId);
      toast.success('Order placed successfully!', { icon: '🎉' });
      await fetchCart();
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading checkout..." />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="page-container">
        <EmptyState
          title="Cart is empty"
          message="Add items before checkout"
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
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-secondary-600 hover:text-primary-600
                   mb-6 font-bold bg-white/70 backdrop-blur-md hover:bg-white
                   px-5 py-3 rounded-2xl border border-white/60
                   shadow-md hover:shadow-xl transition-all duration-300 slide-up"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Cart</span>
      </button>

      <div className="mb-8 slide-up">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-r from-primary-500 to-orange-500
                          rounded-full p-2 animate-pulse-glow">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
            Secure Checkout
          </span>
        </div>
        <h1 className="section-title">
          Complete your <span className="text-gradient">order</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Delivery Address */}
          <div className="card slide-up hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <div className="bg-gradient-to-br from-primary-500 to-orange-500
                              p-4 rounded-2xl shadow-xl animate-bounce-subtle">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-xl">
                  Delivery Address
                </h3>
                <p className="text-secondary-500 text-sm font-semibold">
                  Where should we deliver? 📍
                </p>
              </div>
            </div>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your complete delivery address..."
              rows="4"
              className="input-field resize-none"
              required
            />
          </div>

          {/* Order Notes */}
          <div className="card slide-up hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500
                              p-4 rounded-2xl shadow-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-xl">
                  Special Instructions
                </h3>
                <p className="text-secondary-500 text-sm font-semibold">
                  Any special requests? (Optional) 💬
                </p>
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Extra spicy, no onions, ring doorbell twice..."
              rows="3"
              className="input-field resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="card slide-up hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600
                              p-4 rounded-2xl shadow-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-xl">
                  Payment Method
                </h3>
                <p className="text-secondary-500 text-sm font-semibold">
                  Choose payment option 💳
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50
                            border-2 border-orange-300 rounded-2xl p-5
                            flex items-center gap-4 shadow-lg">
              <div className="text-5xl animate-bounce-subtle">💵</div>
              <div className="flex-1">
                <p className="text-orange-900 font-black text-lg">
                  Cash on Delivery
                </p>
                <p className="text-orange-700 text-sm font-semibold">
                  Pay when your order arrives
                </p>
              </div>
              <div className="badge-green shadow-lg">✓ Selected</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="card slide-up hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-4 mb-5">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500
                              p-4 rounded-2xl shadow-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-xl">
                  Customer Information
                </h3>
                <p className="text-secondary-500 text-sm font-semibold">
                  Your account details
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-secondary-400 font-black text-xs uppercase mb-1">Name</p>
                <p className="text-secondary-900 font-black">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-secondary-400 font-black text-xs uppercase mb-1">Username</p>
                <p className="text-secondary-900 font-black">{user?.username}</p>
              </div>
              <div className="col-span-2 bg-gray-50 rounded-2xl p-4">
                <p className="text-secondary-400 font-black text-xs uppercase mb-1">Email</p>
                <p className="text-secondary-900 font-black">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-28 slide-up bg-gradient-to-br from-white to-orange-50/50">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary-500" />
              <h3 className="font-black text-secondary-900 text-xl">Order Summary</h3>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-2">
              {cart.items.map((item, idx) => (
                <div key={item.id}
                     className="flex justify-between gap-2 pb-3 border-b border-gray-100 slide-up"
                     style={{animationDelay: `${idx * 50}ms`}}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary-100
                                    flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black text-primary-700">
                        {item.quantity}×
                      </span>
                    </div>
                    <p className="text-secondary-900 font-bold text-sm line-clamp-1">
                      {item.menuItemName}
                    </p>
                  </div>
                  <p className="text-secondary-900 font-black text-sm">
                    Rs. {item.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-secondary-600">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-600">
                <span className="font-semibold flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Delivery Fee
                </span>
                <span className="font-bold">Rs. {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-600">
                <span className="font-semibold">Tax (5%)</span>
                <span className="font-bold">Rs. {tax.toFixed(2)}</span>
              </div>

              <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-4 shadow-xl">
                <div className="flex justify-between items-center text-white">
                  <span className="font-black text-lg">Total</span>
                  <span className="font-black text-3xl">Rs. {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || !deliveryAddress.trim()}
              className="btn-primary w-full mt-6 py-4 text-base"
            >
              {placing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Placing Order...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Place Order Now</span>
                </span>
              )}
            </button>

            <p className="text-secondary-400 text-xs text-center mt-4
                          flex items-center justify-center gap-1 font-semibold">
              <ShieldCheck className="h-3 w-3" />
              256-bit SSL Secure Payment
            </p>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl mb-1">🔒</div>
                <p className="text-xs text-secondary-600 font-bold">Secure</p>
              </div>
              <div>
                <div className="text-2xl mb-1">✅</div>
                <p className="text-xs text-secondary-600 font-bold">Verified</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🚀</div>
                <p className="text-xs text-secondary-600 font-bold">Fast</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;