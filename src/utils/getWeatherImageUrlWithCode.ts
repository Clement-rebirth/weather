const getWeatherImageUrlWithCode = (code: number, isDay: boolean): string => {
  let imageName = '';

  switch (code) {
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      imageName = 'thunderstorm';
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      imageName = 'rain';
      break;
    case 500:
    case 501:
      imageName = 'rain';
      break;
    case 502:
    case 503:
    case 504:
      imageName = 'heavy-rain';
      break;
    case 511:
      imageName = 'freezing-rain';
      break;
    case 520:
    case 521:
    case 522:
    case 531:
      imageName = 'rain';
      break;
    case 600:
    case 601:
    case 602:
      imageName = 'snow';
      break;
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
      imageName = 'rain-and-snow';
      break;
    case 620:
    case 621:
    case 622:
      imageName = 'snow';
      break;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      imageName = 'mist';
      break;
    case 800:
      imageName = 'clear';
      break;
    case 801:
      imageName = 'scattered-clouds';
      break;
    case 802:
      imageName = 'scattered-clouds';
      break;
    case 803:
      imageName = 'broken-clouds';
      break;
    case 804:
      imageName = 'overcast-clouds';
      break;
    default:
      alert(`Unknown code '${code}'`);
      console.error(`Unknown code '${code}'`);
  }

  imageName += isDay ? '-d' : '-n';

  return `https://firebasestorage.googleapis.com/v0/b/weather-9bf6a.appspot.com/o/weather-images%2F${imageName}.png?alt=media&token=f485660b-06f4-4baf-9bb3-b2b285268cdb`;
};

export default getWeatherImageUrlWithCode;
