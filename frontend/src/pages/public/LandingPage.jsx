import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChefHat, Clock, Shield, Star, ArrowRight, Bike } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-primary-500" />,
      title: 'Fast Delivery',
      description: 'Get your favorite food delivered in under 45 minutes',
    },
    {
      icon: <Star className="h-6 w-6 text-primary-500" />,
      title: 'Top Restaurants',
      description: 'Choose from hundreds of top-rated local restaurants',
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-500" />,
      title: 'Safe & Secure',
      description: 'Your orders and payments are always protected',
    },
    {
      icon: <Bike className="h-6 w-6 text-primary-500" />,
      title: 'Live Tracking',
      description: 'Track your order in real-time from kitchen to door',
    },
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white
                          to-orange-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center space-x-2 bg-primary-100
                          rounded-full px-4 py-2 mb-8">
            <ChefHat className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 text-sm font-medium">
              Sri Lanka's fastest food delivery
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold
                         text-secondary-900 mb-6 leading-tight">
            Delicious food
            <br />
            <span className="text-primary-500">delivered fast</span>
          </h1>

          <p className="text-xl text-secondary-500 mb-10 max-w-2xl mx-auto">
            Order from your favorite restaurants and get fresh, hot food
            delivered to your doorstep in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center
                          justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/restaurants')}
              className="btn-primary flex items-center space-x-2
                         text-lg px-8 py-3 w-full sm:w-auto"
            >
              <span>Order Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            {!isAuthenticated && (
              <button
                onClick={login}
                className="btn-secondary text-lg px-8 py-3
                           w-full sm:w-auto"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Restaurants' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-secondary-900">
                  {stat.value}
                </div>
                <div className="text-secondary-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Why choose QuickBite?
            </h2>
            <p className="text-secondary-400 text-lg">
              We make food delivery simple, fast, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card text-center">
                <div className="bg-primary-50 rounded-2xl p-4 w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to order?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of satisfied customers ordering with QuickBite
          </p>
          <button
            onClick={() => navigate('/restaurants')}
            className="bg-white text-primary-600 font-semibold px-8 py-3
                       rounded-xl hover:bg-primary-50 transition-colors
                       text-lg"
          >
            Browse Restaurants
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-primary-500 p-1.5 rounded-lg">
              <ChefHat className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold">
              Quick<span className="text-primary-400">Bite</span>
            </span>
          </div>
          <p className="text-sm">
            © 2024 QuickBite. Built with ❤️ for Service-Oriented Computing
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;