export function EmptyState({ title, message, action, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon ? (
        <div className="mb-4 text-surface-500">{icon}</div>
      ) : (
        <div className="w-16 h-16 mb-4 rounded-2xl bg-surface-800/50 flex items-center justify-center">
          <svg className="w-8 h-8 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-display font-semibold text-surface-200 mb-2">{title}</h3>
      {message && <p className="text-surface-400 text-sm text-center max-w-sm mb-6">{message}</p>}
      {action}
    </div>
  );
}
