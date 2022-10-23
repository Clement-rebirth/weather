import { Fragment } from 'react';
import { HourWeather as HourWeatherSchema, Weather } from '../types/weather';

import DateSeparator from './DateSeparator';
import HourForecast from './HourForecast';

interface HourlyForecastProps {
  weather: Weather | null;
}

const HourlyForecast = ({ weather }: HourlyForecastProps) => {
  const showCurrentDate = (
    hourWeather: HourWeatherSchema,
    index: number,
    hourlyArray: HourWeatherSchema[],
  ) => {
    const currentDate = new Date(hourWeather.dt * 1000);
    let showDate = false;

    if (index > 0) {
      // hourlyArray[index - 1] always exists since we're in a if index is > 0 so i use '!'
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const previousDate = new Date(hourlyArray[index - 1]!.dt * 1000);

      if (currentDate.getDay() !== previousDate.getDay()) {
        showDate = true;
      }
    }

    return showDate;
  };

  return (
    <div className='hourly'>
      <p>La méteo heure par heure</p>
      <div className='hourly-container'>
        { weather && weather.hourly.map((hourWeather, index, hourlyArray) => {
          const showDate = showCurrentDate(hourWeather, index, hourlyArray);
          const currentDate = new Date(hourWeather.dt * 1000);

          return (
            <Fragment key={index}>
              { showDate && <DateSeparator date={currentDate} /> }
              <HourForecast weather={hourWeather} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
