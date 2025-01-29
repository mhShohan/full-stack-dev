import { useEffect, useState } from 'react';
import { addMinutes } from 'date-fns';

const TIMEZONE_OFFSET = {
  PST: -7 * 60,
  EST: -4 * 60,
  EDT: -4 * 60,
  BST: 1 * 60,
  MST: -6 * 60,
};

const useClock = (timezone, offset) => {
  const [localDate, setLocalDate] = useState(null);
  const [localOffset, setLocalOffset] = useState(0);
  const [localTimezone, setLocalTimezone] = useState('');
  const [utc, setUTC] = useState(null);

  useEffect(() => {
    let d = new Date();
    const lo = d.getTimezoneOffset();
    d = addMinutes(d, lo);
    setUTC(d);
    setLocalOffset(lo);
  }, []);

  useEffect(() => {
    if (utc !== null) {
      if (timezone) {
        offset = TIMEZONE_OFFSET[timezone] ?? offset;
        const newUTC = addMinutes(utc, offset);
        setLocalDate(newUTC);
      } else {
        const newUTC = addMinutes(utc, -localOffset);
        const dateStrArr = newUTC.toUTCString().split(' ');
        setLocalTimezone(dateStrArr[dateStrArr.length - 1]);
        setLocalDate(newUTC);
      }
    }
  }, [utc, timezone, offset]);

  return {
    date: localDate,
    dateUTC: utc,
    offset: offset || -localOffset,
    timezone: timezone || localTimezone,
  };
};

export default useClock;
