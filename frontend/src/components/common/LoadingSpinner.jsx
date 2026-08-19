const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 fade-in">
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>

        {/* Spinning gradient */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent
                        border-t-primary-500 border-r-orange-500
                        animate-spin"></div>

        {/* Middle spinning circle */}
        <div className="absolute inset-3 rounded-full border-4 border-transparent
                        border-t-orange-400 border-l-red-400
                        animate-spin"
             style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl animate-bounce-subtle">🍔</div>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-orange-500
                        rounded-full blur-2xl opacity-30 animate-pulse-glow"></div>
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-secondary-800 font-black text-lg">{text}</p>
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;