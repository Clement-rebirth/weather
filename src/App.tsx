import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchForecasts } from './features/forecast/forecastSlice';
import { searchCityWithName } from './features/city/citySlice';
import { City } from './types/city';

import Header from './components/Header';

import './App.css';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState(localStorage.getItem('city') ? localStorage.getItem('city') : null);

  const dispatch = useAppDispatch();
  // const { loading, forecasts, error } = useAppSelector(state => state.forecast);
  const {
    loading, selectedCity, cities, error,
  } = useAppSelector(state => state.city);

  // useEffect(() => {
  //   dispatch(fetchForecasts());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log(forecasts);
  // }, [loading, forecasts, error]);

  useEffect(() => {
    console.log(city);
  }, [city]);

  useEffect(() => {
    dispatch(searchCityWithName(cityName));
  }, [cityName, dispatch]);

  const selectCity = (cityToSelect: City) => {
    const cityToSelectName = cityToSelect.nom;
    setCity(cityToSelectName);
    localStorage.setItem('city', cityToSelectName);
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
