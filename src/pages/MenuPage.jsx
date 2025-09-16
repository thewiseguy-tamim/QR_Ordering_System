import SearchBar from '../components/menu/SearchBar';
import CategoryFilter from '../components/menu/CategoryFilter';
import MenuGrid from '../components/menu/MenuGrid';

export default function MenuPage() {
  return (
    <div>
      <SearchBar />
      <CategoryFilter />
      <MenuGrid />
    </div>
  );
}