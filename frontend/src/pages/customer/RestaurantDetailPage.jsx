import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Bike, MapPin, Phone, ArrowLeft, Search, Sparkles
} from 'lucide-react';
import {
  restaurantService, menuItemService, categoryService
} from '../../services/restaurantService';
import MenuItemCard from '../../components/restaurant/MenuItemCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchData(); }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [rRes, mRes, cRes] = await Promise.all([
        restaurantService.getRestaurantById(id),
        menuItemService.getMenuItemsByRestaurant(id),
        categoryService.getCategoriesByRestaurant(id),
      ]);
      setRestaurant(rRes.data);
      setMenuItems(mRes.data || []);
      setCategories(cRes.data || []);
    } catch {
      setError('Failed to load restaurant.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || item.categoryId === activeCategory;
    return matchSearch && matchCategory;
  });

  if (loading) return <LoadingSpinner text="Loading restaurant..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;
  if (!restaurant) return null;

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden
                      bg-gradient-to-br from-primary-100 to-orange-200">
        {restaurant.imageUrl && (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover scale-in"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 glass rounded-2xl p-3
                     shadow-xl hover:scale-110 transition-transform duration-300"
        >
          <ArrowLeft className="h-5 w-5 text-secondary-800" />
        </button>

        {/* Restaurant name on image */}
        <div className="absolute bottom-8 left-8 right-8 text-white slide-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-secondary-800 font-black text-xs uppercase tracking-wider">
              {restaurant.isActive ? 'Open Now' : 'Closed'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-2">
            {restaurant.name}
          </h1>
          <p className="text-white/90 text-lg font-semibold">
            {restaurant.cuisineType}
          </p>
        </div>
      </div>

      <div className="page-container -mt-16 relative z-10">

        {/* Restaurant Info Card */}
        <div className="card mb-8 slide-up bg-gradient-to-br from-white to-orange-50/30">
          {restaurant.description && (
            <p className="text-secondary-600 mb-6 leading-relaxed text-lg">
              {restaurant.description}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {restaurant.rating > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                    <Star className="h-5 w-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xs text-secondary-400 font-black uppercase">Rating</div>
                    <div className="text-xl font-black text-secondary-900">
                      {restaurant.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-primary-50 to-orange-50 rounded-2xl p-4 border border-primary-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary-500 to-orange-500 p-3 rounded-2xl shadow-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-secondary-400 font-black uppercase">Time</div>
                  <div className="text-xl font-black text-secondary-900">
                    {restaurant.deliveryTimeMinutes} min
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
                  <Bike className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-secondary-400 font-black uppercase">Delivery</div>
                  <div className="text-xl font-black text-secondary-900">
                    {restaurant.deliveryFee === 0 ? 'Free' : `Rs.${restaurant.deliveryFee}`}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-secondary-400 font-black uppercase">Location</div>
                  <div className="text-sm font-black text-secondary-900 truncate">
                    {restaurant.address.split(',')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary-500" />
            <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
              Delicious Menu
            </span>
          </div>
          <h2 className="section-title mb-6">
            Menu <span className="text-gradient">Items</span>
          </h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-14"
            />
          </div>

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('All')}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-black
                            transition-all duration-300
                            ${activeCategory === 'All'
                              ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-xl shadow-primary-500/30 scale-105'
                              : 'bg-white text-secondary-700 border border-gray-200 hover:border-primary-300 hover:shadow-md'}`}
              >
                🍽️ All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-black
                              transition-all duration-300
                              ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-xl shadow-primary-500/30 scale-105'
                                : 'bg-white text-secondary-700 border border-gray-200 hover:border-primary-300 hover:shadow-md'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Menu Items */}
          {filteredItems.length === 0 ? (
            <EmptyState
              title="No items found"
              message="Try different keywords"
              action={() => setSearch('')}
              actionLabel="Clear search"
              emoji="🔍"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item, idx) => (
                <div key={item.id} className="slide-up"
                     style={{animationDelay: `${idx * 50}ms`}}>
                  <MenuItemCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RestaurantDetailPage;