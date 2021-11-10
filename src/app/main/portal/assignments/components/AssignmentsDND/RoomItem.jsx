import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import StarIcon from "@material-ui/icons/Star";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import ModeEditOutlinedIcon from "@material-ui/icons/EditOutlined";
import clsx from "clsx";
import * as MainActions from "app/store/actions";
import { useDispatch } from "react-redux";
import TodoForm from "./TodoForm";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    background: "#374151",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    borderRadius: "1.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "3rem",
    width: "fit-content",
    padding: "1.6rem 1.2rem",
    gap: "0.8rem",
    "& .title": {
      padding: "0",
      lineHeight: "1",
    },
    "& .btns": {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
    },
    "& .icon": {
      "--size": "2rem",
      height: "var(--size)",
      width: "var(--size)",
      display: "inline-flex",
      justifyContent: "center",
      borderRadius: "100%",
      "& > svg": {
        "--padding": "0.2rem",
        height: "clac( var(--size) - var(--padding))",
        width: "clac( var(--size) - var(--padding))",
        padding: "var(--padding)",
      },
    },
  },
  canDelete: {
    "& .hover-hide": {
      display: "inline-flex !important",
    },
    "&:hover": {
      "& .delete-icon": {
        background: "white",
        color: "rgba(244, 67, 54)",
      },
      "& .edit-icon": {
        background: "white",
        color: "#f59e0b",
      },
    },
    "& .delete-icon": {
      transition: "background-color 0.3s ease, color 0.3s ease",
      background: "rgba(244, 67, 54)",
      color: "white",
    },
    "& .edit-icon": {
      transition: "background-color 0.3s ease, color 0.3s ease",
      background: "#f59e0b",
      color: "white",
    },
  },
}));

function RoomItem({ room, changeItemColumn, name, movable }) {
  let tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  tommorow = tommorow.toISOString().slice(0, 10);
  const AssignRoom = room.graTasks.filter(
    (el) =>
      new Date(parseInt(el?.assignedOn)).toISOString().slice(0, 10) === tommorow
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const date = location.state.date;

  const handleClick = (e) => {
    e.stopPropagation();

    dispatch(
      MainActions.openDialog({
        fullWidth: true,
        maxWidth: "lg",
        title: t("Assign:create_todo"),
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        content: (
          <>
            <TodoForm room={room} AssignRoom={AssignRoom} date={date} />
          </>
        ),
      })
    );
  };

  const classes = useStyles();
  const { t } = useTranslation();
  const canRemoveIcon = name !== "rooms";
  const onClickIcon = () => {
    if (movable === false) {
      changeItemColumn(room, name);
    } else changeItemColumn(room, "rooms");
  };
  return (
    <div
      role="button"
      className={clsx(classes.root, "border-1 text-center text-white ", {
        [classes.canDelete]: canRemoveIcon,
      })}
    >
      <span className="title">{t("Assign:room") + " " + room?.number}</span>
      <span className="btns">
        {room?.dnd && (
          <span className="icon hover-hide bg-yellow-800">
            <StarIcon />
          </span>
        )}
        {canRemoveIcon && (
          <>
            {AssignRoom.length > 0 ? (
              <span className="icon edit-icon hover-show">
                <ModeEditOutlinedIcon onClick={handleClick} />{" "}
              </span>
            ) : (
              ""
            )}
            <span className="icon delete-icon hover-show">
              <ClearOutlinedIcon
                onClick={onClickIcon}
                disabled={
                  !(name === "rooms") && canRemoveIcon && movable === false
                }
              />
            </span>
          </>
        )}
      </span>
    </div>
  );
}

export default RoomItem;
