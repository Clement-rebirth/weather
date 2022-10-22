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
      imageName = 't04';
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
      imageName = 'r01';
      break;
    case 500:
    case 501:
    case 502:
      imageName = 'r05';
      break;
    case 503:
    case 504:
      imageName = 'r03';
      break;
    case 511:
      imageName = 'f01';
      break;
    case 520:
    case 521:
    case 522:
    case 531:
      imageName = 'r01';
      break;
    case 600:
    case 601:
    case 602:
      imageName = 's01';
      break;
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
      imageName = 's02';
      break;
    case 620:
    case 621:
    case 622:
      imageName = 's01';
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
      imageName = 'a01';
      break;
    case 800:
      imageName = 'c01';
      break;
    case 801:
      imageName = 'c02';
      break;
    case 802:
      imageName = 'c02';
      break;
    case 803:
      imageName = 'c03';
      break;
    case 804:
      imageName = 'c04';
      break;
    default:
      alert(`Unknown code '${code}'`);
      console.error(`Unknown code '${code}'`);
  }

  imageName += isDay ? 'd' : 'n';

  return `https://firebasestorage.googleapis.com/v0/b/weather-9bf6a.appspot.com/o/weather-images%2F${imageName}.png?alt=media&token=f485660b-06f4-4baf-9bb3-b2b285268cdb`;
};

export default getWeatherImageUrlWithCode;
