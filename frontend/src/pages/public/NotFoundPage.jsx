import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="flex flex-col items-center justify-center py-16 text-center fade-in">

        {/* 404 Big Text */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400
                          to-orange-500 blur-3xl opacity-30
                          animate-pulse-glow"></div>
          <h1 className="relative text-[10rem] md:text-[14rem] font-black
                         leading-none text-gradient
                         animate-bounce-subtle">
            404
          </h1>
        </div>

        <div className="card max-w-md">
          <div className="text-6xl mb-4 animate-float">🍽️</div>
          <h2 className="text-3xl font-black text-secondary-900 mb-3">
            Page not found
          </h2>
          <p className="text-secondary-500 mb-6 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to something delicious!
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/')}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </button>
            <button
              onClick={() => navigate('/restaurants')}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>Browse Food</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;