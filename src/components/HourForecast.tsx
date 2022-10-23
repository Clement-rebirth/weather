import { HourWeather } from '../types/weather';
import firstLetterUppercase from '../utils/firstLetterUppercase';
import formatTime from '../utils/formatTime';
import getWeatherImageUrlWithCode from '../utils/getWeatherImageUrlWithCode';
import roundToNearestTen from '../utils/roundToNearestTen';

interface HourForecastProps {
  weather: HourWeather;
}

const HourForecast = ({ weather }: HourForecastProps) => {
  let weatherImageUrl = '';
  let description = '';

  if (weather.weather[0]) {
    const { id, icon } = weather.weather[0];
    weatherImageUrl = getWeatherImageUrlWithCode(id, icon.includes('d'));
    description = firstLetterUppercase(weather.weather[0].description);
  }

  const precipitationProb = roundToNearestTen(weather.pop * 100);
  const date = new Date(weather.dt * 1000);
  const temp = Math.round(weather.temp);

  return (
    <div className='hour'>
      <p>{ formatTime(date) }</p>
      <img src={weatherImageUrl} alt={description} />
      <p>{ precipitationProb >= 10 ? `${precipitationProb} %` : '' }</p>
      <p>{ temp }°</p>
    </div>
  );
};

export default HourForecast;
