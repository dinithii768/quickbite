import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart, fetchCart, clearCart, customerId } = useCart();
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

      // Checkout the order (change status to CONFIRMED)
      await orderService.checkoutOrder(orderId);

      toast.success('Order placed successfully!');

      // Reset cart context
      await fetchCart();

      // Navigate to order confirmation
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Order failed:', error);
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
          message="Add items to cart before checkout"
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
        className="flex items-center space-x-2 text-secondary-600
                   hover:text-primary-500 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Cart</span>
      </button>

      <h1 className="section-title">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Delivery Address */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold text-secondary-900">
                Delivery Address
              </h3>
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
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold text-secondary-900">
                Special Instructions (Optional)
              </h3>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests? (e.g. extra spicy, no onions...)"
              rows="2"
              className="input-field resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary-500" />
              <h3 className="font-semibold text-secondary-900">
                Payment Method
              </h3>
            </div>
            <div className="bg-orange-50 border border-orange-200
                            rounded-xl p-4">
              <p className="text-orange-800 font-medium">
                💵 Cash on Delivery
              </p>
              <p className="text-orange-600 text-sm mt-1">
                Pay when your order arrives
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="card">
            <h3 className="font-semibold text-secondary-900 mb-3">
              Customer Information
            </h3>
            <div className="space-y-2 text-sm text-secondary-600">
              <p>
                <span className="font-medium">Name:</span>{' '}
                {user?.firstName} {user?.lastName}
              </p>
              <p>
                <span className="font-medium">Username:</span> {user?.username}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user?.email}
              </p>
            </div>
          </div>

        </div>

        {/* Right — Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="font-bold text-secondary-900 text-lg mb-4">
              Order Summary
            </h3>

            {/* Items list */}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="text-secondary-900 font-medium">
                      {item.menuItemName}
                    </p>
                    <p className="text-secondary-400 text-xs">
                      Qty: {item.quantity} × Rs. {item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-secondary-900 font-medium">
                    Rs. {item.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-secondary-600 text-sm">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-600 text-sm">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg
                              text-secondary-900 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="text-primary-600">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || !deliveryAddress.trim()}
              className="btn-primary w-full mt-4"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;