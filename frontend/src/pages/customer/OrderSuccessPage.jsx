import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { orderService } from '../../services/orderService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading order details..." />;

  if (!order) {
    return (
      <div className="page-container text-center py-20">
        <h2 className="text-2xl font-bold text-secondary-900">
          Order not found
        </h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">

        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-green-100 rounded-full p-4 mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-secondary-500">
            Your delicious food is being prepared
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4 pb-4
                          border-b border-gray-100">
            <div>
              <p className="text-secondary-400 text-sm">Order ID</p>
              <p className="font-bold text-secondary-900">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-secondary-400 text-sm">Status</p>
              <span className="badge-orange mt-1">{order.status}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-secondary-400 text-xs">Delivery Address</p>
                <p className="text-secondary-900 text-sm">
                  {order.deliveryAddress || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-secondary-400 text-xs">Estimated Time</p>
                <p className="text-secondary-900 text-sm">30-45 minutes</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Package className="h-4 w-4 text-secondary-500" />
              <p className="font-medium text-secondary-700 text-sm">
                Order Items
              </p>
            </div>

            <div className="space-y-2">
              {order.orderItems?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-secondary-700">
                    {item.quantity}× {item.menuItemName}
                  </span>
                  <span className="text-secondary-900 font-medium">
                    Rs. {item.subtotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 pt-4
                          flex justify-between items-center">
            <span className="font-bold text-secondary-900">Total Paid</span>
            <span className="font-bold text-primary-600 text-xl">
              Rs. {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="btn-primary flex-1 flex items-center
                       justify-center space-x-2"
          >
            <span>Track Order</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => navigate('/restaurants')}
            className="btn-secondary flex-1"
          >
            Order More
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;