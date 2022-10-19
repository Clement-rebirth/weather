import { City as CitySchema } from '../types/city';

interface CityProps {
  city: CitySchema;
  selectCity: (cityToSelect: CitySchema) => void;
}

const City = ({ city, selectCity }: CityProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') selectCity(city);
  };

  return (
    <div tabIndex={0} className='city' onKeyDown={handleKeyDown} onClick={() => selectCity(city)} role='button'>
      <div className='left'>
        <span className='location-icon material-symbols-rounded'>location_on</span>
        { city.nom }
      </div>
      <p className='right'>{ city.departement.nom } - { city.departement.code }</p>
    </div>
  );
};

export default City;
