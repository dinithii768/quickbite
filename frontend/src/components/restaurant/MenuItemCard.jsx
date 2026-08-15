import { Plus, Flame, Leaf } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const MenuItemCard = ({ item }) => {
  const { addToCart, customerId } = useCart();
  const { isAuthenticated, login } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      login();
      return;
    }

    if (!item.isAvailable) {
      toast.error('This item is currently unavailable');
      return;
    }

    try {
      await addToCart(item.id, 1);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className={`card flex space-x-4 ${!item.isAvailable ? 'opacity-60' : ''}`}>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-secondary-900 text-sm">
            {item.name}
          </h4>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            {item.isVegetarian && (
              <Leaf className="h-4 w-4 text-green-500" />
            )}
            {item.isSpicy && (
              <Flame className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-secondary-400 text-xs mb-2 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary-600 font-bold">
              Rs. {item.price.toFixed(2)}
            </span>
            {item.calories && (
              <span className="text-secondary-400 text-xs ml-2">
                {item.calories} cal
              </span>
            )}
          </div>

          {!item.isAvailable ? (
            <span className="badge-gray text-xs">Unavailable</span>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-primary-500 hover:bg-primary-600 text-white
                         rounded-xl p-2 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Image */}
      {item.imageUrl && (
        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden
                        bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;