import api from './api';

export const restaurantService = {

  getAllRestaurants: async () => {
    const response = await api.get('/api/restaurants');
    return response.data;
  },

  getActiveRestaurants: async () => {
    const response = await api.get('/api/restaurants/active');
    return response.data;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/api/restaurants/${id}`);
    return response.data;
  },

  searchRestaurants: async (keyword) => {
    const response = await api.get(`/api/restaurants/search?keyword=${keyword}`);
    return response.data;
  },

  createRestaurant: async (data) => {
    const response = await api.post('/api/restaurants', data);
    return response.data;
  },

  updateRestaurant: async (id, data) => {
    const response = await api.put(`/api/restaurants/${id}`, data);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.data;
  },

  getRestaurantMenu: async (restaurantId) => {
    const response = await api.get(`/api/menu-items/restaurant/${restaurantId}`);
    return response.data;
  },

};

export const categoryService = {

  getCategoriesByRestaurant: async (restaurantId) => {
    const response = await api.get(`/api/categories/restaurant/${restaurantId}`);
    return response.data;
  },

  createCategory: async (data) => {
    const response = await api.post('/api/categories', data);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await api.put(`/api/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
  },

};

export const menuItemService = {

  getAllMenuItems: async () => {
    const response = await api.get('/api/menu-items');
    return response.data;
  },

  getMenuItemById: async (id) => {
    const response = await api.get(`/api/menu-items/${id}`);
    return response.data;
  },

  getMenuItemsByRestaurant: async (restaurantId) => {
    const response = await api.get(`/api/menu-items/restaurant/${restaurantId}`);
    return response.data;
  },

  getMenuItemsByCategory: async (categoryId) => {
    const response = await api.get(`/api/menu-items/category/${categoryId}`);
    return response.data;
  },

  searchMenuItems: async (keyword) => {
    const response = await api.get(`/api/menu-items/search?keyword=${keyword}`);
    return response.data;
  },

  createMenuItem: async (data) => {
    const response = await api.post('/api/menu-items', data);
    return response.data;
  },

  updateMenuItem: async (id, data) => {
    const response = await api.put(`/api/menu-items/${id}`, data);
    return response.data;
  },

  deleteMenuItem: async (id) => {
    const response = await api.delete(`/api/menu-items/${id}`);
    return response.data;
  },

};