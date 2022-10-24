import { Weather } from '../types/weather';

import DayForecast from './DayForecast';

interface DailyForecastProps {
  weather: Weather | null;
}

const DailyForecast = ({ weather }: DailyForecastProps) => (
  <div className='daily'>
    <p>Prévisions météo pour les 7 prochains jours</p>
    {/* the first element is the current weather and it's already displayed */}
    { weather && weather.daily.slice(1).map((dayWeather, index) => (
      <DayForecast key={index} weather={dayWeather} />
    ))}
  </div>
);

export default DailyForecast;
