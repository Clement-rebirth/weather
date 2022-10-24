import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { searchCityByName } from './features/city/citySlice';
import { City } from './types/city';
import { fetchCoordinates } from './features/coordinate/coordinateSlice';
import { fetchWeather } from './features/weather/weatherSlice';

import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Error from './components/Error';
import DailyForecast from './components/DailyForecast';
import Footer from './components/Footer';
import Loading from './components/Loading';

import './App.css';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const dispatch = useAppDispatch();

  const { error: cityError, cities } = useAppSelector(state => state.city);
  const {
    loading: coordinatesLoading,
    error: coordinatesError,
    coordinates,
  } = useAppSelector(state => state.coordinate);
  const {
    loading: weatherLoading,
    error: weatherError,
    weather,
  } = useAppSelector(state => state.weather);

  useEffect(() => {
    if (localStorage.getItem('city')) {
      const cityObj = JSON.parse(localStorage.getItem('city') || '{}') as City;
      setCity(cityObj);
      setCityName(cityObj.nom);
      setShowAutocomplete(false);
    }
  }, []);

  useEffect(() => {
    let intervalId = 0;

    // check if at least one result exists
    if (coordinates && coordinates[0]) {
      const lat = coordinates[0].latitude;
      const long = coordinates[0].longitude;
      const lang = 'fr';

      dispatch(fetchWeather({ lat, long, lang }));

      intervalId = window.setInterval(() => {
        dispatch(fetchWeather({ lat, long, lang }));
      }, 20 * 60 * 1000); // every 20 minutes
    }

    return () => clearInterval(intervalId);
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

  const errors = [cityError, coordinatesError, weatherError];

  if (errors.join('').length > 0) return <Error errors={errors} />;

  const firstCoordinatesLoading = coordinatesLoading && coordinates === null;
  const firstWeatherLoading = weatherLoading && weather === null;
  const firstLaoding = firstCoordinatesLoading || firstWeatherLoading;

  return (
    <div className='App'>
      <Header
        cityName={cityName}
        handleChange={handleChange}
        cities={cities}
        selectCity={selectCity}
        showAutocomplete={showAutocomplete}
      />

      { firstLaoding && <Loading /> }

      <CurrentWeather weather={weather} />
      <HourlyForecast weather={weather} />
      <DailyForecast weather={weather} />

      <Footer />
    </div>
  );
};

export default App;
