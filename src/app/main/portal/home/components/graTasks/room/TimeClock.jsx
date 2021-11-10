import { useState, useEffect, useContext } from "react";
import RoomContext from "./RoomContext";

function Timer() {
  const [time, setTime] = useState(0);
  const { taskTimers } = useContext(RoomContext);

  const start = taskTimers?.startedOn;

  useEffect(() => {
    let t = 0;
    if (start) {
      const td = new Date(),
        sd = new Date(parseInt(start));
      // Devise it on 1000 for seconds
      t = (td.getTime() - sd.getTime()) / 1000;
    }
    setTime(t);
  }, [start]);

  useEffect(() => {
    const timer = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const formatedTime = new Date(time * 1000).toISOString().substr(14, 5);

  return formatedTime + " | ";
}

export default Timer;
