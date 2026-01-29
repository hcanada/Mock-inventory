const variants = {
  default: {
    glow: 'metric-glow-emerald',
    icon: 'bg-accent-emerald/20 text-accent-emerald',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  value: {
    glow: 'metric-glow-violet',
    icon: 'bg-accent-violet/20 text-accent-violet',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  warning: {
    glow: 'metric-glow-amber',
    icon: 'bg-accent-amber/20 text-accent-amber',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  danger: {
    glow: 'metric-glow-rose',
    icon: 'bg-accent-rose/20 text-accent-rose',
    iconSvg: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
};

export function MetricCard({ title, value, subtitle, variant = 'default', index = 0 }) {
  const style = variants[variant] || variants.default;

  return (
    <div
      className={`glass-card-hover p-6 ${style.glow} animate-slide-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-surface-400 mb-1">{title}</p>
          <p className="text-3xl font-display font-bold text-surface-100 tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="mt-2 text-sm text-surface-500">{subtitle}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center`}>
          {style.iconSvg}
        </div>
      </div>
    </div>
  );
}
