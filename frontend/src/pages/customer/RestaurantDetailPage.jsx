import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Bike, MapPin, Phone, ArrowLeft, Search
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
      <div className="relative h-80 overflow-hidden
                      bg-gradient-to-br from-primary-100 to-orange-200">
        {restaurant.imageUrl && (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 glass rounded-2xl p-3
                     shadow-xl hover:scale-110 transition-transform duration-300"
        >
          <ArrowLeft className="h-5 w-5 text-secondary-800" />
        </button>
      </div>

      <div className="page-container -mt-32 relative z-10">

        {/* Restaurant Info Card */}
        <div className="card mb-8 slide-up">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-black text-secondary-900">
                  {restaurant.name}
                </h1>
                {restaurant.isActive && (
                  <span className="badge-green">● Open Now</span>
                )}
              </div>

              <span className="inline-block text-sm font-black px-3 py-1
                               rounded-full bg-gradient-to-r from-primary-100 to-orange-100
                               text-primary-700 border border-primary-200 mb-4">
                {restaurant.cuisineType}
              </span>

              {restaurant.description && (
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  {restaurant.description}
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {restaurant.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500
                                    p-2 rounded-xl shadow-md">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs text-secondary-400 font-bold">Rating</div>
                      <div className="text-sm font-black text-secondary-900">
                        {restaurant.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-primary-500 to-orange-500
                                  p-2 rounded-xl shadow-md">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-secondary-400 font-bold">Time</div>
                    <div className="text-sm font-black text-secondary-900">
                      {restaurant.deliveryTimeMinutes} min
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600
                                  p-2 rounded-xl shadow-md">
                    <Bike className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-secondary-400 font-bold">Delivery</div>
                    <div className="text-sm font-black text-secondary-900">
                      {restaurant.deliveryFee === 0 ? 'Free' : `Rs. ${restaurant.deliveryFee}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500
                                  p-2 rounded-xl shadow-md">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-secondary-400 font-bold">Location</div>
                    <div className="text-sm font-black text-secondary-900 truncate">
                      {restaurant.address.split(',')[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <h2 className="section-title mb-6">
            Menu <span className="text-gradient">Items</span>
          </h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2
                               h-5 w-5 text-secondary-400" />
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
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('All')}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm
                            font-black transition-all duration-300
                            ${activeCategory === 'All'
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                              : 'bg-white text-secondary-700 border border-gray-200 hover:border-primary-300'}`}
              >
                All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm
                              font-black transition-all duration-300
                              ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                                : 'bg-white text-secondary-700 border border-gray-200 hover:border-primary-300'}`}
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