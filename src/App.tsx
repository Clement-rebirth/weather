import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchForecasts } from './features/forecast/forecastSlice';
import { searchCityByName } from './features/city/citySlice';
import { City } from './types/city';
import { fetchCoordinates } from './features/coordinate/coordinateSlice';

import Header from './components/Header';

import './App.css';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const dispatch = useAppDispatch();

  const { forecasts } = useAppSelector(state => state.forecast);
  const { cities } = useAppSelector(state => state.city);
  const { coordinates } = useAppSelector(state => state.coordinate);

  useEffect(() => {
    console.log(forecasts);
  }, [forecasts]);

  useEffect(() => {
    if (localStorage.getItem('city')) {
      const cityObj = JSON.parse(localStorage.getItem('city') || '{}') as City;
      setCity(cityObj);
      setCityName(cityObj.nom);
      setShowAutocomplete(false);
    }
  }, []);

  useEffect(() => {
    if (coordinates && coordinates[0]) {
      dispatch(fetchForecasts({
        lat: coordinates[0].latitude,
        long: coordinates[0].longitude,
        lang: 'fr',
      }));
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
    </div>
  );
};

export default App;
