import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { searchCityByName } from './features/city/citySlice';
import { City } from './types/city';
import { fetchCoordinates } from './features/coordinate/coordinateSlice';
import { fetchWeather } from './features/weather/weatherSlice';

import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';

import './App.css';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const dispatch = useAppDispatch();

  const { cities } = useAppSelector(state => state.city);
  const { coordinates } = useAppSelector(state => state.coordinate);
  const { weather } = useAppSelector(state => state.weather);

  useEffect(() => {
    if (localStorage.getItem('city')) {
      const cityObj = JSON.parse(localStorage.getItem('city') || '{}') as City;
      setCity(cityObj);
      setCityName(cityObj.nom);
      setShowAutocomplete(false);
    }
  }, []);

  useEffect(() => {
    // check if at least one result exists
    if (coordinates && coordinates[0]) {
      const lat = coordinates[0].latitude;
      const long = coordinates[0].longitude;
      const lang = 'fr';

      dispatch(fetchWeather({ lat, long, lang }));
    }
  }, [coordinates, dispatch]);

  useEffect(() => {
    if (city) {
      dispatch(fetchCoordinates(city));
    }
  }, [city, dispatch]);

  useEffect(() => {
    dispatch(searchCityByName(cityName));
  }, [cityName, dispatch]);

  const selectCity = (cityToSelect: City) => {
    setCity(cityToSelect);
    setCityName(cityToSelect.nom);
    localStorage.setItem('city', JSON.stringify(cityToSelect));
    setShowAutocomplete(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    setShowAutocomplete(true);
  };

  return (
    <div className='App'>
      <Header
        cityName={cityName}
        handleChange={handleChange}
        cities={cities}
        selectCity={selectCity}
        showAutocomplete={showAutocomplete}
      />

      <CurrentWeather weather={weather} />
    </div>
  );
};

export default App;
