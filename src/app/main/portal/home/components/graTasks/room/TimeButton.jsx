import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/actions";
import { useHistory } from "react-router-dom";
import TimeClock from "./TimeClock";
import RoomContext from "./RoomContext";
import * as MainActions from "app/store/actions";

const gQl = gql`
  mutation toggleTimesheet($taskId: Int!) {
    toggleTimesheet(taskId: $taskId) {
      id
      endedOn
      startedOn
    }
  }
`;
const toggleStatus = gql`
  mutation notifications($data: NotificationInput, $tag: NotificationTag) {
    notifications(data: $data, tag: $tag) {
      id
      data {
        ... on Room {
          id
        }
      }
    }
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
  const { isActive, setTasktimers } = useContext(RoomContext);

  const { disabled, taskId, IdRoom } = props;

  const [toggleTimeSheet, { loading }] = useMutation(gQl);
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
  const [updateRoomStatus] = useMutation(toggleStatus);
  function handleChangeCleanedRomm() {
    updateRoomStatus({
      variables: {
        data: {
          sourceId: parseInt(IdRoom),
          name: "status",
          value: "2",
          activityType: "update",
          description: "Toggle DND ",
          subscribers: [{ name: "users" }],
        },
        tag: "TOGGLE_CLEANED",
      },
    })
      .then(() => {
        // Remove self
        //refetch();
        let url = "/app/home/";
        dispatch(MainActions.closeDialog());
        history.push(url);
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
    toggleTimeSheet({
      variables: { taskId: parseInt(taskId) },
    })
      .then(({ data }) => {
        const ts = data.toggleTimesheet;
        if (ts.endedOn) {
          dispatch(
            MainActions.openDialog({
              fullWidth: false,
              onExit: leavePage,
              maxWidth: "sm",
              title: t(
                "HomeApp:are_you_sure_you_want_to_assign_room_as_cleaned"
              ),
              content: t(
                "HomeApp:are_you_sure_you_want_to_assign_room_as_cleaned_desc"
              ),
              actions: [
                <Button onClick={handleChangeCleanedRomm} color="outlined">
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
          setTasktimers({ startedOn: ts?.startedOn, endedOn: ts?.endedOn });
          if (!ts.endedOn) {
            url = url + taskId + "/" + IdRoom;
            history.push(url);
          }
          updateTaskpriority({
            variables: {
              data: {
                sourceId: parseInt(taskId),
                name: "priority",
                value: "2",
                activityType: "update",
                description: "start_timer",
                subscribers: [{ name: "users" }],
              },
              tag: "TOGGLE_PRIORITY_GRA",
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
