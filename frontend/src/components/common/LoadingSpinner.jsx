const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-14 w-14',
    lg: 'h-20 w-20',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 fade-in">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400
                        to-orange-500 rounded-full blur-2xl opacity-40
                        animate-pulse-glow"></div>

        {/* Spinner */}
        <div className={`relative ${sizes[size]}
                         rounded-full border-4 border-primary-100
                         border-t-primary-500 border-r-orange-500
                         animate-spin`}></div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl animate-bounce-subtle">🍽️</div>
        </div>
      </div>

      {text && (
        <p className="mt-6 text-secondary-600 font-bold text-sm
                      animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;