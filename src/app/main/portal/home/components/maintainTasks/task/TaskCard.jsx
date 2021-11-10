import { TaskContextWrapper } from "./TaskContext";
import TaskUi from "./TaskUi";

function TaskCard(props) {
  const {
    task,

    refetch,

    loading,
  } = props;
  return (
    <TaskContextWrapper
      taskTimers={{
        endedOn:
          task?.timesheets && task?.timesheets.length > 0
            ? task?.timesheets[0]?.endedOn
            : null,
        startedOn:
          task?.timesheets && task?.timesheets.length > 0
            ? task?.timesheets[0]?.startedOn
            : null,
      }}
    >
      <TaskUi
        id={task?.id}
        timesheets={task?.timesheets}
        problem={task?.problem}
        status={task?.status}
        description={task?.description}
        room={task?.room}
        refetch={refetch}
        loading={loading}
        priority={task?.priority}
        user={task?.user}
      />
    </TaskContextWrapper>
  );
}

export default TaskCard;
