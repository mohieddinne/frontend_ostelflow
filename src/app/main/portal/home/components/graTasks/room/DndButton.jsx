import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as MainActions from "app/store/actions";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

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
const toggleDnd = gql`
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
const gQlMaintain = gql`
  mutation toggleTimeSheetMaintain($taskId: Int!) {
    toggleTimeSheetMaintain(taskId: $taskId) {
      id
      endedOn
      startedOn
    }
  }
`;

function RoomCard(props) {
  const {
    roomId,
    isDnd,
    disabled,
    refetch,
    taskId,
    maintain,
    timesheets,
    gra,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const [toggleTimeSheet] = useMutation(gQl);
  const [toggleTimeSheetMaintain] = useMutation(gQlMaintain);

  const [updateRoomDnd, { loading }] = useMutation(toggleDnd);
  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t("HomeApp:are_you_sure_you_want_to_assign_room_as_dnd"),
        content: t("HomeApp:are_you_sure_you_want_to_assign_room_as_dnd_desc"),
        actions: [
          <Button onClick={handleChangeDnd} color="outlined">
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
  function handleChangeDnd() {
    updateRoomDnd({
      variables: {
        data: {
          sourceId: parseInt(roomId),
          name: "dnd",
          value: !isDnd + "",
          activityType: "update",
          description: "Toggle DND ",
          subscribers: [{ name: "users" }],
        },
        tag: "TOGGLE_DND",
      },
    })
      .then((res) => {
        if (maintain && timesheets.length !== 0) {
          toggleTimeSheetMaintain({
            variables: { taskId: parseInt(taskId) },
          });
        } else if (gra)
          toggleTimeSheet({
            variables: { taskId: parseInt(taskId) },
          });
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
      // classes={{
      //   root: clsx({ "bg-red-500 text-white hover:bg-red-600": isDnd }),
      // }}
      className={clsx(classes.dndButton)}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      DND {loading && "..."}
    </Button>
  );
}

export default RoomCard;
