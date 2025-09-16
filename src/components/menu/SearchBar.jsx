import { useMenu } from '../../context/MenuContext';

export default function SearchBar() {
  const {
    searchQuery, setSearchQuery,
    viewMode, setViewMode,
    hideUnavailable, setHideUnavailable
  } = useMenu();

  return (
    <div className="p-4 my-3 mt-[-40px]">
      <input
        type="search"
        placeholder="Search dishes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search menu"
        className="w-full rounded-xl border-gray-200 focus:border-brand focus:ring-brand"
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="inline-flex overflow-hidden rounded-lg border border-gray-200" role="group" aria-label="View mode">
          <button
            className={`min-w-[44px] px-3 py-2 ${viewMode === 'grid' ? 'bg-amber-100' : 'bg-white'}`}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            aria-label="Grid view"
          >▦</button>
          <button
            className={`min-w-[44px] px-3 py-2 border-l border-gray-200 ${viewMode === 'list' ? 'bg-amber-100' : 'bg-white'}`}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            aria-label="List view"
          >≡</button>
        </div>

        <label className="inline-flex items-center gap-2 text-gray-600 text-sm">
          <input
            type="checkbox"
            checked={hideUnavailable}
            onChange={(e) => setHideUnavailable(e.target.checked)}
            className="rounded border-gray-300 text-brand focus:ring-brand"
          />
          Hide unavailable
        </label>
      </div>
    </div>
  );
}