const EmptyState = ({ title = 'Nothing here', message, action, actionLabel, emoji = '📦' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 fade-in">
      <div className="card max-w-md text-center bg-gradient-to-br from-white to-orange-50/50">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-orange-400
                          rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
          <div className="relative inline-flex bg-gradient-to-br from-primary-100 to-orange-200
                          rounded-full h-32 w-32 items-center justify-center
                          shadow-2xl animate-float">
            <span className="text-7xl">{emoji}</span>
          </div>
        </div>

        <h3 className="text-3xl font-black text-secondary-900 mb-3">
          {title}
        </h3>
        {message && (
          <p className="text-secondary-500 max-w-xs mx-auto mb-6 leading-relaxed font-semibold">
            {message}
          </p>
        )}
        {action && actionLabel && (
          <button onClick={action} className="btn-primary">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;