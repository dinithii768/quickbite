import { useNavigate } from 'react-router-dom';
import { Star, Clock, Bike, ShoppingBag } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card-hover group overflow-hidden p-0"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100
                      to-primary-200 overflow-hidden">
        {restaurant.imageUrl ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105
                       transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-primary-300" />
          </div>
        )}

        {/* Active badge */}
        {restaurant.isActive && (
          <div className="absolute top-3 left-3">
            <span className="badge-green text-xs">Open</span>
          </div>
        )}

        {/* Rating */}
        {restaurant.rating > 0 && (
          <div className="absolute top-3 right-3 bg-white rounded-lg
                          px-2 py-1 flex items-center space-x-1 shadow-sm">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-secondary-700">
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-secondary-900 text-lg mb-1
                       group-hover:text-primary-600 transition-colors">
          {restaurant.name}
        </h3>

        <p className="text-secondary-400 text-sm mb-3">
          {restaurant.cuisineType}
        </p>

        {restaurant.description && (
          <p className="text-secondary-500 text-sm mb-3 line-clamp-2">
            {restaurant.description}
          </p>
        )}

        {/* Info row */}
        <div className="flex items-center space-x-4 text-secondary-400 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTimeMinutes} min</span>
          </div>

          <div className="flex items-center space-x-1">
            <Bike className="h-4 w-4" />
            <span>
              {restaurant.deliveryFee === 0
                ? 'Free delivery'
                : `Rs. ${restaurant.deliveryFee}`
              }
            </span>
          </div>
        </div>

        {/* Min order */}
        {restaurant.minimumOrderAmount > 0 && (
          <p className="text-secondary-400 text-xs mt-2">
            Min. order: Rs. {restaurant.minimumOrderAmount}
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;