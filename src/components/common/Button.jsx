export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={[
        'w-full h-12 px-4 rounded-2xl',
        'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
        'font-semibold text-base shadow-lg',
        'active:scale-[0.98] transition-all',
        'focus:outline-none focus:ring-4 focus:ring-blue-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}