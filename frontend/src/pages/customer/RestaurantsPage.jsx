import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, TrendingUp, Sparkles } from 'lucide-react';
import { restaurantService } from '../../services/restaurantService';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const cuisines = [
    { name: 'All', emoji: '🍽️' },
    { name: 'Sri Lankan', emoji: '🍛' },
    { name: 'Chinese', emoji: '🥡' },
    { name: 'Indian', emoji: '🍜' },
    { name: 'Italian', emoji: '🍕' },
    { name: 'Japanese', emoji: '🍣' },
    { name: 'Thai', emoji: '🍲' },
    { name: 'Fast Food', emoji: '🍔' },
    { name: 'Desserts', emoji: '🍰' },
    { name: 'Cafe', emoji: '☕' },
    { name: 'Healthy', emoji: '🥗' },
  ];

  useEffect(() => { fetchRestaurants(); }, []);
  useEffect(() => { filterRestaurants(); }, [search, selectedCuisine, restaurants]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await restaurantService.getActiveRestaurants();
      setRestaurants(response.data || []);
    } catch {
      setError('Failed to load restaurants.');
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let result = [...restaurants];
    if (search) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisineType.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCuisine !== 'All') {
      result = result.filter(r =>
        r.cuisineType.toLowerCase().includes(selectedCuisine.toLowerCase())
      );
    }
    setFiltered(result);
  };

  if (loading) return <LoadingSpinner text="Loading restaurants..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRestaurants} />;

  return (
    <div className="page-container">

      {/* Header */}
      <div className="mb-8 slide-up">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-r from-primary-500 to-orange-500
                          rounded-full p-1.5 animate-pulse-glow">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-primary-600 font-black text-sm uppercase tracking-wider">
            Popular Now
          </span>
        </div>
        <h1 className="section-title">
          Discover <span className="text-gradient">restaurants</span>
        </h1>
        <p className="text-secondary-500 text-lg font-medium">
          <span className="text-secondary-900 font-black">{restaurants.length}</span> amazing restaurants ready to serve you
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 slide-up">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2
                           h-5 w-5 text-secondary-400" />
        <input
          type="text"
          placeholder="Search restaurants, cuisines, or dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-14 text-base"
        />
      </div>

      {/* Cuisine Filter with emojis */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="h-4 w-4 text-secondary-600" />
          <span className="text-secondary-700 font-black text-sm uppercase tracking-wider">
            Categories
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.name}
              onClick={() => setSelectedCuisine(cuisine.name)}
              className={`flex-shrink-0 flex items-center gap-2
                          px-5 py-3 rounded-2xl text-sm font-black
                          transition-all duration-300
                          ${selectedCuisine === cuisine.name
                            ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-xl shadow-primary-500/30 scale-105'
                            : 'bg-white text-secondary-700 border border-gray-200 hover:border-primary-300 hover:shadow-md'}`}
            >
              <span className="text-lg">{cuisine.emoji}</span>
              <span>{cuisine.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No restaurants found"
          message={search ? `No results for "${search}"` : 'Try different filters'}
          action={() => { setSearch(''); setSelectedCuisine('All'); }}
          actionLabel="Clear filters"
          emoji="🔍"
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-secondary-500 text-sm font-bold">
              Showing <span className="text-secondary-900 font-black">{filtered.length}</span> restaurant{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2 text-primary-600 font-bold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>All Fresh</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((restaurant, idx) => (
              <div key={restaurant.id} className="slide-up"
                   style={{animationDelay: `${idx * 50}ms`}}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantsPage;