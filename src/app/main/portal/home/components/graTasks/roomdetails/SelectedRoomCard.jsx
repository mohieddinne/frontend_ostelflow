import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { ReactComponent as Note } from "../../icon/note.svg";
import { ReactComponent as Vip } from "../../icon/vip.svg";
import { ReactComponent as Out } from "../../icon/out.svg";
import { ReactComponent as In } from "../../icon/in.svg";
import HomeContext from "../../Context";
import EndButton from "./EndButton";
const useStyles = makeStyles(() => ({
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
    borderRadius: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1rem",
    width: "fit-content",
    padding: "1.2rem 1.2rem",
    gap: "0.8rem",
    fontWeight: "bold",
  },
}));
function SelectedRoomCard({ number, roomId, taskId, status, dnd }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    showRoomDetails,
    setShowRoomDetails,
    timeSheetId,

    dateStart,
  } = useContext(HomeContext);
  const [showIcon, setShowIcon] = React.useState(false);
  const onClick = () => setShowIcon(!showIcon);
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
    <div className="rounded-4 200 border-1 p-8 bg-white">
      <div className="flex justify-between">
        <div>
          <div className="flex flex-wrap ">
            <strong className="text-20">
              {t("HomeApp:room") + " " + number}
            </strong>
            <div className={clsx(classes.status, `text-white ml-6  ${bg}`)}>
              {t(`rooms:status.status_${status}`)}
            </div>
          </div>
          <Typography className={clsx(classes.info, "")}>
            Niveau 3 - a droite du SPA
          </Typography>
        </div>
        <div className="flex justify-between">
          {showIcon ? (
            <In fill="green" className="m-4" onClick={onClick} />
          ) : (
            <Out fill="#d1d5db" className="m-4" onClick={onClick} />
          )}

          <Note fill="red" className="m-4" />
          <Vip fill={dnd ? " #fbbf24" : "#d1d5db"} className="m-4" />
        </div>
      </div>
      <Divider className="my-8" />
      <div className="flex justify-between">
        <div className="sm:w-1/2 md:w-1/2 lg:w-1/4 flex justify-between">
          <Button variant="outlined" className="mt-4">
            DND
          </Button>
          <Button variant="outlined" className="mt-4">
            Return later
          </Button>
        </div>
        <EndButton
          roomId={roomId}
          taskId={taskId}
          setShowRoomDetails={setShowRoomDetails}
          showRoomDetails={showRoomDetails}
          timeSheetId={timeSheetId}
          dateStart={dateStart}
        />
      </div>
    </div>
  );
}

export default SelectedRoomCard;
