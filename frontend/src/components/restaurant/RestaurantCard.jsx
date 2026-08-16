import { useNavigate } from 'react-router-dom';
import { Star, Clock, Bike, ShoppingBag, TrendingUp } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
      className="card-hover group relative"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden
                      bg-gradient-to-br from-primary-100 to-orange-200">
        {restaurant.imageUrl ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover
                       group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-24 w-24 text-primary-300" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t
                        from-black/70 via-transparent to-transparent"></div>

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {restaurant.isActive && (
            <span className="badge-green shadow-xl">
              ● Open Now
            </span>
          )}

          {restaurant.rating > 0 && (
            <div className="glass rounded-2xl px-3 py-1.5
                            flex items-center gap-1 shadow-xl">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-black text-secondary-900">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-4 left-4 right-4">
          {restaurant.deliveryFee === 0 && (
            <span className="inline-flex items-center gap-1
                             bg-gradient-to-r from-green-500 to-emerald-600
                             text-white text-xs font-black px-3 py-1.5
                             rounded-full shadow-2xl">
              🚀 FREE DELIVERY
            </span>
          )}
        </div>

        {/* Hover effect - "View Menu" */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm
                        opacity-0 group-hover:opacity-100
                        transition-all duration-500
                        flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3
                          font-black text-secondary-900 shadow-2xl
                          transform scale-90 group-hover:scale-100
                          transition-transform duration-500
                          flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary-600" />
            <span>View Menu</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-black text-secondary-900 text-xl
                         group-hover:text-primary-600 transition-colors
                         line-clamp-1">
            {restaurant.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-black px-3 py-1 rounded-full
                           bg-gradient-to-r from-primary-100 to-orange-100
                           text-primary-700
                           border border-primary-200">
            {restaurant.cuisineType}
          </span>
        </div>

        {restaurant.description && (
          <p className="text-secondary-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>
        )}

        {/* Info row */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary-100 to-orange-100
                            p-2 rounded-xl">
              <Clock className="h-4 w-4 text-primary-600" />
            </div>
            <div>
              <div className="text-xs text-secondary-400 font-medium">Time</div>
              <div className="text-sm font-black text-secondary-900">
                {restaurant.deliveryTimeMinutes} min
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100
                            p-2 rounded-xl">
              <Bike className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-secondary-400 font-medium">Delivery</div>
              <div className="text-sm font-black text-secondary-900">
                {restaurant.deliveryFee === 0 ? 'Free' : `Rs. ${restaurant.deliveryFee}`}
              </div>
            </div>
          </div>
        </div>

        {restaurant.minimumOrderAmount > 0 && (
          <p className="text-secondary-400 text-xs mt-3 font-semibold">
            Min. order: <span className="text-secondary-900">Rs. {restaurant.minimumOrderAmount}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;