import React from "react";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import RoomCard from "../../components/graTasks/room/RoomCard";
import Guests from "../graTasks/roomdetails/Guests";
import Note from "../graTasks/roomdetails/Note";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import Indicator from "../indicator/Indicator";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: "#202020",
  },
}));
const TASKS_QUERY = gql`
  query graTasks($ids: [ID], $filters: GRA_TaskFilter) {
    graTasks(ids: $ids, filters: $filters) {
      id
      priority
      description
      timesheets(active: true) {
        id
        endedOn
        startedOn
      }
      room {
        id
        number
        status
        dnd
      }
      todos {
        id
        icon
        name
        checkedOn
        checkedBy
      }
    }
  }
`;
function DetailsRoomActive() {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const roomId = location.state.roomId;
  const date = new Date();
  const day = date.toJSON().slice(0, 10);
  const filters = { date: day };

  const { loading, data } = useQuery(TASKS_QUERY, {
    variables: { ids: [parseInt(roomId)], filters },
    fetchPolicy: "no-cache",
  });

  const timesheetsActive =
    data?.graTasks[data?.graTasks.length - 1]?.timesheets;
  console.log({ timesheetsActive });

  React.useEffect(() => {
    if (timesheetsActive && timesheetsActive.length === 0) {
      <Redirect to="/app/home" />;
    }
  }, [timesheetsActive]);
  return (
    <div className="flex items-start gap-10 w-full pt-32 p-16">
      <Indicator />
      <div className="overflow-y-auto w-2/3 gap-16 ">
        <Typography className={classes.title}>
          {t("HomeApp:room_details")}
        </Typography>
        <div className="grid grid-cols-1 gap-16 mt-16">
          <RoomCard
            timesheets={data?.graTasks[data?.graTasks.length - 1]?.timesheets}
            room={data?.graTasks[0]?.room}
            taskId={data?.graTasks[0]?.id}
            openActiveRoom={true}
          />
          {loading ? (
            <div className="flex  flex-1 flex-col items-center justify-center h-full p-32">
              <Typography className="text-20 mb-16" color="textSecondary">
                {t("loading")}
              </Typography>
              <LinearProgress className="w-xs" color="secondary" />
            </div>
          ) : (
            <div className="flex gap-10 w-full  ">
              <div className="grid grid-cols-1  sm:gap-8 md:gap-12 lg:gap-16 w-full">
                <Guests />
                <Note todos={data?.graTasks[0]?.todos} openActiveRoom={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsRoomActive;
