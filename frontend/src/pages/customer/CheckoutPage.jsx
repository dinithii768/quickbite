import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, CreditCard, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
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
      toast.success('Order placed successfully!');
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
        />
      </div>
    );
  }

  const subtotal = cart.totalAmount || 0;
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-secondary-600
                   hover:text-primary-600 mb-6 font-bold
                   bg-white/70 backdrop-blur-md hover:bg-white
                   px-4 py-2.5 rounded-xl border border-white/50
                   shadow-md transition-all duration-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Cart</span>
      </button>

      <div className="mb-8 slide-up">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-6 w-6 text-primary-500" />
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
          <div className="card slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-orange-500
                              p-3 rounded-2xl shadow-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-lg">
                  Delivery Address
                </h3>
                <p className="text-secondary-500 text-sm">
                  Where should we deliver?
                </p>
              </div>
            </div>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your complete delivery address..."
              rows="3"
              className="input-field resize-none"
              required
            />
          </div>

          {/* Order Notes */}
          <div className="card slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500
                              p-3 rounded-2xl shadow-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-lg">
                  Special Instructions
                </h3>
                <p className="text-secondary-500 text-sm">
                  Any special requests? (Optional)
                </p>
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Extra spicy, no onions, ring doorbell..."
              rows="2"
              className="input-field resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="card slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600
                              p-3 rounded-2xl shadow-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-lg">
                  Payment Method
                </h3>
                <p className="text-secondary-500 text-sm">
                  Choose how to pay
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50
                            border-2 border-orange-200 rounded-2xl p-5
                            flex items-center gap-4">
              <div className="text-4xl">💵</div>
              <div className="flex-1">
                <p className="text-orange-900 font-black text-base">
                  Cash on Delivery
                </p>
                <p className="text-orange-600 text-sm">
                  Pay when your order arrives
                </p>
              </div>
              <div className="badge-green">Selected</div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="card slide-up">
            <h3 className="font-black text-secondary-900 text-lg mb-4">
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-secondary-400 font-bold text-xs uppercase mb-1">Name</p>
                <p className="text-secondary-900 font-bold">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <p className="text-secondary-400 font-bold text-xs uppercase mb-1">Username</p>
                <p className="text-secondary-900 font-bold">{user?.username}</p>
              </div>
              <div className="col-span-2">
                <p className="text-secondary-400 font-bold text-xs uppercase mb-1">Email</p>
                <p className="text-secondary-900 font-bold">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-28 slide-up">
            <h3 className="font-black text-secondary-900 text-xl mb-6">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2
                                              pb-3 border-b border-gray-100">
                  <div className="flex-1 min-w-0">
                    <p className="text-secondary-900 font-bold text-sm
                                  line-clamp-1">
                      {item.menuItemName}
                    </p>
                    <p className="text-secondary-400 text-xs">
                      {item.quantity} × Rs. {item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-secondary-900 font-black text-sm">
                    Rs. {item.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-secondary-600 text-sm">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-600 text-sm">
                <span className="font-semibold">Delivery Fee</span>
                <span className="font-bold">Rs. {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-xl
                              border-t-2 border-dashed border-gray-200 pt-4">
                <span className="text-secondary-900">Total</span>
                <span className="text-gradient">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || !deliveryAddress.trim()}
              className="btn-primary w-full mt-6 py-4 text-base"
            >
              {placing ? 'Placing Order...' : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Place Order</span>
                </span>
              )}
            </button>

            <p className="text-secondary-400 text-xs text-center mt-4
                          flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Secure & Encrypted Payment
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;