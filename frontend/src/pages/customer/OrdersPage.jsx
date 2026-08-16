import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, MapPin, ArrowRight } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.username) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrdersByCustomer(user.username);
      setOrders(response.data || []);
    } catch (err) {
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: 'badge-gray',
      CONFIRMED: 'badge-blue',
      PREPARING: 'badge-orange',
      READY_FOR_PICKUP: 'badge-orange',
      OUT_FOR_DELIVERY: 'badge-blue',
      DELIVERED: 'badge-green',
      CANCELLED: 'badge-red',
    };
    return statusMap[status] || 'badge-gray';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <LoadingSpinner text="Loading your orders..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  if (orders.length === 0) {
    return (
      <div className="page-container">
        <h1 className="section-title">My Orders</h1>
        <EmptyState
          title="No orders yet"
          message="Your order history will appear here"
          action={() => navigate('/restaurants')}
          actionLabel="Browse Restaurants"
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title mb-0">My Orders</h1>
        <p className="text-secondary-400 text-sm">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="card-hover"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <div className="flex flex-col md:flex-row md:items-center
                            md:justify-between mb-3">
              <div className="flex items-center space-x-3 mb-2 md:mb-0">
                <div className="bg-primary-100 rounded-xl p-2">
                  <Package className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-secondary-900">
                    Order #{order.id}
                  </p>
                  <p className="text-secondary-400 text-xs">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              <span className={getStatusBadge(order.status)}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Items preview */}
            <div className="mb-3">
              <p className="text-secondary-500 text-sm">
                {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? 's' : ''}
                {order.orderItems && order.orderItems.length > 0 && (
                  <span className="ml-2">
                    • {order.orderItems.slice(0, 2).map(i => i.menuItemName).join(', ')}
                    {order.orderItems.length > 2 && ` +${order.orderItems.length - 2} more`}
                  </span>
                )}
              </p>
            </div>

            {/* Address */}
            {order.deliveryAddress && (
              <div className="flex items-start space-x-2 mb-3">
                <MapPin className="h-4 w-4 text-secondary-400 mt-0.5" />
                <p className="text-secondary-500 text-sm line-clamp-1">
                  {order.deliveryAddress}
                </p>
              </div>
            )}

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-3
                            border-t border-gray-100">
              <div className="font-bold text-primary-600 text-lg">
                Rs. {order.totalAmount.toFixed(2)}
              </div>
              <div className="flex items-center space-x-1
                              text-primary-500 text-sm font-medium">
                <span>View Details</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;