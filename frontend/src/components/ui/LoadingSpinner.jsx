export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative">
        <div
          className={`${sizes[size]} animate-spin rounded-full border-2 border-surface-700 border-t-accent-emerald`}
        />
        <div
          className={`${sizes[size]} absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-accent-cyan opacity-50`}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-surface-400 animate-pulse">Loading...</p>
    </div>
  );
}
