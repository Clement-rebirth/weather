const formatDate = (date: Date) => {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();

  if (day.toString().length < 2) day = `0${day}`;
  if (month.toString().length < 2) month = `0${month}`;

  return `${day}/${month}`;
};

export default formatDate;
