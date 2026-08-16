import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
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

  useEffect(() => { if (user?.username) fetchOrders(); }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrdersByCustomer(user.username);
      setOrders(response.data || []);
    } catch {
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      PENDING: 'badge-gray',
      CONFIRMED: 'badge-blue',
      PREPARING: 'badge-orange',
      READY_FOR_PICKUP: 'badge-orange',
      OUT_FOR_DELIVERY: 'badge-blue',
      DELIVERED: 'badge-green',
      CANCELLED: 'badge-red',
    };
    return map[status] || 'badge-gray';
  };

  const getStatusEmoji = (status) => {
    const map = {
      PENDING: '⏳',
      CONFIRMED: '✅',
      PREPARING: '👨‍🍳',
      READY_FOR_PICKUP: '📦',
      OUT_FOR_DELIVERY: '🚴',
      DELIVERED: '🎉',
      CANCELLED: '❌',
    };
    return map[status] || '📋';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) return <LoadingSpinner text="Loading orders..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  if (orders.length === 0) {
    return (
      <div className="page-container">
        <h1 className="section-title">
          My <span className="text-gradient">Orders</span>
        </h1>
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
      <div className="mb-8 slide-up">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="h-6 w-6 text-primary-500" />
          <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
            Order History
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="section-title mb-0">
            My <span className="text-gradient">Orders</span>
          </h1>
          <p className="text-secondary-500 text-sm font-bold">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order, idx) => (
          <div
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="card-hover slide-up"
            style={{animationDelay: `${idx * 50}ms`}}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center
                              md:justify-between mb-4 gap-3">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-primary-500 to-orange-500
                                  rounded-2xl p-3 shadow-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-secondary-900 text-lg">
                      Order #{order.id}
                    </p>
                    <p className="text-secondary-400 text-xs font-semibold">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <span className={`${getStatusBadge(order.status)} text-sm`}>
                  <span className="mr-1">{getStatusEmoji(order.status)}</span>
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Items preview */}
              <div className="mb-4 pl-16">
                <p className="text-secondary-600 text-sm font-semibold">
                  {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? 's' : ''}
                  {order.orderItems && order.orderItems.length > 0 && (
                    <span className="ml-2 text-secondary-500">
                      • {order.orderItems.slice(0, 2).map(i => i.menuItemName).join(', ')}
                      {order.orderItems.length > 2 && ` +${order.orderItems.length - 2} more`}
                    </span>
                  )}
                </p>
              </div>

              {order.deliveryAddress && (
                <div className="flex items-start gap-2 mb-4 pl-16">
                  <MapPin className="h-4 w-4 text-secondary-400 mt-0.5 flex-shrink-0" />
                  <p className="text-secondary-500 text-sm line-clamp-1">
                    {order.deliveryAddress}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4
                              border-t border-gray-100">
                <div>
                  <p className="text-secondary-400 text-xs font-bold uppercase mb-1">
                    Total
                  </p>
                  <div className="font-black text-gradient text-2xl">
                    Rs. {order.totalAmount.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary-600
                                font-black bg-primary-50 hover:bg-primary-100
                                px-4 py-2.5 rounded-xl transition-all
                                shadow-md">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;