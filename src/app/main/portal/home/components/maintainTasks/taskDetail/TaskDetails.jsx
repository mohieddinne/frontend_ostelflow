import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import HomeContext from "../../Context";
import Guests from "../../graTasks/roomdetails/Guests";
import Note from "../../graTasks/roomdetails/Note";
import TaskCard from "../task/TaskCard";
const query = gql`
  query maintainTasks($ids: [Int], $filters: GRA_TaskFilter) {
    maintainTasks(ids: $ids, filters: $filters) {
      id
      assignedOn
      priority
      description
      timesheets(active: true) {
        id
        endedOn
        startedOn
      }
      problem
      createdBy
      roomId
      status
      room {
        id
        number
      }
      user {
        id
        firstName
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
  const { taskId } = useContext(HomeContext);

  const { loading, data } = useQuery(query, {
    variables: { ids: [taskId] },
    fetchPolicy: "no-cache",
  });
  return (
    <div className="overflow-y-auto w-2/3 gap-16 ">
      <Typography className={classes.title}>
        {t("HomeApp:today_tasks")}
      </Typography>
      <div className="grid grid-cols-1 gap-16 mt-16">
        <TaskCard task={data?.maintainTasks[0]} loading={loading} />
        {loading ? (
          <div className="flex  flex-1 flex-col items-center justify-center h-full p-32">
            <Typography className="text-20 mb-16" color="textSecondary">
              {t("loading")}
            </Typography>
            <LinearProgress className="w-xs" color="secondary" />
          </div>
        ) : (
          <div className="flex gap-10 w-full  ">
            <div className="grid grid-cols-1 gap-16 w-full ">
              <Guests />
              <Note description={data?.maintainTasks[0].description} taskId={taskId}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomsDetails;
