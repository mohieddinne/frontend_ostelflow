// import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DragableRoomItem from "./DragableRoomItem";
import { useDrop } from "react-dnd";
// import SortIcon from "@material-ui/icons/Sort";
// import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  title: {
    
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: "#111827",
  },
  textDisabled: {
    
    fontWeight: "300",
    fontStyle: "italic",
    fontSize: "14px",
    textAlign: "left",
    color: "#9ca3af",
  },
}));

function RoomList({
  rooms,
  setDragableRooms,
  moveCardHandler,
  date,
  tomorrow,
  movable,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  // const [roomList, setroomList] = useState(rooms);
  // useEffect(() => {
  //   if (Array.isArray(rooms)) {
  //     setroomList(rooms);
  //   }
  // }, [rooms]);
  const [, drop] = useDrop({
    accept: "Our first type",
    drop: () => {
      return { name: "rooms" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // const sortByRoomNumber = () => {
  //   const sorted = [...rooms].sort((a, b) => {
  //     return b.number - a.number;
  //   });
  //   setroomList(sorted);
  // };
  return (
    <div ref={drop} className="w-full p-8 rounded-8  border-1 h-full  ">
      <div className="flex justify-between p-8">
        <span className={classes.title}>{t("Assign:room_list")}</span>

        {/* <Tooltip title={t("Assign:sort_by_number")}>
          <SortIcon onClick={sortByRoomNumber} />
        </Tooltip> */}
      </div>

      {date !== tomorrow ? (
        <div className="flex flex-wrap gap-2  opacity-60">
          {rooms.length !== 0 ? (
            rooms
              .filter((el) => !el.assignedTo)
              .map((room, index) => (
                <DragableRoomItem
                  room={room}
                  key={room.id}
                  name="rooms"
                  id={room.id}
                  currentColumnName={"rooms"}
                  setItems={setDragableRooms}
                  index={index}
                  moveCardHandler={moveCardHandler}
                  movable={movable}
                />
              ))
          ) : (
            <Typography className={clsx(classes.textDisabled, "pt-2 m-8 ")}>
              {t("Assign:No_rooms_ready_to_be_assigned")}
            </Typography>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2  ">
          {rooms
            .filter((el) => !el.assignedTo)
            .map((room, index) => (
              <DragableRoomItem
                room={room}
                key={room.id}
                name="rooms"
                id={room.id}
                currentColumnName={"rooms"}
                setItems={setDragableRooms}
                index={index}
                moveCardHandler={moveCardHandler}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default RoomList;
