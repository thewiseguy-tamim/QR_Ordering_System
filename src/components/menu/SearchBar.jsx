import { useMenu } from '../../context/MenuContext';

export default function SearchBar() {
  const {
    searchQuery, setSearchQuery,
    viewMode, setViewMode,
    hideUnavailable, setHideUnavailable
  } = useMenu();

  return (
    <div className="px-4 pt-0 pb-2">
      {/* Search input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search menu"
          className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-3 py-3 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
        />
      </div>

      {/* Light controls row */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="inline-flex overflow-hidden rounded-xl border border-slate-200" role="group" aria-label="View mode">
          <button
            className={`min-w-[44px] px-3 py-2 ${viewMode === 'grid' ? 'bg-amber-100' : 'bg-white'}`}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            aria-label="Grid view"
          >
            ▦
          </button>
          <button
            className={`min-w-[44px] px-3 py-2 border-l border-slate-200 ${viewMode === 'list' ? 'bg-amber-100' : 'bg-white'}`}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            aria-label="List view"
          >
            ≡
          </button>
        </div>

        <label className="inline-flex items-center gap-2 text-slate-600 text-sm">
          <input
            type="checkbox"
            checked={hideUnavailable}
            onChange={(e) => setHideUnavailable(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Hide unavailable
        </label>
      </div>
    </div>
  );
}