import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 rounded-2xl p-8 text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-500 text-sm mb-4">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;