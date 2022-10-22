const formatTime = (date: Date) => {
  const hour = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (minutes.toString().length < 2) minutes = `0${minutes}`;

  return `${hour}h${minutes}`;
};

export default formatTime;
