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
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      setLoading(false);
    }
  };

  const orderSteps = [
    { status: 'PENDING', label: 'Order Placed', icon: FileText },
    { status: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
    { status: 'PREPARING', label: 'Preparing', icon: ChefHat },
    { status: 'READY_FOR_PICKUP', label: 'Ready', icon: Package },
    { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Bike },
    { status: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
  ];

  const getCurrentStep = () => {
    if (!order) return -1;
    return orderSteps.findIndex(step => step.status === order.status);
  };

  if (loading) return <LoadingSpinner text="Loading order..." />;

  if (!order) {
    return (
      <div className="page-container text-center py-20">
        <h2 className="text-2xl font-bold">Order not found</h2>
      </div>
    );
  }

  const currentStep = getCurrentStep();
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center space-x-2 text-secondary-600
                   hover:text-primary-500 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Orders</span>
      </button>

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">
                Order #{order.id}
              </h1>
              <p className="text-secondary-400 text-sm mt-1">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary-600 font-bold text-2xl">
                Rs. {order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Tracking */}
        {!isCancelled ? (
          <div className="card mb-6">
            <h3 className="font-bold text-secondary-900 mb-6">
              Order Status
            </h3>

            <div className="space-y-6">
              {orderSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div key={step.status} className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full
                                     flex items-center justify-center
                                     transition-all duration-300
                                     ${isCompleted
                                       ? 'bg-primary-500 text-white'
                                       : 'bg-gray-100 text-gray-400'}`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <p className={`font-semibold
                                     ${isCompleted
                                       ? 'text-secondary-900'
                                       : 'text-secondary-400'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-primary-500 text-sm mt-0.5">
                          Current status
                        </p>
                      )}
                    </div>

                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-primary-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card mb-6 bg-red-50">
            <h3 className="font-bold text-red-700">Order Cancelled</h3>
            <p className="text-red-600 text-sm mt-1">
              This order has been cancelled.
            </p>
          </div>
        )}

        {/* Delivery Info */}
        {order.deliveryAddress && (
          <div className="card mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-5 w-5 text-primary-500" />
              <h3 className="font-bold text-secondary-900">
                Delivery Address
              </h3>
            </div>
            <p className="text-secondary-700">{order.deliveryAddress}</p>
            {order.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-secondary-400 text-xs mb-1">Notes:</p>
                <p className="text-secondary-700 text-sm">{order.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Order Items */}
        <div className="card">
          <h3 className="font-bold text-secondary-900 mb-4">Order Items</h3>

          <div className="space-y-3">
            {order.orderItems?.map((item) => (
              <div key={item.id}
                   className="flex items-center justify-between
                              pb-3 border-b border-gray-100 last:border-0
                              last:pb-0">
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">
                    {item.menuItemName}
                  </p>
                  <p className="text-secondary-400 text-sm">
                    {item.quantity} × Rs. {item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold text-secondary-900">
                  Rs. {item.subtotal.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200
                          flex justify-between items-center">
            <span className="font-bold text-secondary-900">Total</span>
            <span className="font-bold text-primary-600 text-xl">
              Rs. {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTrackingPage;