import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, error, className = '', icon, ...props },
  ref
) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-surface-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-surface-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            input-glass
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-accent-rose/50 focus:ring-accent-rose/50 focus:border-accent-rose/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-accent-rose flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});
