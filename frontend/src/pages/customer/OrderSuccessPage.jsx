import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package, ArrowRight, PartyPopper } from 'lucide-react';
import { orderService } from '../../services/orderService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrder(); }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading order..." />;

  if (!order) {
    return (
      <div className="page-container text-center py-20">
        <h2 className="text-2xl font-bold">Order not found</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">

        {/* Success Icon */}
        <div className="text-center mb-10 slide-up">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-400 rounded-full
                            blur-2xl opacity-50 animate-pulse-glow"></div>
            <div className="relative inline-flex bg-gradient-to-br
                            from-green-400 to-emerald-600 rounded-full p-6
                            shadow-2xl animate-bounce-subtle">
              <CheckCircle className="h-20 w-20 text-white" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 glass
                          rounded-full px-4 py-2 mb-4">
            <PartyPopper className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-black text-sm uppercase tracking-wider">
              Order Confirmed
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-secondary-900 mb-3">
            Order Placed! 🎉
          </h1>
          <p className="text-secondary-500 text-lg">
            Your delicious food is being prepared
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card mb-6 slide-up">
          <div className="flex items-center justify-between mb-6 pb-6
                          border-b-2 border-dashed border-gray-200">
            <div>
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Order ID
              </p>
              <p className="font-black text-secondary-900 text-2xl">
                #{order.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Status
              </p>
              <span className="badge-orange">{order.status}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-primary-500 to-orange-500
                              p-3 rounded-2xl shadow-lg flex-shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-secondary-400 text-xs font-black uppercase mb-1">
                  Delivery Address
                </p>
                <p className="text-secondary-900 font-bold">
                  {order.deliveryAddress || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500
                              p-3 rounded-2xl shadow-lg flex-shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-secondary-400 text-xs font-black uppercase mb-1">
                  Estimated Time
                </p>
                <p className="text-secondary-900 font-bold">30-45 minutes</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-secondary-600" />
              <p className="font-black text-secondary-800 uppercase text-sm tracking-wider">
                Order Items
              </p>
            </div>

            <div className="space-y-3">
              {order.orderItems?.map((item) => (
                <div key={item.id} className="flex justify-between
                                              bg-gray-50 rounded-xl p-3">
                  <span className="text-secondary-700 font-bold">
                    {item.quantity}× {item.menuItemName}
                  </span>
                  <span className="text-secondary-900 font-black">
                    Rs. {item.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-primary-50 to-orange-50
                          rounded-2xl p-4 border-2 border-primary-200
                          flex justify-between items-center">
            <span className="font-black text-secondary-900 text-lg">
              Total Paid
            </span>
            <span className="font-black text-gradient text-3xl">
              Rs. {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 slide-up">
          <button
            onClick={() => navigate('/orders')}
            className="btn-primary flex-1 flex items-center
                       justify-center gap-2 py-4"
          >
            <span>Track Order</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => navigate('/restaurants')}
            className="btn-secondary flex-1 py-4"
          >
            Order More
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;