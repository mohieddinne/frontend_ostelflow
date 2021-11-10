import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import HomeContext from "../../Context";
import RoomCard from "../room/RoomCard";
import Guests from "./Guests";
import Note from "./Note";
import Issues from "./Issues";

const TASKS_QUERY = gql`
  query graTasks($ids: [ID], $filters: GRA_TaskFilter) {
    graTasks(ids: $ids, filters: $filters) {
      id
      priority
      description
      note
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
const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: "#202020",
  },
}));
function RoomsDetails() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { IdRoom } = useContext(HomeContext);
  const date = new Date();
  const day = date.toJSON().slice(0, 10);
  const filters = { date: day };

  const { loading, data } = useQuery(TASKS_QUERY, {
    variables: { ids: [IdRoom], filters },
    fetchPolicy: "no-cache",
  });
  return (
    <div className="overflow-y-auto w-2/3 gap-16 ">
      <Typography className={classes.title}>
        {t("HomeApp:today_tasks")}
      </Typography>
      <div className="grid grid-cols-1 sm:gap-8 md:gap-12 lg:gap-16  sm:mt-8 md:mt-12 lg:mt-16 ">
        <RoomCard
          timesheets={data?.graTasks[data?.graTasks.length - 1]?.timesheets}
          room={data?.graTasks[0]?.room}
          taskId={data?.graTasks[0]?.id}
        />
        {loading ? (
          <div className="flex  flex-1 flex-col items-center justify-center h-full p-32">
            <Typography className="text-20 mb-16" color="textSecondary">
              {t("loading")}
            </Typography>
            <LinearProgress className="w-xs" color="secondary" />
          </div>
        ) : (
          <div className="flex  sm:gap-2 md:gap-4 lg:gap-8  w-full  ">
            <div className="grid grid-cols-1  sm:gap-8 md:gap-12 lg:gap-16 w-2/3">
              <Note todos={data?.graTasks[0]?.todos} note={data?.graTasks[0]?.note} />
            </div>
            <div className="grid grid-cols-1  sm:gap-8 md:gap-12 lg:gap-16 w-1/3">
              <Guests />
              <Issues room={data?.graTasks[0]?.room} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomsDetails;
