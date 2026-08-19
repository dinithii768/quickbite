import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle, Clock, ChefHat, Bike, Package,
  MapPin, ArrowLeft, FileText, Sparkles, Phone
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrderTrackingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const orderSteps = [
    { status: 'PENDING', label: 'Order Placed', desc: 'We received your order', icon: FileText, color: 'from-gray-400 to-gray-500', emoji: '📝' },
    { status: 'CONFIRMED', label: 'Confirmed', desc: 'Restaurant confirmed', icon: CheckCircle, color: 'from-blue-500 to-cyan-500', emoji: '✅' },
    { status: 'PREPARING', label: 'Preparing', desc: 'Chef is cooking', icon: ChefHat, color: 'from-orange-500 to-red-500', emoji: '👨‍🍳' },
    { status: 'READY_FOR_PICKUP', label: 'Ready', desc: 'Ready for pickup', icon: Package, color: 'from-yellow-500 to-orange-500', emoji: '📦' },
    { status: 'OUT_FOR_DELIVERY', label: 'On the Way', desc: 'Driver is coming', icon: Bike, color: 'from-purple-500 to-pink-500', emoji: '🚴' },
    { status: 'DELIVERED', label: 'Delivered', desc: 'Enjoy your meal!', icon: CheckCircle, color: 'from-green-500 to-emerald-500', emoji: '🎉' },
  ];

  const getCurrentStep = () => {
    if (!order) return -1;
    return orderSteps.findIndex(step => step.status === order.status);
  };

  if (loading) return <LoadingSpinner text="Loading order details..." />;
  if (!order) return <div className="page-container text-center py-20">Order not found</div>;

  const currentStep = getCurrentStep();
  const isCancelled = order.status === 'CANCELLED';
  const progressPercent = ((currentStep + 1) / orderSteps.length) * 100;

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 text-secondary-600 hover:text-primary-600
                   mb-6 font-bold bg-white/70 backdrop-blur-md hover:bg-white
                   px-5 py-3 rounded-2xl border border-white/60
                   shadow-md hover:shadow-xl transition-all duration-300 slide-up"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Orders</span>
      </button>

      <div className="max-w-4xl mx-auto">

        {/* Header Card */}
        <div className="card mb-6 slide-up bg-gradient-to-br from-white to-orange-50/50">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary-500" />
                <span className="text-primary-600 font-black text-xs uppercase tracking-wider">
                  Order Details
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-secondary-900">
                Order #{order.id}
              </h1>
              <p className="text-secondary-500 text-sm mt-2 font-semibold">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Total Amount
              </p>
              <p className="text-gradient font-black text-4xl">
                Rs. {order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        {!isCancelled ? (
          <div className="card mb-6 slide-up">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-secondary-900 text-2xl">
                Order Progress
              </h3>
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-secondary-700">LIVE TRACKING</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-xs font-black text-secondary-500">
                <span>PROGRESS</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 via-orange-500 to-red-500
                             rounded-full transition-all duration-1000"
                  style={{width: `${progressPercent}%`}}
                ></div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {orderSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div key={step.status} className="flex items-center gap-4 relative">
                    {index < orderSteps.length - 1 && (
                      <div className={`absolute left-8 top-16 w-1 h-10 rounded-full
                                       transition-all duration-500
                                       ${index < currentStep
                                         ? 'bg-gradient-to-b from-primary-500 to-orange-500'
                                         : 'bg-gray-200'}`}></div>
                    )}

                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl
                                     flex items-center justify-center relative z-10
                                     transition-all duration-500
                                     ${isCompleted
                                       ? `bg-gradient-to-br ${step.color} shadow-2xl scale-110`
                                       : 'bg-gray-100'}
                                     ${isCurrent ? 'animate-pulse-glow' : ''}`}>
                      {isCompleted ? (
                        <div className="text-3xl">{step.emoji}</div>
                      ) : (
                        <Icon className="h-7 w-7 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className={`font-black text-lg
                                     ${isCompleted ? 'text-secondary-900' : 'text-secondary-400'}`}>
                        {step.label}
                      </p>
                      <p className={`text-sm font-semibold
                                     ${isCompleted ? 'text-secondary-600' : 'text-secondary-400'}`}>
                        {step.desc}
                      </p>
                      {isCurrent && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
                          <p className="text-primary-600 text-xs font-black uppercase tracking-wider">
                            Current Status
                          </p>
                        </div>
                      )}
                    </div>

                    {isCompleted && !isCurrent && (
                      <div className="bg-green-100 rounded-full p-2 shadow-md">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Estimated time */}
            {currentStep < orderSteps.length - 1 && (
              <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
                <div className="glass rounded-2xl p-5 flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500
                                  p-3 rounded-2xl shadow-lg animate-bounce-subtle">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-secondary-400 text-xs font-black uppercase tracking-wider">
                      Estimated Delivery
                    </p>
                    <p className="text-secondary-900 font-black text-xl">30-45 minutes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card mb-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 slide-up">
            <div className="text-center py-8">
              <div className="inline-flex bg-gradient-to-br from-red-500 to-red-600
                              rounded-full p-5 mb-4 shadow-2xl">
                <span className="text-5xl">❌</span>
              </div>
              <h3 className="font-black text-red-700 text-2xl mb-2">Order Cancelled</h3>
              <p className="text-red-600">This order has been cancelled.</p>
            </div>
          </div>
        )}

        {/* Delivery Info */}
        {order.deliveryAddress && (
          <div className="card mb-6 slide-up">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-orange-500
                              p-4 rounded-2xl shadow-lg animate-bounce-subtle">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-secondary-900 text-xl mb-1">
                  Delivery Address
                </h3>
                <p className="text-secondary-500 text-sm font-semibold">Where we're delivering to</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-orange-50
                            rounded-2xl p-5 border-2 border-primary-100">
              <p className="text-secondary-800 font-bold text-base leading-relaxed">
                📍 {order.deliveryAddress}
              </p>
            </div>

            {order.notes && (
              <div className="mt-4 bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-700 text-xs font-black uppercase tracking-wider mb-1">
                      Special Notes
                    </p>
                    <p className="text-blue-900 text-sm font-semibold">{order.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Items */}
        <div className="card slide-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-secondary-900 text-xl">
              Order Items ({order.orderItems?.length || 0})
            </h3>
          </div>

          <div className="space-y-3">
            {order.orderItems?.map((item, idx) => (
              <div key={item.id}
                   className="flex items-center justify-between
                              bg-gradient-to-r from-gray-50 to-white
                              rounded-2xl p-4 border border-gray-200
                              hover:shadow-lg transition-all slide-up"
                   style={{animationDelay: `${idx * 100}ms`}}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-orange-200
                                  flex items-center justify-center text-2xl shadow-md">
                    🍽️
                  </div>
                  <div>
                    <p className="font-black text-secondary-900 text-base">
                      {item.menuItemName}
                    </p>
                    <p className="text-secondary-500 text-sm font-semibold">
                      Qty: {item.quantity} × Rs. {item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="font-black text-primary-600 text-lg">
                  Rs. {item.subtotal.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-primary-200
                          flex justify-between items-center
                          bg-gradient-to-r from-primary-50 to-orange-50
                          rounded-2xl p-5">
            <span className="font-black text-secondary-900 text-xl">Total Paid</span>
            <span className="font-black text-gradient text-3xl">
              Rs. {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTrackingPage;