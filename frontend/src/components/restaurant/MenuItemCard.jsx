import { Plus, Flame, Leaf, Clock, TrendingUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart();
  const { isAuthenticated, login } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to add items');
      login();
      return;
    }

    if (!item.isAvailable) {
      toast.error('This item is unavailable');
      return;
    }

    try {
      await addToCart(item.id, 1);
      toast.success(`${item.name} added to cart!`, { icon: '🍽️' });
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className={`card group ${!item.isAvailable ? 'opacity-60' : ''}`}>
      <div className="flex gap-4">

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-black text-secondary-900 text-lg
                           group-hover:text-primary-600
                           transition-colors line-clamp-1">
              {item.name}
            </h4>
            <div className="flex gap-1 flex-shrink-0">
              {item.isVegetarian && (
                <span className="p-1.5 bg-gradient-to-br from-green-100 to-emerald-100
                                 rounded-lg border border-green-300 shadow-md"
                      title="Vegetarian">
                  <Leaf className="h-3.5 w-3.5 text-green-700" />
                </span>
              )}
              {item.isSpicy && (
                <span className="p-1.5 bg-gradient-to-br from-red-100 to-pink-100
                                 rounded-lg border border-red-300 shadow-md"
                      title="Spicy">
                  <Flame className="h-3.5 w-3.5 text-red-700" />
                </span>
              )}
            </div>
          </div>

          {item.description && (
            <p className="text-secondary-500 text-sm mb-3 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-3 mb-4 text-xs">
            {item.preparationTimeMinutes && (
              <div className="flex items-center gap-1.5 bg-primary-50
                              px-2 py-1 rounded-lg border border-primary-100">
                <Clock className="h-3 w-3 text-primary-600" />
                <span className="font-bold text-primary-700">
                  {item.preparationTimeMinutes} min
                </span>
              </div>
            )}
            {item.calories && (
              <div className="flex items-center gap-1.5 bg-orange-50
                              px-2 py-1 rounded-lg border border-orange-100">
                <TrendingUp className="h-3 w-3 text-orange-600" />
                <span className="font-bold text-orange-700">
                  {item.calories} cal
                </span>
              </div>
            )}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-primary-600 font-black text-2xl">
                Rs. {item.price.toFixed(2)}
              </span>
            </div>

            {!item.isAvailable ? (
              <span className="badge-gray">Unavailable</span>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-primary-500 to-primary-600
                           hover:from-primary-600 hover:to-primary-700
                           text-white rounded-2xl px-5 py-2.5
                           font-black text-sm flex items-center gap-2
                           shadow-xl shadow-primary-500/40
                           hover:shadow-2xl hover:shadow-primary-500/60
                           transform hover:-translate-y-1 hover:scale-105
                           transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Image */}
        {item.imageUrl && (
          <div className="w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden
                          bg-gray-100 shadow-xl border-2 border-white">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover
                         group-hover:scale-110 transition-transform duration-500"
              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;