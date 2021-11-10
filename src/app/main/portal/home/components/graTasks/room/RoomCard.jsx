import { RoomContextWrapper } from "./RoomContext";
import RoomUI from "./RoomUI";

function RoomCard(props) {
  const {
    timesheets,
    room,
    taskId,
    firstOfList,
    refetch,
    loading,
    priority,
    todos,
    openActiveRoom,
  } = props;
  return (
    <RoomContextWrapper
      taskTimers={{
        endedOn:
          timesheets && timesheets.length > 0 ? timesheets[0]?.endedOn : null,
        startedOn:
          timesheets && timesheets.length > 0 ? timesheets[0]?.startedOn : null,
      }}
    >
      <RoomUI
        room={room || []}
        taskId={taskId}
        firstOfList={firstOfList}
        key={taskId}
        refetch={refetch}
        loading={loading}
        priority={priority}
        todos={todos}
        openActiveRoom={openActiveRoom}
      />
    </RoomContextWrapper>
  );
}

export default RoomCard;
