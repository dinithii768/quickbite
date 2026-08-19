import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 fade-in">
      <div className="card max-w-md text-center bg-gradient-to-br from-white to-red-50/50">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-red-400 rounded-full blur-3xl opacity-40 animate-pulse-glow"></div>
          <div className="relative inline-flex bg-gradient-to-br from-red-400 to-red-600
                          rounded-full p-6 shadow-2xl animate-shake">
            <AlertCircle className="h-14 w-14 text-white" />
          </div>
        </div>

        <h3 className="text-3xl font-black text-secondary-900 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-secondary-500 mb-6 leading-relaxed font-semibold">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;