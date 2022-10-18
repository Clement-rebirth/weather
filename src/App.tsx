import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchForecasts } from './features/forecast/forecastSlice';
import { searchCityWithName } from './features/city/citySlice';
import { City } from './types/city';
import { fetchCoordinates } from './features/coordinate/coordinateSlice';

import Header from './components/Header';

import './App.css';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState<City | null>(null);

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
    dispatch(searchCityWithName(cityName));
  }, [cityName, dispatch]);

  const selectCity = (cityToSelect: City) => {
    setCity(cityToSelect);
    localStorage.setItem('city', JSON.stringify(cityToSelect));
  };

  return (
    <div className='App'>
      <Header
        cityName={cityName}
        handleChange={e => setCityName(e.target.value)}
        cities={cities}
        selectCity={selectCity}
      />
    </div>
  );
};

export default App;
