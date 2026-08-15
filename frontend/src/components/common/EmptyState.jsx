import { PackageOpen } from 'lucide-react';

const EmptyState = ({ title = 'Nothing here', message, action, actionLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-gray-50 rounded-full p-6 mb-6">
        <PackageOpen className="h-12 w-12 text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-700 mb-2">{title}</h3>
      {message && (
        <p className="text-secondary-400 text-sm text-center max-w-xs mb-6">
          {message}
        </p>
      )}
      {action && actionLabel && (
        <button onClick={action} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;