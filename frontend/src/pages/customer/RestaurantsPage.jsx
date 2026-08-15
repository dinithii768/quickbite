import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
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

  const cuisines = ['All', 'Sri Lankan', 'Chinese', 'Indian', 'Italian',
                    'Japanese', 'Thai', 'Fast Food', 'Desserts'];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [search, selectedCuisine, restaurants]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await restaurantService.getActiveRestaurants();
      setRestaurants(response.data || []);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let result = [...restaurants];

    if (search) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisineType.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Restaurants
        </h1>
        <p className="text-secondary-400">
          {restaurants.length} restaurants available near you
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2
                           h-5 w-5 text-secondary-400" />
        <input
          type="text"
          placeholder="Search restaurants, cuisines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {/* Cuisine Filter */}
      <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
        <SlidersHorizontal className="h-4 w-4 text-secondary-400
                                       flex-shrink-0" />
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm
                        font-medium transition-all duration-200
                        ${selectedCuisine === cuisine
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-secondary-600 border border-gray-200 hover:border-primary-300'
                        }`}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No restaurants found"
          message={
            search
              ? `No results for "${search}". Try different keywords.`
              : 'No restaurants available in this category.'
          }
          action={() => { setSearch(''); setSelectedCuisine('All'); }}
          actionLabel="Clear filters"
        />
      ) : (
        <>
          <p className="text-secondary-400 text-sm mb-4">
            Showing {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                          xl:grid-cols-4 gap-6">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default RestaurantsPage;