import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import LastActivities from "./LastActivities";
import Status from "./Status";
import { useHistory } from "react-router-dom";

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

  timesheet: {
    fontWeight: "600",
    fontSize: "12px",
    textAlign: "left",
    color: "#111827",
  },
  activity: {
    fontWeight: "normal",
    fontSize: "12px",
    textAlign: "left",
    color: "#9ca3af",
  },
  button1: {
    fontWeight: "normal",
    background: "#374151",
    color: "#fff",
    "&:hover": {
      background: "grey",
      color: "white",
    },
  },
  button2: {
    fontWeight: "normal",
    background: "#9ca3af",
    color: "#fff !important",
    opacity: "0.4",
    "&:hover": {
      background: "grey",
      color: "white",
    },
  },
  room: {
    // background: "#374151",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    borderRadius: "1.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2rem",
    width: "fit-content",
    padding: "1.2rem 0.8rem ",
    gap: "0.8rem",
    "& .title": {
      padding: "0",
      lineHeight: "1",
    },
  },
}));
function StaffCard({ data }) {
  const classes = useStyles();
  const history = useHistory();

  const { t } = useTranslation();
  const dcv = data.graTasks.map((e) => e?.timesheets);
  const first = dcv.filter((e) => e.length > 0);
  const timesheetfirst = first[0]?.map((e) => parseInt(e?.startedOn));
  let min = Math.min(...(timesheetfirst || []));
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const hour = addZero(
    new Date(parseInt(data?.activityLogs[0]?.createdAt))?.getHours()
  );
  const minute = addZero(
    new Date(parseInt(data?.activityLogs[0]?.createdAt))?.getMinutes()
  );
  const hourTimeSheet = addZero(new Date(min)?.getHours());
  const minuteTimeSheet = addZero(new Date(min)?.getMinutes());

  const timeStart = new Date(
    parseInt(data?.activityLogs[0]?.createdAt)
  ).getTime();
  const timeEnd = new Date(min).getTime();
  const hourDiff = timeEnd - timeStart; //in ms
  const minDiff = addZero(new Date(hourDiff)?.getMinutes()); //in minutes
  const hDiff = hourDiff / 3600 / 1000; //in hours

  const InProgressData = data.graTasks.filter((e) => e.timesheets.length > 0);
  let item = null;
  if (InProgressData) {
    InProgressData?.map((e) => {
      const test = e.timesheets.find((el) => el.endedOn === null);
      if (test) {
        item = { ...test, roomId: e.room.id };
      }
      return item;
    });
  }
  return (
    <div className="rounded-8 200 border-1  grid grid-cols-1 gap-2 place-content-between bg-white p-4">
      <div className=" flex justify-between gap-2  w-full ">
        <div className="flex flex-nowrap w-full">
          <Avatar
            alt="GRA"
            src="assets/images/avatars/profile-f.jpg"
            className={classes.large}
          />
          <div className=" w-full  p-4">
            <span className={classes.title}>{data.firstName}</span>
            <Typography className={clsx(classes.textDisabled)}>
              GRA - Novatis hotels
            </Typography>
            <div className="flex gap-2 justify-between w-full  pt-4">
              {data?.activityLogs[0] ? (
                <>
                  <span className={clsx(classes.timesheet)}>
                    Heure de connexion: {hour}:{minute}
                  </span>
                  {timesheetfirst?.length > 0 && (
                    <span className={clsx(classes.timesheet)}>
                      Début de travail: {hourTimeSheet}:{minuteTimeSheet} (+
                      {addZero(hDiff.toFixed().toString())}:
                      {addZero((parseInt(minDiff) + 1).toFixed().toString())})
                    </span>
                  )}
                </>
              ) : (
                <span className={clsx(classes.timesheet, "w-full")}>
                  GRA n'est pas encore connecté
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Status
            connected={data?.activityLogs[0]}
            timesheetfirst={timesheetfirst}
            UserId={data.id}
          />
        </div>
      </div>

      <Divider className="ml-2 w-1/2" />
      <div className="p-2">
        <Typography className="p-2">{t("HomeApp:today_tasks")}</Typography>
        <div className="flex flex-wrap gap-4">
          {data.graTasks.length > 0 ? (
            <>
              {data.graTasks.map((e) => (
                <div
                  role="button"
                  className={clsx(
                    classes.room,
                    "border-1 ml-4 text-center text-white  "
                  )}
                  style={
                    e.room.status === 2
                      ? { background: "#039be5" }
                      : e.room.status === 1
                      ? { background: "#374151", opacity: "0.5 " }
                      : { background: "#374151" }
                  }
                >
                  <span className="title">
                    {t("Assign:room") + " " + e?.room?.number}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <Typography className={clsx(classes.activity, "p-4 w-full")}>
              {t("no_data")}
            </Typography>
          )}
        </div>
      </div>
      <Divider className="ml-2 w-1/2" />
      <LastActivities userId={data.id} />

      <Divider className="ml-2 w-1/2" />
      <div className="p-4  flex self-end justify-between gap-8 sm:w-full md:w-full lg:w-full xl:w-4/5">
        <Button
          variant="outlined"
          className={clsx("w-1/2", classes.button1)}
          onClick={() =>
            history.push({
              pathname: "/app/timesheets/",
              state: {
                UserId: data.id,
                Date: new Date(),
              },
            })
          }
        >
          Voir Feuille de temps
        </Button>
        <Button
          variant="outlined"
          disabled={!item}
          className={clsx("w-1/2", !item ? classes.button2 : classes.button1)}
          onClick={() =>
            history.push({
              pathname: `/app/roomDetails/:${item.roomId}`,
              state: {
                roomId: item.roomId,
              },
            })
          }
        >
          Voir chambre active
        </Button>
      </div>
    </div>
  );
}

export default StaffCard;
