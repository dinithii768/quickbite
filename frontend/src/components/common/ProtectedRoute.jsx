import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, login, isAdmin } = useAuth();

  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="page-container text-center py-20">
        <div className="card max-w-md mx-auto">
          <h2 className="text-xl font-bold text-secondary-900 mb-2">
            Login Required
          </h2>
          <p className="text-secondary-400 mb-6">
            Please login to access this page
          </p>
          <button onClick={login} className="btn-primary">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin()) {
    return (
      <div className="page-container text-center py-20">
        <div className="card max-w-md mx-auto">
          <h2 className="text-xl font-bold text-secondary-900 mb-2">
            Access Denied
          </h2>
          <p className="text-secondary-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;