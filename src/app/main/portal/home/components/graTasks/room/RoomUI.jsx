import React, { useContext } from "react";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as Out } from "../../../icon/out.svg";
import { ReactComponent as In } from "../../../icon/in.svg";
import { Icon } from "@material-ui/core";

import { ReactComponent as Note } from "../../../icon/note.svg";
import { ReactComponent as Vip } from "../../../icon/vip.svg";

import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";

import DndButton from "./DndButton";
import CleanedButton from "./CleanedButton";
import TimeButton from "./TimeButton";
import RoomContext from "./RoomContext";
import RetrunButton from "./RetrunButton";
const useStyles = makeStyles(() => ({
  retrunButton: {
    "@media screen and (min-width: 600px)": {
      fontSize: "12px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "14px",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: " #111827",
  },
  info: {
    fontWeight: "normal",
    fontSize: "14px",
    textAlign: "left",
    color: "#6b7280",
  },
  status: {
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1rem",
    width: "fit-content",
    gap: "0.8rem",
    textTransform: "uppercase",
    borderRadius: "10rem",
    // fontSize: "1rem",
    // padding: "1.1rem 1rem 0.9rem 1rem",
    fontWeight: "900",
    letterSpacing: "1px",
    "@media screen and (min-width: 600px)": {
      fontSize: "0.9rem",
      padding: "0.8rem 0.7rem 0.6rem 0.7rem",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "1rem",
      padding: "1.1rem 1rem 0.9rem 1rem",
    },
  },
  btnStart: {
    width: "131px",
    height: "33px",
    borderRadius: "4px",
    background: " #059669",

    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#fff",
    padding: "0.6rem 0.8rem",
  },
}));

function RoomCard({
  room,
  taskId,
  firstOfList,
  taskTimers: propsTaskTimers,
  refetch,
  priority,
  todos,
  openActiveRoom,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { number, id, status, dnd } = room;

  const { isActive } = useContext(RoomContext);

  const [open, setOpen] = React.useState(
    firstOfList || isActive || openActiveRoom
  );

  let bg = "bg-red";

  switch (status) {
    case 1:
      bg = "bg-green";
      break;
    case 2:
      bg = "bg-orange";
      break;
    case 3:
      bg = "bg-red";
      break;
    case 4:
      bg = "bg-grey";
      break;
    default:
      bg = "bg-grey";
      break;
  }
  return (
    <div
      disabled={openActiveRoom}
      role="button"
      onClick={() => setOpen(!open)}
      className={
        isActive
          ? "rounded-lg 200 border-1 p-8  shadow-md	 bg-white"
          : "rounded-lg 200 border-1 p-8  bg-white"
      }
      style={
        priority === 1
          ? { borderColor: "red", transition: "background-color 0.3s ease" }
          : {
              transition: "background-color 0.3s ease",
              // borderColor: bg.slice(3),
            }
      }
    >
      <div className="flex justify-between">
        <div className="flex flex-wrap w-2/3">
          <div>
            <div className="flex flex-wrap ">
              <strong className="sm:text-15 md:text-17">
                {!number ? t("loading") : t("HomeApp:room") + " " + number}
              </strong>
              <div className={clsx(classes.status, `text-white ml-6  ${bg}`)}>
                {!status ? t("loading") : t(`rooms:status.status_${status}`)}
              </div>
              {priority === 1 && (
                <div className={clsx(classes.status, `text-white ml-1 bg-red`)}>
                  {t(`HomeApp:priority`)}
                </div>
              )}
            </div>
            <Typography className={clsx(classes.info, "")}>
              Niveau 3 - a droite du SPA
            </Typography>
          </div>
        </div>
        <div className="flex justify-between">
          {true ? (
            <In fill="#D1D5DB" className="m-4" />
          ) : (
            <Out fill="#D1D5DB" className="m-4" />
          )}
          <Note fill="red" className="m-4" />
          <Vip fill={dnd ? " #fbbf24" : "#d1d5db"} className="m-4" />
        </div>
      </div>
      <div className="flex justify-center focus:border-blue-200">
        {isActive && (
          <>
            {!open ? (
              <Icon
                color="default"
                autoFocus
                variant="contained"
                disableElevation
              >
                unfold_more
              </Icon>
            ) : (
              <Icon
                color="default"
                autoFocus
                variant="contained"
                disableElevation
              >
                unfold_less
              </Icon>
            )}
          </>
        )}
        {/* unfold_less */}
      </div>

      <Collapse in={open} timeout="auto">
        <Divider className="my-8" />
        <div className="flex justify-between ">
          <TimeButton
            taskId={taskId}
            disabled={status === 2 || openActiveRoom}
            IdRoom={id}
            // setOpen={setOpen}
            refetch={refetch}
          />
          <div className="flex  gap-4 justify-end">
            <CleanedButton
              taskId={taskId}
              status={status}
              dnd={dnd}
              roomId={id}
              refetch={refetch}
              cleaned
              disabled={openActiveRoom}
              isActive={isActive}
            />
            <DndButton
              taskId={taskId}
              roomId={id}
              isDnd={dnd}
              disabled={status !== 3 || openActiveRoom}
              refetch={refetch}
              gra={"gra"}
            />
            <RetrunButton
              taskId={taskId}
              refetch={refetch}
              priority={priority}
              gra={"gra"}
              disabled={openActiveRoom}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default RoomCard;
