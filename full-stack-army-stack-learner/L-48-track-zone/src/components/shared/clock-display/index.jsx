import { format } from 'date-fns';

const ClockDisplay = ({ date, title, timezone, offset }) => {
  const offsetHr = offset / 60;

  return (
    <div>
      <h1>{title}</h1>
      <h1>{format(date, "yyyy-MM-dd hh:mm:ss aaaaa'm'")}</h1>
      <p>
        {timezone} {offsetHr > 0 ? `+${Math.abs(offsetHr)}` : `-${Math.abs(offsetHr)}`}
      </p>
    </div>
  );
};

export default ClockDisplay;
