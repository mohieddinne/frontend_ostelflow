import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import RoomCard from "./RoomCard";
import { useQuery, gql } from "@apollo/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import NoDataComponent from "@catu/components/Table/components/bodies/NoData";

const TASKS_QUERY = gql`
  query myGraTasks($filters: GRA_TaskFilter) {
    myGraTasks(filters: $filters) {
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

function Rooms() {
  const classes = useStyles();
  const { t } = useTranslation();
  const date = new Date();
  const day = date.toJSON().slice(0, 10);
  const filters = { date: day };

  const { data, loading, refetch } = useQuery(TASKS_QUERY, {
    variables: { filters },
    fetchPolicy: "no-cache",
  });

  const tasks = data?.myGraTasks || [];

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
        tasks.filter((e) => !e?.room?.dnd && e?.room?.status === 3).length ===
          0 ? (
        <div className="flex justify-center">
          <NoDataComponent />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-16 mt-16">
          {data?.myGraTasks
            .sort((a, b) => {
              return a.priority - b.priority;
            })
            .filter((e) => !e?.room?.dnd && e?.room?.status === 3)
            .map(({ timesheets, room, id, priority, todos }, index) => (
              <RoomCard
                timesheets={timesheets}
                room={room}
                taskId={id}
                firstOfList={index === 0}
                key={id}
                refetch={refetch}
                loading={loading}
                priority={priority}
                todos={todos}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Rooms;
