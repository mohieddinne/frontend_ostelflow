import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import DragableRoomItem from "./DragableRoomItem";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "left",
    color: "#111827",
    textTransform: "capitalize",
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  textDisabled: {
    
    fontWeight: "300",
    fontStyle: "italic",
    fontSize: "12px",
    textAlign: "left",
    color: "#9ca3af",
  },
  textCount: {
    
    fontWeight: "bold",
    fontSize: "12px",
    textAlign: "left",
    color: "#000",
  },
  textDesc: {
    
    fontWeight: "normal",
    fontSize: "12px",
    textAlign: "left",
    color: "#9ca3af",
  },
  Disabled: {
    opacity: 0.44,
  },
  count: {
    color: "#000",
    backgroundColor: "#F5F5F5",
  },
  holiday: {
    
    backgroundColor: "#f59e0b",
    textTransform: "uppercase",
  },
}));

function StaffCard(props) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const { data, rooms, setDragableRooms, moveCardHandler, movable } = props;
  const { t } = useTranslation();
  const disabled = !data.active;

  const [, drop] = useDrop({
    accept: "Our first type",
    drop: () => {
      return {
        disabled,
        idGRA: data.id,
        lastName: data.lastName,
        email: data.email,
      };
    },
    canDrop: () => {
      return !disabled;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: disabled,
    }),
  });
  useEffect(() => {
    setCount(rooms.filter((el) => el.assignedTo === data.id).length);
  }, [data.id, rooms]);

  return (
    <div
      className={clsx(
        disabled && classes.Disabled,
        "rounded-8 200 border-1 p-4"
      )}
    >
      <div className="flex justify-between p-8 ">
        <div className="flex flex-wrap ">
          <Avatar
            alt="GRA"
            src="assets/images/avatars/profile-f.jpg"
            className={classes.large}
          />
          <div className="p-8 ml-4 ">
            <span className={classes.title}>{data.lastName}</span>
            <Typography className={clsx(classes.textDisabled)}>
              GRA - Novatis hotels
            </Typography>
          </div>
          {disabled && (
            <div className="p-4">
              <span
                className={clsx(
                  classes.holiday,
                  "rounded-full border-1 text-center p-4 font-bold text-white   "
                )}
              >
                {t("Assign:holiday")}
              </span>
            </div>
          )}
        </div>
        {!disabled && (
          <div className="p-8">
            <p className="rounded-full border-1 text-center p-8 font-600 bg-gray-200 ">
              <span className={clsx(classes.textCount)}>Total: </span>
              <span className={clsx(classes.textCount)}>
                {rooms.filter((el) => el.assignedTo === data.id).length}
              </span>
            </p>
          </div>
        )}
      </div>
      {!disabled && (
        <>
          <Divider variant="middle" className="m-8 font-400" />

          <div className="border-dashed  h-1/2 border-2 border-gray-200 m-4 rounded-2xl ">
            <div
              ref={drop}
              className={clsx(
                classes.bgStaff,
                movable
                  ? "flex flex-wrap gap-2 p-8  h-2/3 "
                  : "opacity-40 flex flex-wrap gap-2 p-8  h-2/3 "
              )}
              style={{
                opacity: disabled ? 0.25 : 1,
              }}
            >
              <>
                {count === 0 ? (
                  <Typography
                    className={clsx(classes.textDisabled, "pt-2 m-8 ")}
                  >
                    {t("Assign:no_room")}
                  </Typography>
                ) : (
                  rooms
                    .filter((el) => el.assignedTo === data.id)
                    .map((room, index) => (
                      <DragableRoomItem
                        room={room}
                        key={room.id}
                        name={data.id}
                        id={room.id}
                        currentColumnName={data.id}
                        setItems={setDragableRooms}
                        index={index}
                        moveCardHandler={moveCardHandler}
                        movable={movable}
                      />
                    ))
                )}
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffCard;
