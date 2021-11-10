import React, { useEffect } from "react";
import StaffCard from "./StaffCard";
import RoomList from "./RoomList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/action";

function AssignmentLayout(props) {
  const { rooms, staff, setDragableRooms, date, tomorrow, tasks } = props;
  const dispatch = useDispatch();
  const cUser = useSelector(({ auth }) => auth?.user?.data?.level?.id);
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = rooms[dragIndex];
    if (dragItem) {
      setDragableRooms((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const FormattedData = rooms
    .filter((el) => {
      return el.assignedTo != null;
    })
    .map((e) => {
      const t = {
        roomId: e.id,
        user: { id: e.assignedTo, lastName: e.lastName, email: e.email },
        createdBy: cUser,
        assignedOn: new Date(tomorrow),
      };

      return t;
    });

  useEffect(() => {
    dispatch(Actions.setRooms(FormattedData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rooms]);

  const sortedListStaff = [...staff].sort((a, b) => {
    return b.active - a.active;
  });
  return (
    <div className="flex gap-10 w-full p-8">
      <DndProvider backend={HTML5Backend}>
        <div className="w-1/3    top-0 ">
          <RoomList
            date={date}
            tomorrow={tomorrow}
            rooms={rooms}
            setDragableRooms={setDragableRooms}
            moveCardHandler={moveCardHandler}
            movable={tomorrow === date}
          />
        </div>
        <div className="overflow-y-auto   w-2/3 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16">
          {sortedListStaff
            .filter((e) => e?.role?.id === 2)
            .map((staff) => (
              <StaffCard
                data={staff}
                tasks={tasks}
                rooms={rooms}
                movable={tomorrow === date}
                moveCardHandler={moveCardHandler}
                setDragableRooms={setDragableRooms}
              />
            ))}
        </div>
      </DndProvider>
    </div>
  );
}

export default AssignmentLayout;
