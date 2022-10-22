import formatDate from '../utils/formatDate';

interface DateSeparatorProps {
  date: Date;
}

const DateSeparator = ({ date }: DateSeparatorProps) => (
  <div className='date'>
    <p>{ formatDate(date) }</p>
    <div className='separator'></div>
  </div>
);

export default DateSeparator;
