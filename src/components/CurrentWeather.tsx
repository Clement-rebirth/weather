import { Weather } from '../types/weather';
import firstLetterUppercase from '../utils/firstLetterUppercase';
import getWeatherClassName from '../utils/getWeatherClassName';
import getWeatherImageUrlWithCode from '../utils/getWeatherImageUrlWithCode';

interface CurrentWeatherProps {
  weather: Weather | null;
}

const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  let weatherImageUrl = '';
  let temp = '--';
  let feelsLike = '--';
  let tempMin = '--';
  let tempMax = '--';
  let description = '';
  let windSpeed = '--';
  let humidity = '--';
  let sunrise = '--:--';
  let sunset = '--:--';

  if (weather && weather.daily[0] && weather.current.weather[0]) {
    const { id, icon } = weather.current.weather[0];

    const weatherClassName = getWeatherClassName(id, icon.includes('n'));
    document.body.className = weatherClassName;

    weatherImageUrl = getWeatherImageUrlWithCode(id, icon.includes('d'));
    temp = Math.round(weather.current.temp).toString();
    feelsLike = Math.round(weather.current.feels_like).toString();
    tempMin = Math.round(weather.daily[0].temp.min).toString();
    tempMax = Math.round(weather.daily[0].temp.max).toString();
    description = firstLetterUppercase(weather.current.weather[0].description);
    windSpeed = Math.round(weather.current.wind_speed * 3.6).toString();
    humidity = weather.current.humidity.toString();

    const sunriseDate = new Date(weather.current.sunrise * 1000);
    const sunsetDate = new Date(weather.current.sunset * 1000);
    sunrise = `${sunriseDate.getHours()}h${sunriseDate.getMinutes()}`;
    sunset = `${sunsetDate.getHours()}h${sunsetDate.getMinutes()}`;
  }

  return (
    <div className='current-weather'>
      <div className='top'>
        <div className='left'>
          <p className='temp'>{ temp }°C</p>
          <p className='feels-like'>Ressenti { feelsLike }°</p>
          <p className='min-max-temp'>min: { tempMin }° / max: { tempMax }°</p>
        </div>
        <div className='right'>
          <img src={weatherImageUrl} alt={description} />
          <p>{ description }</p>
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
          <p>Vent: { windSpeed }km/h</p>
          <p>Humidité: { humidity }%</p>
        </div>
        <div className='right'>
          <p>Lever du soleil: { sunrise }</p>
          <p>Coucher du soleil: { sunset }</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
