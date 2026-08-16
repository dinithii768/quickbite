import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { Lock, ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, login, isAdmin } = useAuth();

  if (loading) return <LoadingSpinner text="Checking authentication..." />;

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="flex flex-col items-center justify-center py-20 fade-in">
          <div className="card max-w-md text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary-400 rounded-full
                              blur-2xl opacity-40 animate-pulse-glow"></div>
              <div className="relative inline-flex bg-gradient-to-br
                              from-primary-500 to-orange-500 rounded-full p-5
                              shadow-2xl">
                <Lock className="h-12 w-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-secondary-900 mb-3">
              Login Required
            </h2>
            <p className="text-secondary-500 mb-6 leading-relaxed">
              Please login to access this page
            </p>
            <button onClick={login} className="btn-primary">
              Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin()) {
    return (
      <div className="page-container">
        <div className="flex flex-col items-center justify-center py-20 fade-in">
          <div className="card max-w-md text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-red-400 rounded-full
                              blur-2xl opacity-40 animate-pulse-glow"></div>
              <div className="relative inline-flex bg-gradient-to-br
                              from-red-500 to-red-600 rounded-full p-5
                              shadow-2xl">
                <ShieldAlert className="h-12 w-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-secondary-900 mb-3">
              Access Denied
            </h2>
            <p className="text-secondary-500 leading-relaxed">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;