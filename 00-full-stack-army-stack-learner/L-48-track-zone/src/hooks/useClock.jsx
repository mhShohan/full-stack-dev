import { useEffect, useState } from "react";
import { addMinutes } from "date-fns";

const init = {
  id: "",
  title: "",
  timezone: { type: "", offset: "" },
  date_utc: null,
  date: null,
};

const TIMEZONE_OFFSET = {
  PST: -7 * 60,
  EST: -4 * 60,
  EDT: -4 * 60,
  BST: -1 * 60,
};

const useClock = (timezone, offset = 0) => {
  const [state, setState] = useState({ ...init });
  const [utc, setUTC] = useState(null);

  useEffect(() => {
    let d = new Date();
    const localOffset = d.getTimezoneOffset();
    d = addMinutes(d, localOffset);
    setUTC(d);
  }, []);

  useEffect(() => {
    if (utc !== null && timezone) {
      offset = TIMEZONE_OFFSET[timezone] || offset;
      const newUTC = addMinutes(utc, offset);
      setState({ ...state, date_utc: utc, date: newUTC });
    } else {
      setState({ ...state, date_utc: utc, date: utc });
    }
  }, [utc]);

  return {
    clock: state,
  };
};

export default useClock;
