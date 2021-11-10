import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { ReactComponent as Room } from "../../../icon/room.svg";
import { ReactComponent as Note } from "../../../icon/note.svg";
import { ReactComponent as Vip } from "../../../icon/vip.svg";
import { makeStyles } from "@material-ui/styles";
import Collapse from "@material-ui/core/Collapse";
import DndButton from "../../graTasks/room/DndButton";
import TimeButton from "./TimeButton";
import InChargeButton from "./InChargeButton";

import { useTranslation } from "react-i18next";
import RetrunButton from "./RetrunButton";
const useStyles = makeStyles(() => ({
  title: {
    
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: " #111827",
  },
  retrunButton: {
    "@media screen and (min-width: 600px)": {
      fontSize: "12px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "14px",
    },
  },
  info: {
    
    fontWeight: "normal",
    // fontSize: "14px",
    textAlign: "left",
    color: "#6b7280",
  },
  status: {
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2rem",
    width: "fit-content",
    gap: "0.8rem",
    textTransform: "uppercase",
    borderRadius: "10rem",

    fontWeight: "900",
    letterSpacing: "1px",
    "@media screen and (min-width: 600px)": {
      fontSize: "0.7rem",
      padding: "0.4rem 0.4rem 0.3rem 0.4rem",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "1rem",
      padding: "0.8rem 0.7rem 0.6rem 0.7rem",
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
function TaskUi({
  problem,
  room,
  status,
  priority,
  id,
  user,
  refetch,
  timesheets,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [inCharge, setInCharge] = React.useState(true);
  let bg = "bg-red";
  switch (status) {
    case 1:
      bg = "bg-green";
      break;
    case 2:
      bg = "bg-green";
      break;
    case 3:
      bg = "bg-red";
      break;
    case 4:
      bg = "bg-blue";
      break;
    default:
      bg = "bg-blue";
      break;
  }
  let fill = "";

  if (room) {
    fill = "black";
  } else {
    fill = "#f3f4f6";
  }
  return (
    <div
      className="rounded-lg 200  p-8  bg-white border-2"
      style={
        priority === 1 && status !== 2
          ? { borderColor: "red" }
          : status === 1
          ? { borderColor: "green" }
          : {
              transition: "background-color 0.3s ease",
              // borderColor: bg.slice(3),
            }
      }
    >
      <div
        className="flex justify-between"
        role="button"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap w-full">
          <div>
            <div className="flex flex-wrap  ">
              <strong className="sm:text-13 md:text-15">
                {!problem
                  ? t("loading")
                  : t(`maintainTasks:problemType.problem${problem}`)}
              </strong>

              <span className={clsx(classes.status, `text-white ml-6 ${bg}`)}>
                {!status ? t("loading") : t(`HomeApp:status.status${status}`)}
              </span>
              {priority === 1 && status !== 2 && (
                <div className={clsx(classes.status, `text-white ml-6 bg-red`)}>
                  {t(`HomeApp:priority`)}
                </div>
              )}
            </div>
            <Typography className={clsx(classes.info, "sm:text-10 md:text-13")}>
              {t("HomeApp:room")} {room?.number} - Niveau 3
            </Typography>
          </div>
        </div>
        <div className="flex justify-between w-1/4 ">
          <Room fill={fill} className=" " />
          <Note fill="red" className=" sm:ml-2" />
          <Vip fill=" #fbbf24" className=" sm:ml-2 " />
        </div>
      </div>
      <Collapse in={open} timeout="auto ">
        <div className="flex  justify-between mt-20">
          {inCharge && !user && status !== 3 ? (
            <InChargeButton
              setInCharge={setInCharge}
              id={id}
              refetch={refetch}
            />
          ) : (
            <TimeButton taskId={id} IdRoom={room?.id} />
          )}
          <div className="flex  gap-4 justify-end">
            <DndButton
              taskId={id}
              roomId={room?.id}
              isDnd={room?.dnd}
              refetch={refetch}
              maintain={"maintain"}
              disabled={!room || room?.dnd === true}
              timesheets={timesheets}
            />
            <RetrunButton
              taskId={id}
              refetch={refetch}
              priority={priority}
              timesheets={timesheets}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default TaskUi;
