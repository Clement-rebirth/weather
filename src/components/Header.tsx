import { City as CitySchema } from '../types/city';

import City from './City';

interface HeaderProps {
  cityName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cities: CitySchema[] | null;
  selectCity: (cityToSelect: CitySchema) => void;
  showAutocomplete: boolean;
}

const Header = ({
  cityName, handleChange, cities, selectCity, showAutocomplete,
}: HeaderProps) => (
  <header>
    <div className='search-input-container'>
      <span className='search-icon material-symbols-rounded'>search</span>
      <input type='text' value={cityName} onChange={handleChange} placeholder='Chercher une ville' />
    </div>

    <div className='autocomplete-container'>
      <div className='autocomplete'>
        { (cities && showAutocomplete) && cities.map((city, index) => (
          <City key={index} city={city} selectCity={selectCity} />
        )) }
      </div>
    </div>
  </header>
);

export default Header;
