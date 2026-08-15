import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

import LandingPage from './pages/public/LandingPage';
import NotFoundPage from './pages/public/NotFoundPage';
import RestaurantsPage from './pages/customer/RestaurantsPage';
import RestaurantDetailPage from './pages/customer/RestaurantDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/restaurants" element={
                <ProtectedRoute>
                  <RestaurantsPage />
                </ProtectedRoute>
              } />
              <Route path="/restaurants/:id" element={
                <ProtectedRoute>
                  <RestaurantDetailPage />
                </ProtectedRoute>
              } />

              {/* Placeholder routes for Member 2 */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <div className="page-container">
                    <h1 className="section-title">Cart</h1>
                    <p className="text-secondary-400">
                      Cart page — Member 2 will build this
                    </p>
                  </div>
                </ProtectedRoute>
              } />

              <Route path="/orders" element={
                <ProtectedRoute>
                  <div className="page-container">
                    <h1 className="section-title">My Orders</h1>
                    <p className="text-secondary-400">
                      Orders page — Member 2 will build this
                    </p>
                  </div>
                </ProtectedRoute>
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