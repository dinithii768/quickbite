import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Bike, MapPin, Phone, ArrowLeft, Search
} from 'lucide-react';
import {
  restaurantService,
  menuItemService,
  categoryService
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

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [restaurantRes, menuRes, categoryRes] = await Promise.all([
        restaurantService.getRestaurantById(id),
        menuItemService.getMenuItemsByRestaurant(id),
        categoryService.getCategoriesByRestaurant(id),
      ]);
      setRestaurant(restaurantRes.data);
      setMenuItems(menuRes.data || []);
      setCategories(categoryRes.data || []);
    } catch (err) {
      setError('Failed to load restaurant details.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchSearch = !search ||
      item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' ||
      item.categoryId === activeCategory;
    return matchSearch && matchCategory;
  });

  if (loading) return <LoadingSpinner text="Loading restaurant..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;
  if (!restaurant) return null;

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-br from-primary-100
                      to-primary-200">
        {restaurant.imageUrl && (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white bg-opacity-90
                     backdrop-blur-sm p-2 rounded-xl shadow-sm
                     hover:bg-opacity-100 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-secondary-700" />
        </button>
      </div>

      <div className="page-container">

        {/* Restaurant Info */}
        <div className="card -mt-12 relative z-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-start
                          md:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-secondary-900">
                  {restaurant.name}
                </h1>
                {restaurant.isActive && (
                  <span className="badge-green">Open</span>
                )}
              </div>

              <p className="text-primary-500 font-medium mb-2">
                {restaurant.cuisineType}
              </p>

              {restaurant.description && (
                <p className="text-secondary-500 mb-4">
                  {restaurant.description}
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {restaurant.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-secondary-700">
                      {restaurant.rating.toFixed(1)}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-1 text-secondary-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    {restaurant.deliveryTimeMinutes} min
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-secondary-500">
                  <Bike className="h-4 w-4" />
                  <span className="text-sm">
                    {restaurant.deliveryFee === 0
                      ? 'Free delivery'
                      : `Rs. ${restaurant.deliveryFee}`
                    }
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-secondary-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm truncate">{restaurant.address}</span>
                </div>
              </div>

              {restaurant.phone && (
                <div className="flex items-center space-x-1
                                text-secondary-500 mt-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{restaurant.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <h2 className="section-title">Menu</h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2
                               h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('All')}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm
                            font-medium transition-all
                            ${activeCategory === 'All'
                              ? 'bg-primary-500 text-white'
                              : 'bg-white text-secondary-600 border border-gray-200'
                            }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm
                              font-medium transition-all
                              ${activeCategory === cat.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white text-secondary-600 border border-gray-200'
                              }`}
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
              message="Try searching with different keywords"
              action={() => setSearch('')}
              actionLabel="Clear search"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RestaurantDetailPage;