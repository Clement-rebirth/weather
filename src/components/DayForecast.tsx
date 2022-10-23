import { DayWeather } from '../types/weather';
import getDayName from '../utils/getDayName';
import getWeatherImageUrlWithCode from '../utils/getWeatherImageUrlWithCode';
import roundToNearestTen from '../utils/roundToNearestTen';

interface DayForecastProps {
  weather: DayWeather;
}

const DayForecast = ({ weather }: DayForecastProps) => {
  const currentDate = new Date();
  const forecastDate = new Date(weather.dt * 1000);
  const precipitationProb = roundToNearestTen(weather.pop * 100);
  const tempMin = Math.round(weather.temp.min);
  const tempMax = Math.round(weather.temp.max);
  let description = '';
  let weatherImageUrl = '';

  if (weather.weather[0]) {
    const { id, icon } = weather.weather[0];
    weatherImageUrl = getWeatherImageUrlWithCode(id, icon.includes('d'));
    description = weather.weather[0].description;
  }

  let dayName = getDayName(forecastDate);

  if (currentDate.getDate() + 1 === forecastDate.getDate()) {
    dayName = 'Demain';
  }

  return (
    <div className='day'>
      <div className='left'>
        <p>{ dayName } { forecastDate.getDate() }</p>
        <div className='img-container'>
          <img src={weatherImageUrl} alt={description} />
          <p>{ precipitationProb >= 10 ? `${precipitationProb} %` : '' }</p>
        </div>
      </div>
      <div className='right'>
        <p>{ tempMin }° / { tempMax }°</p>
      </div>
    </div>
  );
};

export default DayForecast;
