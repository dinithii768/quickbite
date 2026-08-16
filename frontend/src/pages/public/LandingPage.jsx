import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ChefHat, Clock, Shield, Star, ArrowRight, Bike,
  Utensils, Users, Award, Sparkles, Zap, MapPin,
  ThumbsUp, TrendingUp, Heart
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const features = [
    {
      icon: <Zap className="h-7 w-7" />,
      title: 'Lightning Fast',
      description: 'Hot food at your door in under 30 minutes',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      icon: <Star className="h-7 w-7" />,
      title: 'Top Rated',
      description: '500+ curated restaurants near you',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'Safe & Secure',
      description: 'End-to-end encrypted payments',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: <Bike className="h-7 w-7" />,
      title: 'Live Tracking',
      description: 'Real-time order tracking on map',
      gradient: 'from-blue-400 to-cyan-500',
    },
  ];

  const popularCuisines = [
    { name: 'Sri Lankan', emoji: '🍛', color: 'from-orange-200 to-red-200' },
    { name: 'Chinese', emoji: '🥡', color: 'from-red-200 to-pink-200' },
    { name: 'Italian', emoji: '🍕', color: 'from-yellow-200 to-orange-200' },
    { name: 'Japanese', emoji: '🍣', color: 'from-pink-200 to-purple-200' },
    { name: 'Fast Food', emoji: '🍔', color: 'from-amber-200 to-yellow-200' },
    { name: 'Desserts', emoji: '🍰', color: 'from-purple-200 to-pink-200' },
    { name: 'Indian', emoji: '🍜', color: 'from-orange-200 to-yellow-200' },
    { name: 'Thai', emoji: '🍲', color: 'from-lime-200 to-green-200' },
  ];

  return (
    <div className="min-h-screen">

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div className="text-center lg:text-left slide-up">

              <div className="inline-flex items-center gap-2 glass
                              rounded-full px-5 py-2.5 mb-8 shadow-xl">
                <div className="bg-gradient-to-r from-primary-500 to-orange-500
                                p-1.5 rounded-full animate-pulse-glow">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-secondary-800 text-sm font-bold">
                  Sri Lanka's #1 Food Delivery
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl
                             font-black mb-6 leading-[1.05] tracking-tight">
                Delicious
                <br />
                food, delivered
                <br />
                <span className="relative inline-block">
                  <span className="text-gradient animate-gradient-x">super fast</span>
                  <svg className="absolute -bottom-4 left-0 w-full"
                       viewBox="0 0 300 20" fill="none">
                    <path d="M5 15 Q 150 5, 295 15"
                          stroke="url(#grad)" strokeWidth="4"
                          strokeLinecap="round" fill="none" />
                    <defs>
                      <linearGradient id="grad">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="text-xl text-secondary-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Order from your favorite restaurants and get fresh,
                hot food delivered to your doorstep in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center
                              gap-4 lg:justify-start justify-center mb-10">
                <button
                  onClick={() => navigate('/restaurants')}
                  className="btn-primary flex items-center gap-2
                             text-lg px-10 py-4 w-full sm:w-auto group"
                >
                  <span>Order Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </button>

                {!isAuthenticated && (
                  <button onClick={login}
                          className="btn-secondary text-lg px-10 py-4 w-full sm:w-auto">
                    Sign In
                  </button>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D', '+'].map((letter, i) => (
                    <div key={i}
                         className={`h-12 w-12 rounded-full border-4 border-white
                                     bg-gradient-to-br
                                     ${i === 0 ? 'from-purple-400 to-pink-500' :
                                       i === 1 ? 'from-blue-400 to-cyan-500' :
                                       i === 2 ? 'from-green-400 to-emerald-500' :
                                       i === 3 ? 'from-yellow-400 to-orange-500' :
                                       'from-primary-500 to-red-500'}
                                     flex items-center justify-center
                                     text-white text-sm font-black shadow-xl`}>
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-secondary-700 font-bold">
                    50,000+ happy customers
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT - Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400
                                to-orange-500 rounded-[3rem] blur-3xl opacity-30
                                animate-pulse-glow"></div>

                {/* Main image */}
                <div className="relative rounded-[3rem] overflow-hidden
                                shadow-2xl border-8 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop"
                    alt="Food"
                    className="w-full h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t
                                  from-black/50 via-transparent to-transparent"></div>

                  {/* Bottom text on image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm opacity-90 mb-1 font-semibold">
                      🔥 Most Popular
                    </p>
                    <h3 className="text-2xl font-black">Fresh & Delicious Meals</h3>
                  </div>
                </div>

                {/* Rating card */}
                <div className="absolute top-8 -left-8 glass rounded-3xl p-5
                                shadow-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500
                                    rounded-2xl p-3 shadow-lg">
                      <Star className="h-6 w-6 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs text-secondary-500 font-bold">
                        Excellent
                      </div>
                      <div className="text-2xl font-black text-secondary-900">
                        4.9
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery card */}
                <div className="absolute -bottom-8 -right-6 glass rounded-3xl p-5
                                shadow-2xl animate-float-reverse">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-primary-500 to-red-500
                                    rounded-2xl p-3 shadow-lg">
                      <Bike className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-secondary-500 font-bold">
                        Delivery
                      </div>
                      <div className="text-2xl font-black text-secondary-900">
                        25 min
                      </div>
                    </div>
                  </div>
                </div>

                {/* Free delivery badge */}
                <div className="absolute top-1/2 -right-10
                                bg-gradient-to-r from-green-500 to-emerald-600
                                rounded-2xl p-4 shadow-2xl animate-float"
                     style={{animationDelay: '1.5s'}}>
                  <div className="flex items-center gap-2 text-white">
                    <ThumbsUp className="h-5 w-5" />
                    <span className="font-black text-sm">FREE Delivery</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              {icon: <Utensils className="h-7 w-7" />, value: '500+', label: 'Restaurants', gradient: 'from-orange-500 to-red-500'},
              {icon: <Users className="h-7 w-7" />, value: '50K+', label: 'Customers', gradient: 'from-blue-500 to-cyan-500'},
              {icon: <Award className="h-7 w-7" />, value: '4.9★', label: 'Rating', gradient: 'from-yellow-500 to-orange-500'},
              {icon: <TrendingUp className="h-7 w-7" />, value: '25 min', label: 'Avg Delivery', gradient: 'from-green-500 to-emerald-500'},
            ].map((stat, idx) => (
              <div key={stat.label} className="card text-center slide-up"
                   style={{animationDelay: `${idx * 100}ms`}}>
                <div className={`inline-flex bg-gradient-to-br ${stat.gradient}
                                rounded-2xl p-4 mb-3 text-white shadow-xl
                                animate-float`}
                     style={{animationDelay: `${idx * 200}ms`}}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-secondary-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-secondary-500 text-sm font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CUISINE CATEGORIES ============ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-secondary-900 mb-4">
              What are you <span className="text-gradient">craving?</span>
            </h2>
            <p className="text-secondary-500 text-lg">
              Explore your favorite cuisines
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularCuisines.map((cuisine, idx) => (
              <div
                key={cuisine.name}
                onClick={() => navigate('/restaurants')}
                className={`bg-gradient-to-br ${cuisine.color}
                            rounded-3xl p-6 text-center cursor-pointer
                            hover:scale-110 hover:-translate-y-2
                            transition-all duration-500
                            hover:shadow-2xl border-2 border-white
                            slide-up`}
                style={{animationDelay: `${idx * 50}ms`}}
              >
                <div className="text-5xl mb-2 animate-bounce-subtle"
                     style={{animationDelay: `${idx * 200}ms`}}>
                  {cuisine.emoji}
                </div>
                <p className="font-black text-secondary-800 text-sm">
                  {cuisine.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass
                            rounded-full px-5 py-2 mb-4">
              <Heart className="h-4 w-4 text-primary-600" />
              <span className="text-primary-700 text-sm font-black">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-secondary-900 mb-4">
              Everything you need,
              <br />
              <span className="text-gradient">delivered perfectly</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={feature.title}
                   className="card-hover group text-center slide-up"
                   style={{animationDelay: `${idx * 100}ms`}}>
                <div className={`inline-flex bg-gradient-to-br
                                 ${feature.gradient} rounded-3xl p-5
                                 mb-5 text-white shadow-2xl
                                 group-hover:scale-125 group-hover:rotate-12
                                 transition-all duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-secondary-900 mb-4">
              Order in <span className="text-gradient">3 easy steps</span>
            </h2>
            <p className="text-secondary-500 text-lg">
              Get your food faster than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4
                            h-1 bg-gradient-to-r from-primary-300 via-orange-400
                            to-primary-300 rounded-full"></div>

            {[
              {step: '01', title: 'Choose Restaurant', desc: 'Browse from 500+ local restaurants', icon: '🏪'},
              {step: '02', title: 'Place Your Order', desc: 'Add items and checkout in seconds', icon: '🛒'},
              {step: '03', title: 'Enjoy Your Meal', desc: 'Track and enjoy fresh food', icon: '🍽️'},
            ].map((item, idx) => (
              <div key={item.step} className="text-center relative z-10 slide-up"
                   style={{animationDelay: `${idx * 200}ms`}}>
                <div className="glass rounded-full h-32 w-32 mx-auto mb-6
                                shadow-2xl flex items-center justify-center
                                text-6xl relative animate-float"
                     style={{animationDelay: `${idx * 300}ms`}}>
                  {item.icon}
                  <div className="absolute -top-2 -right-2
                                  bg-gradient-to-r from-primary-500 to-orange-500
                                  text-white text-sm font-black
                                  h-10 w-10 rounded-full flex items-center justify-center
                                  shadow-xl">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-secondary-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary-500 leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[3rem]
                          bg-gradient-to-br from-primary-500 via-orange-500 to-red-500
                          p-12 md:p-20 shadow-2xl">

            <div className="absolute top-0 right-0 w-96 h-96
                            bg-white/10 rounded-full -mr-48 -mt-48 animate-spin-slow"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72
                            bg-white/10 rounded-full -ml-36 -mb-36 animate-float"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48
                            bg-yellow-300/20 rounded-full
                            -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"></div>

            <div className="relative z-10 text-center">
              <div className="inline-flex bg-white/20 backdrop-blur-xl
                              rounded-full p-5 mb-6 animate-float">
                <ChefHat className="h-14 w-14 text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                Hungry? We got you!
              </h2>
              <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
                Join 50,000+ satisfied customers ordering with QuickBite
              </p>
              <button
                onClick={() => navigate('/restaurants')}
                className="bg-white text-primary-600 font-black
                           px-12 py-5 rounded-2xl
                           hover:bg-yellow-50 transition-all duration-500
                           text-lg shadow-2xl
                           transform hover:-translate-y-2 hover:scale-110"
              >
                Order Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-secondary-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600
                                p-3 rounded-2xl shadow-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black">
                  Quick<span className="text-primary-400">Bite</span>
                </span>
              </div>
              <p className="text-secondary-400 text-sm leading-relaxed">
                Sri Lanka's fastest food delivery platform.
              </p>
            </div>

            <div>
              <h4 className="font-black mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-secondary-400 text-sm">
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Restaurants</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-secondary-400 text-sm">
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-3 text-secondary-400 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Colombo, Sri Lanka
                </li>
                <li>📧 support@quickbite.com</li>
                <li>📞 +94 11 234 5678</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-8 text-center">
            <p className="text-secondary-400 text-sm">
              © 2024 QuickBite. Built with ❤️ for Service-Oriented Computing
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;