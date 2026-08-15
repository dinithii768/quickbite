const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`loading-spinner ${sizes[size]} border-4`}></div>
      {text && (
        <p className="mt-4 text-secondary-500 text-sm">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;