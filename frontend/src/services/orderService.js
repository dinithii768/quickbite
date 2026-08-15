import api from './api';

export const cartService = {

  getCart: async (customerId) => {
    const response = await api.get(`/api/cart/${customerId}`);
    return response.data;
  },

  addItemToCart: async (customerId, data) => {
    const response = await api.post(`/api/cart/${customerId}/items`, data);
    return response.data;
  },

  updateCartItem: async (customerId, itemId, data) => {
    const response = await api.put(`/api/cart/${customerId}/items/${itemId}`, data);
    return response.data;
  },

  removeCartItem: async (customerId, itemId) => {
    const response = await api.delete(`/api/cart/${customerId}/items/${itemId}`);
    return response.data;
  },

  clearCart: async (customerId) => {
    const response = await api.delete(`/api/cart/${customerId}`);
    return response.data;
  },

};

export const orderService = {

  getAllOrders: async () => {
    const response = await api.get('/api/orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },

  getOrdersByCustomer: async (customerId) => {
    const response = await api.get(`/api/orders/customer/${customerId}`);
    return response.data;
  },

  createOrder: async (data) => {
    const response = await api.post('/api/orders', data);
    return response.data;
  },

  checkoutOrder: async (id) => {
    const response = await api.post(`/api/orders/${id}/checkout`);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/api/orders/${id}/status`, { status });
    return response.data;
  },

};