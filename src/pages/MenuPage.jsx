import SearchBar from '../components/menu/SearchBar';
import SpecialsCarousel from '../components/menu/SpecialsCarousel';
import CategoryFilter from '../components/menu/CategoryFilter';
import MenuGrid from '../components/menu/MenuGrid';

export default function MenuPage() {
  return (
    <div>
      <SearchBar />
      <CategoryFilter />
      <SpecialsCarousel />
      
      <MenuGrid />
    </div>
  );
}