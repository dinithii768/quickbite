import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container flex flex-col items-center
                    justify-center min-h-96 text-center">
      <div className="text-8xl font-extrabold text-primary-200 mb-4">
        404
      </div>
      <h1 className="text-3xl font-bold text-secondary-900 mb-2">
        Page not found
      </h1>
      <p className="text-secondary-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="btn-primary flex items-center space-x-2"
        >
          <Home className="h-4 w-4" />
          <span>Go Home</span>
        </button>
        <button
          onClick={() => navigate('/restaurants')}
          className="btn-secondary flex items-center space-x-2"
        >
          <Search className="h-4 w-4" />
          <span>Browse Restaurants</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;