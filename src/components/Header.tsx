import { City as CitySchema } from '../types/city';

import City from './City';

interface HeaderProps {
  cityName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cities: CitySchema[] | null;
  selectCity: (cityToSelect: CitySchema) => void;
}

const Header = ({
  cityName, handleChange, cities, selectCity,
}: HeaderProps) => (
  <header>
    <div className='search-input-container'>
      <span className='material-symbols-rounded'>search</span>
      <input type='text' value={cityName} onChange={handleChange} />
    </div>

    <div className='autocomplete'>
      { cities && cities.map((city, index) => (
        <City key={index} city={city} selectCity={selectCity} />
      )) }
    </div>
  </header>
);

export default Header;
