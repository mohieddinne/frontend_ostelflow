import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { useQuery, gql } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import NoDataComponent from "@catu/components/Table/components/bodies/NoData";
import TaskCard from "./TaskCard";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: "#202020",
  },
}));
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
        dnd
      }
      user {
        id
        firstName
      }
    }
  }
`;
function Task() {
  const classes = useStyles();
  const { t } = useTranslation();
  const date = new Date();
  const day = date.toJSON().slice(0, 10);
  const filters = { date: day };
  const { loading, data, refetch } = useQuery(query, {
    variables: { filters },
    fetchPolicy: "no-cache",
  });
  const tasks = data?.maintainTasks || [];
  return (
    <div className="overflow-y-auto w-3/4 gap-16">
      <Typography className={classes.title}>
        {t("HomeApp:today_tasks")}
      </Typography>

      {loading ? (
        <div className="flex flex-1 flex-col items-center justify-center h-full p-32">
          <Typography className="text-20 mb-16" color="textSecondary">
            {t("loading")}
          </Typography>
          <LinearProgress className="w-xs" color="secondary" />
        </div>
      ) : tasks.length === 0 ||
        tasks.filter((e) => !e?.room?.dnd && e?.status !== 5).length === 0 ? (
        <div className="flex justify-center">
          <NoDataComponent />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-16 mt-16">
          {[...tasks]
            .sort((a, b) => {
              return a.priority - b.priority;
            })
            .sort((a, b) => {
              return a.status - b.status;
            })
            .filter((e) => !e?.room?.dnd && e?.status !== 5)
            .map((task, index) => (
              <TaskCard task={task} refetch={refetch} loading={loading} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Task;
