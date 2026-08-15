import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/orderService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const customerId = user?.username || 'guest';

  const fetchCart = async () => {
    if (!isAuthenticated || !user) return;
    try {
      setLoading(true);
      const response = await cartService.getCart(customerId);
      setCart(response.data);
      setCartCount(response.data?.totalItems || 0);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    }
  }, [isAuthenticated, user]);

  const addToCart = async (menuItemId, quantity = 1) => {
    try {
      const response = await cartService.addItemToCart(customerId, {
        menuItemId,
        quantity,
      });
      setCart(response.data);
      setCartCount(response.data?.totalItems || 0);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartService.removeCartItem(customerId, itemId);
      setCart(response.data);
      setCartCount(response.data?.totalItems || 0);
    } catch (error) {
      throw error;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await cartService.updateCartItem(
        customerId,
        itemId,
        { menuItemId: itemId, quantity }
      );
      setCart(response.data);
      setCartCount(response.data?.totalItems || 0);
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart(customerId);
      setCart(null);
      setCartCount(0);
    } catch (error) {
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        customerId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;