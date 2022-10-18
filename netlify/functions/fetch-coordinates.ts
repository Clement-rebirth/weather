import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async event => {
  if (!event.queryStringParameters) throw new Error('Missing query parameters');
  const { cityName, region } = event.queryStringParameters;
  const POSITION_STACK_API_KEY = process.env.POSITION_STACK_API_KEY;

  // forecast for 5 days with 3 hours step
  const url = `http://api.positionstack.com/v1/forward?access_key=${POSITION_STACK_API_KEY}&query=${cityName}&region=${region}`;

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
