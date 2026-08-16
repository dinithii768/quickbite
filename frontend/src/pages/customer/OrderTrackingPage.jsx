import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle, Clock, ChefHat, Bike, Package,
  MapPin, ArrowLeft, FileText
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
    { status: 'PENDING', label: 'Order Placed', icon: FileText, color: 'from-gray-400 to-gray-500' },
    { status: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle, color: 'from-blue-400 to-cyan-500' },
    { status: 'PREPARING', label: 'Preparing', icon: ChefHat, color: 'from-orange-400 to-red-500' },
    { status: 'READY_FOR_PICKUP', label: 'Ready', icon: Package, color: 'from-yellow-400 to-orange-500' },
    { status: 'OUT_FOR_DELIVERY', label: 'On the way', icon: Bike, color: 'from-purple-400 to-pink-500' },
    { status: 'DELIVERED', label: 'Delivered', icon: CheckCircle, color: 'from-green-400 to-emerald-500' },
  ];

  const getCurrentStep = () => {
    if (!order) return -1;
    return orderSteps.findIndex(step => step.status === order.status);
  };

  if (loading) return <LoadingSpinner text="Loading order..." />;
  if (!order) return <div className="page-container text-center py-20">Order not found</div>;

  const currentStep = getCurrentStep();
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 text-secondary-600
                   hover:text-primary-600 mb-6 font-bold
                   bg-white/70 backdrop-blur-md hover:bg-white
                   px-4 py-2.5 rounded-xl border border-white/50
                   shadow-md transition-all duration-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Orders</span>
      </button>

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="card mb-6 slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Order Number
              </p>
              <h1 className="text-3xl font-black text-secondary-900">
                #{order.id}
              </h1>
              <p className="text-secondary-500 text-sm mt-2">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-secondary-400 text-xs font-black uppercase tracking-wider mb-1">
                Total
              </p>
              <p className="text-gradient font-black text-3xl">
                Rs. {order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Tracking */}
        {!isCancelled ? (
          <div className="card mb-6 slide-up">
            <h3 className="font-black text-secondary-900 text-xl mb-8">
              Order Progress
            </h3>

            <div className="space-y-4">
              {orderSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div key={step.status}
                       className="flex items-center gap-4 relative">
                    {/* Connecting line */}
                    {index < orderSteps.length - 1 && (
                      <div className={`absolute left-6 top-14 w-1 h-8
                                       rounded-full transition-all duration-500
                                       ${index < currentStep
                                         ? 'bg-gradient-to-b from-primary-500 to-orange-500'
                                         : 'bg-gray-200'}`}></div>
                    )}

                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl
                                     flex items-center justify-center
                                     transition-all duration-500 relative z-10
                                     ${isCompleted
                                       ? `bg-gradient-to-br ${step.color} shadow-xl scale-110`
                                       : 'bg-gray-100 text-gray-400'}
                                     ${isCurrent ? 'animate-pulse-glow' : ''}`}>
                      <Icon className={`h-6 w-6 ${isCompleted ? 'text-white' : ''}`} />
                    </div>

                    <div className="flex-1">
                      <p className={`font-black text-base
                                     ${isCompleted ? 'text-secondary-900' : 'text-secondary-400'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-primary-600 text-sm font-semibold mt-0.5">
                          In progress...
                        </p>
                      )}
                    </div>

                    {isCompleted && !isCurrent && (
                      <div className="bg-green-100 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card mb-6 bg-red-50 border-2 border-red-200 slide-up">
            <h3 className="font-black text-red-700 text-xl">Order Cancelled</h3>
            <p className="text-red-600 mt-2">This order has been cancelled.</p>
          </div>
        )}

        {/* Delivery Info */}
        {order.deliveryAddress && (
          <div className="card mb-6 slide-up">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-orange-500
                              p-3 rounded-2xl shadow-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-secondary-900 text-lg">
                  Delivery Address
                </h3>
                <p className="text-secondary-500 text-sm">Where we're delivering</p>
              </div>
            </div>
            <p className="text-secondary-700 font-semibold pl-16">
              {order.deliveryAddress}
            </p>
            {order.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100 pl-16">
                <p className="text-secondary-400 text-xs font-bold uppercase mb-1">
                  Special Notes
                </p>
                <p className="text-secondary-700 text-sm">{order.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className="card slide-up">
          <h3 className="font-black text-secondary-900 text-xl mb-6">
            Order Items
          </h3>

          <div className="space-y-3">
            {order.orderItems?.map((item) => (
              <div key={item.id}
                   className="flex items-center justify-between
                              bg-gray-50 rounded-2xl p-4">
                <div className="flex-1">
                  <p className="font-black text-secondary-900">
                    {item.menuItemName}
                  </p>
                  <p className="text-secondary-500 text-sm font-semibold">
                    {item.quantity} × Rs. {item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <p className="font-black text-secondary-900 text-lg">
                  Rs. {item.subtotal.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200
                          flex justify-between items-center
                          bg-gradient-to-r from-primary-50 to-orange-50
                          rounded-2xl p-4">
            <span className="font-black text-secondary-900 text-lg">Total</span>
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