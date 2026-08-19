import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package, ArrowRight, PartyPopper, Sparkles } from 'lucide-react';
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
  if (!order) return <div className="page-container text-center py-20">Order not found</div>;

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">

        {/* Success Animation */}
        <div className="text-center mb-10 slide-up">
          {/* Confetti effect */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500
                            rounded-full blur-3xl opacity-50 animate-pulse-glow"></div>

            {/* Ripple effects */}
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping"></div>
            <div className="absolute inset-4 rounded-full bg-green-400 opacity-30 animate-ping" style={{animationDelay: '0.5s'}}></div>

            <div className="relative inline-flex bg-gradient-to-br
                            from-green-400 via-emerald-500 to-green-600 rounded-full p-8
                            shadow-2xl">
              <CheckCircle className="h-24 w-24 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-4 shadow-xl">
            <PartyPopper className="h-4 w-4 text-primary-600 animate-bounce-subtle" />
            <span className="text-primary-700 font-black text-sm uppercase tracking-wider">
              Order Confirmed
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-secondary-900 mb-4">
            Order Placed! 🎉
          </h1>
          <p className="text-secondary-500 text-lg font-semibold">
            Your delicious food is being prepared with love ❤️
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card mb-6 slide-up bg-gradient-to-br from-white to-orange-50/50">
          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-dashed border-primary-200">
            <div>
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Order Number
              </p>
              <p className="font-black text-secondary-900 text-3xl">
                #{order.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Status
              </p>
              <span className="badge-orange text-sm">{order.status}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary-50 to-orange-50
                            rounded-2xl p-4 border border-primary-100">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-primary-500 to-orange-500
                                p-3 rounded-2xl shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-secondary-400 text-xs font-black uppercase mb-1">
                    Delivery Address
                  </p>
                  <p className="text-secondary-900 font-bold text-sm">
                    {order.deliveryAddress || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50
                            rounded-2xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500
                                p-3 rounded-2xl shadow-lg animate-bounce-subtle">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-secondary-400 text-xs font-black uppercase mb-1">
                    Estimated Time
                  </p>
                  <p className="text-secondary-900 font-black text-lg">30-45 min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-secondary-700" />
              <p className="font-black text-secondary-800 uppercase text-sm tracking-wider">
                Order Items ({order.orderItems?.length})
              </p>
            </div>

            <div className="space-y-2">
              {order.orderItems?.map((item, idx) => (
                <div key={item.id}
                     className="flex justify-between items-center
                                bg-gradient-to-r from-gray-50 to-white
                                rounded-2xl p-4 border border-gray-100
                                slide-up"
                     style={{animationDelay: `${idx * 100}ms`}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <span className="font-black text-primary-700">{item.quantity}</span>
                    </div>
                    <span className="text-secondary-900 font-bold">
                      {item.menuItemName}
                    </span>
                  </div>
                  <span className="text-primary-600 font-black text-lg">
                    Rs. {item.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-5
                          flex justify-between items-center shadow-xl">
            <div>
              <p className="text-white/80 text-xs font-black uppercase tracking-wider">
                Total Paid
              </p>
              <p className="text-white font-black text-3xl">
                Rs. {order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="text-6xl animate-bounce-subtle">💰</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 slide-up">
          <button
            onClick={() => navigate(`/orders/${order.id}`)}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 text-base"
          >
            <Sparkles className="h-5 w-5" />
            <span>Track Order</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => navigate('/restaurants')}
            className="btn-secondary flex-1 py-4"
          >
            Order More Food
          </button>
        </div>

        {/* Support */}
        <div className="text-center mt-8 slide-up">
          <p className="text-secondary-500 text-sm font-semibold">
            Need help? Contact us at
            <a href="mailto:support@quickbite.com" className="text-primary-600 font-black ml-1">
              support@quickbite.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;