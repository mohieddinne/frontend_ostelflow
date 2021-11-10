import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/actions";
import TimeClock from "./TimeClock";
import TaskContext from "./TaskContext";
import { useHistory } from "react-router-dom";
import * as MainActions from "app/store/actions";

const gQl = gql`
  mutation toggleTimeSheetMaintain($taskId: Int!) {
    toggleTimeSheetMaintain(taskId: $taskId) {
      id
      endedOn
      startedOn
    }
  }
`;
const UPDATE = gql`
  mutation updateMaintananceTask($params: TaskInput) {
    updateMaintananceTask(params: $params)
  }
`;
const togglepriority = gql`
  mutation notifications($data: NotificationInput, $tag: NotificationTag) {
    notifications(data: $data, tag: $tag) {
      id
      data {
        ... on Task {
          id
        }
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    background: "#059669",
    borderRadius: "4px",
    
    fontWeight: "bold",
    // fontSize: "1.5rem",
    textAlign: "center",
    color: "#fff",
    // padding: "0.6rem 0.8rem",
    "@media screen and (min-width: 600px)": {
      fontSize: "1.3rem",
      padding: "0.6rem 0.8rem",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "1.5rem",
      padding: "0.6rem 0.8rem",
    },
    "&:hover": {
      background: "#0C6B4E",
    },
  },
}));

function RoomCard(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [updateTaskpriority] = useMutation(togglepriority);

  const { isActive, setTasktimers } = useContext(TaskContext);
  const { disabled, taskId } = props;
  const [toggleTimeSheetMaintain, { loading }] = useMutation(gQl);
  const handleResponse = ({ response, error, isNew, exit }) => {
    let variant = "success";
    if (error) {
      variant = "error";
    }
    const message = t(`HomeApp:${variant}.${"timesheet-active"}`, {
      name: response && response.name,
    });
    dispatch(
      showMessage({
        message,
        autoHideDuration: 3000,
        variant,
      })
    );

    if ((!error && exit) || (isNew && !error && exit));
  };
  const [updateMaintananceTask] = useMutation(UPDATE);

  function handleEndTask() {
    updateMaintananceTask({
      variables: {
        params: {
          id: taskId,
          status: 5,
        },
      },
    })
      .then(() => {
        let url = "/app/home/";
        dispatch(MainActions.closeDialog());
        history.push(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleOpenTask() {
    updateMaintananceTask({
      variables: {
        params: {
          id: taskId,
          status: 1,
        },
      },
    })
      .then(() => {
        // Remove self
        //refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const leavePage = () => {
    let url = "/app/home/";
    history.push(url);
  };
  const handleStart = () => {
    setTasktimers({ startedOn: null, endedOn: null });
    toggleTimeSheetMaintain({
      variables: { taskId: parseInt(taskId) },
    })
      .then(({ data }) => {
        const ts = data.toggleTimeSheetMaintain;
        if (ts.endedOn) {
          dispatch(
            MainActions.openDialog({
              fullWidth: false,
              maxWidth: "sm",
              onExit: leavePage,

              title: t("HomeApp:are_you_sure_you_want_to_assign_task_as_ended"),
              content: t(
                "HomeApp:are_you_sure_you_want_to_assign_task_as_ended_desc"
              ),
              actions: [
                <Button onClick={handleEndTask} color="outlined">
                  {t("i_confirm")}
                </Button>,
                <Button
                  onClick={() => {
                    let url = "/app/home/";
                    dispatch(MainActions.closeDialog());
                    history.push(url);
                  }}
                  color="default"
                  autoFocus
                  variant="contained"
                  disableElevation
                >
                  {t("cancel")}
                </Button>,
              ],
            })
          );
        }
        if (ts) {
          let url = "/app/home/";
          setTasktimers({ startedOn: ts.startedOn, endedOn: ts.endedOn });
          if (!ts.endedOn) {
            url = url + taskId;
            handleOpenTask();
            history.push(url);
          }
          updateTaskpriority({
            variables: {
              data: {
                sourceId: parseInt(taskId),
                name: "priority",
                value: "2",
                activityType: "update",
                description: "revenir plus tard ",
                subscribers: [{ name: "users" }],
              },
              tag: "TOGGLE_PRIORITY_MAINTAIN",
            },
          })
            .then((res) => {
              // Remove self
              console.log({ res });
            })

            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((error) => {
        handleResponse({ error });
      });
  };

  return (
    <div>
      <Button
        classes={classes}
        disabled={disabled || loading}
        onClick={() => {
          handleStart();
        }}
      >
        {isActive && <TimeClock />}
        {t(isActive ? "end" : "start")}
      </Button>
    </div>
  );
}

export default RoomCard;
