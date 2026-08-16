import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';

import LandingPage from './pages/public/LandingPage';
import NotFoundPage from './pages/public/NotFoundPage';
import RestaurantsPage from './pages/customer/RestaurantsPage';
import RestaurantDetailPage from './pages/customer/RestaurantDetailPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderSuccessPage from './pages/customer/OrderSuccessPage';
import OrdersPage from './pages/customer/OrdersPage';
import OrderTrackingPage from './pages/customer/OrderTrackingPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/restaurants" element={
                <ProtectedRoute><RestaurantsPage /></ProtectedRoute>
              } />
              <Route path="/restaurants/:id" element={
                <ProtectedRoute><RestaurantDetailPage /></ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute><CartPage /></ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute><CheckoutPage /></ProtectedRoute>
              } />
              <Route path="/order-success/:id" element={
                <ProtectedRoute><OrderSuccessPage /></ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute><OrdersPage /></ProtectedRoute>
              } />
              <Route path="/orders/:id" element={
                <ProtectedRoute><OrderTrackingPage /></ProtectedRoute>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;