import React, { useState, useEffect } from "react";
const TaskContext = React.createContext({});

export function TaskContextWrapper(props) {
  const [taskTimers, setTasktimers] = useState(null);
  const [tasks, setdata] = useState(null);
  useEffect(() => {
    setTasktimers(props.taskTimers);
  }, [props]);

  const isActive =
    taskTimers && taskTimers.startedOn !== null && taskTimers.endedOn === null;
  return (
    <TaskContext.Provider
      value={{
        isActive,
        taskTimers,
        setTasktimers,
        tasks,
        setdata,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
