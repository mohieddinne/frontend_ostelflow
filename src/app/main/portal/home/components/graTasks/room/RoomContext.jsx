import React, { useState, useEffect } from "react";

const RoomContext = React.createContext({});

export function RoomContextWrapper(props) {
  const [taskTimers, setTasktimers] = useState({
    startedOn: null,
    endedOn: null,
  });
  const [tasks, setdata] = useState(null);
  useEffect(() => {
    setTasktimers(props.taskTimers);
  }, [props]);

  const isActive =
    taskTimers && taskTimers.startedOn !== null && taskTimers.endedOn === null;
  return (
    <RoomContext.Provider
      value={{
        isActive,
        taskTimers,
        setTasktimers,
        tasks,
        setdata,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
}

export default RoomContext;
