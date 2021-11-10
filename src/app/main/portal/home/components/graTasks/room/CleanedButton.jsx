import React from "react";
import Button from "@material-ui/core/Button";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as MainActions from "app/store/actions";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  dndButton: {
    "@media screen and (min-width: 600px)": {
      fontSize: "12px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "15px",
    },
  },
}));
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
const gQl = gql`
  mutation toggleTimesheet($taskId: Int!) {
    toggleTimesheet(taskId: $taskId) {
      id
      endedOn
      startedOn
    }
  }
`;
function CleanedButton({
  status,
  dnd,
  roomId,
  refetch,
  taskId,
  disabled,
  isActive,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const [toggleTimeSheet] = useMutation(gQl);
  const classes = useStyles();

  const [updateRoomStatus] = useMutation(toggleStatus);
  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t("HomeApp:are_you_sure_you_want_to_assign_room_as_cleaned"),
        content: t(
          "HomeApp:are_you_sure_you_want_to_assign_room_as_cleaned_desc"
        ),
        actions: [
          <Button onClick={handleChangeCleanedRomm} color="outlined">
            {t("i_confirm")}
          </Button>,
          <Button
            onClick={() => {
              dispatch(MainActions.closeDialog());
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
  };
  function handleChangeCleanedRomm() {
    updateRoomStatus({
      variables: {
        data: {
          sourceId: parseInt(roomId),
          name: "status",
          value: "2",
          activityType: "update",
          description: "cleaned room ",
          subscribers: [{ name: "users" }],
        },
        tag: "TOGGLE_CLEANED",
      },
    })
      .then(() => {
        // Remove self
        if (isActive) {
          toggleTimeSheet({
            variables: { taskId: parseInt(taskId) },
          });
        }

        dispatch(MainActions.closeDialog());
        let url = "/app/home/";
        history.push(url);
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <Button
      variant="outlined"
      disabled={status !== 3 || dnd || disabled}
      className={
        status === 1 || status === 2
          ? clsx("bg-green-600    text-white", classes.dndButton)
          : clsx("  w-1/4 ", classes.dndButton)
      }
      onClick={handleClick}
    >
      cleaned
    </Button>
  );
}

export default CleanedButton;
