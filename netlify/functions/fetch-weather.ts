import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async event => {
  if (!event.queryStringParameters) throw new Error('Missing query parameters');
  const { lat, long, lang } = event.queryStringParameters;
  const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

  // forecast for 5 days with 3 hours step
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&appid=${OPEN_WEATHER_API_KEY}&lang=${lang}&units=metric`;

  try {
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // check if the error was thrown from axios
    if (axios.isAxiosError(error)) {
      const { status, message, code } = error;

      if (!status) {
        throw new Error('No status returned');
      }

      return {
        statusCode: status,
        body: JSON.stringify({ status, message, code }),
      };
    }

    const status = 500;
    const message = 'Not axios error';

    return {
      statusCode: status,
      body: JSON.stringify({ status, message }),
    };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handler };
