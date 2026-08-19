import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, ArrowRight, ShoppingBag, Filter, TrendingUp } from 'lucide-react';
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
  const [filter, setFilter] = useState('ALL');

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

  const getStatusConfig = (status) => {
    const map = {
      PENDING: { badge: 'badge-gray', emoji: '⏳', color: 'from-gray-400 to-gray-500', bg: 'bg-gray-50' },
      CONFIRMED: { badge: 'badge-blue', emoji: '✅', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
      PREPARING: { badge: 'badge-orange', emoji: '👨‍🍳', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50' },
      READY_FOR_PICKUP: { badge: 'badge-orange', emoji: '📦', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50' },
      OUT_FOR_DELIVERY: { badge: 'badge-purple', emoji: '🚴', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
      DELIVERED: { badge: 'badge-green', emoji: '🎉', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
      CANCELLED: { badge: 'badge-red', emoji: '❌', color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
    };
    return map[status] || map.PENDING;
  };

  const filters = [
    { value: 'ALL', label: 'All Orders', emoji: '📋' },
    { value: 'PENDING', label: 'Pending', emoji: '⏳' },
    { value: 'PREPARING', label: 'Preparing', emoji: '👨‍🍳' },
    { value: 'DELIVERED', label: 'Delivered', emoji: '🎉' },
    { value: 'CANCELLED', label: 'Cancelled', emoji: '❌' },
  ];

  const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) return <LoadingSpinner text="Loading your orders..." />;
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
          emoji="📦"
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8 slide-up">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-full p-2 animate-pulse-glow">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
            Order History
          </span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="section-title mb-0">
            My <span className="text-gradient">Orders</span>
          </h1>
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md
                          rounded-2xl px-5 py-3 border border-white/60 shadow-md">
            <ShoppingBag className="h-4 w-4 text-primary-500" />
            <span className="font-black text-secondary-900">
              {orders.length} total order{orders.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 slide-up">
        <div className="flex items-center gap-2 flex-shrink-0 bg-white/70
                        backdrop-blur-md rounded-xl px-3 py-2 border border-white/60">
          <Filter className="h-4 w-4 text-secondary-500" />
          <span className="text-secondary-700 font-bold text-sm">Filter:</span>
        </div>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5
                        rounded-2xl text-sm font-black transition-all duration-300
                        ${filter === f.value
                          ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-xl shadow-primary-500/30 scale-105'
                          : 'bg-white text-secondary-700 border border-gray-200 hover:border-primary-300'}`}
          >
            <span className="text-base">{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          title="No orders in this category"
          message="Try selecting a different filter"
          action={() => setFilter('ALL')}
          actionLabel="Show All Orders"
          emoji="🔍"
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, idx) => {
            const config = getStatusConfig(order.status);
            return (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="card-hover slide-up"
                style={{animationDelay: `${idx * 100}ms`}}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-br ${config.color}
                                      rounded-2xl p-4 shadow-xl relative`}>
                        <Package className="h-6 w-6 text-white" />
                        <div className="absolute -top-1 -right-1 text-2xl">
                          {config.emoji}
                        </div>
                      </div>
                      <div>
                        <p className="font-black text-secondary-900 text-xl">
                          Order #{order.id}
                        </p>
                        <p className="text-secondary-500 text-xs font-semibold">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <span className={`${config.badge} text-sm`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Items preview */}
                  <div className={`${config.bg} rounded-2xl p-4 mb-4`}>
                    <p className="text-secondary-700 font-semibold text-sm">
                      <span className="font-black">
                        {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? 's' : ''}:
                      </span>
                      {order.orderItems && order.orderItems.length > 0 && (
                        <span className="ml-2">
                          {order.orderItems.slice(0, 3).map(i => i.menuItemName).join(', ')}
                          {order.orderItems.length > 3 && ` +${order.orderItems.length - 3} more`}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Address */}
                  {order.deliveryAddress && (
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <p className="text-secondary-600 text-sm font-semibold line-clamp-1">
                        {order.deliveryAddress}
                      </p>
                    </div>
                  )}

                  {/* Bottom */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-secondary-400 text-xs font-bold uppercase mb-1">Total</p>
                      <div className="font-black text-gradient text-2xl">
                        Rs. {order.totalAmount.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-orange-500
                                    hover:from-primary-600 hover:to-orange-600
                                    text-white font-black px-5 py-3 rounded-2xl
                                    transition-all shadow-lg shadow-primary-500/30
                                    hover:shadow-xl hover:scale-105">
                      <span className="text-sm">Track Order</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;