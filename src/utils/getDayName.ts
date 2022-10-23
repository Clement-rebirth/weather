const getDayName = (date: Date) => {
  let dayName = '';

  switch (date.getDay()) {
    case 0:
      dayName = 'Dimanche';
      break;
    case 1:
      dayName = 'Lundi';
      break;
    case 2:
      dayName = 'Mardi';
      break;
    case 3:
      dayName = 'Mercredi';
      break;
    case 4:
      dayName = 'Jeudi';
      break;
    case 5:
      dayName = 'Vendredi';
      break;
    case 6:
      dayName = 'Samedi';
      break;
    default:
      throw new Error('Invalid day number');
  }

  return dayName;
};

export default getDayName;
