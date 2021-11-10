import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  retrunButton: {
    "@media screen and (min-width: 600px)": {
      fontSize: "12px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "14px",
    },
  },
}));
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
const gQl = gql`
  mutation toggleTimeSheetMaintain($taskId: Int!) {
    toggleTimeSheetMaintain(taskId: $taskId) {
      id
      endedOn
      startedOn
    }
  }
`;
function RetrunButton({ taskId, refetch, priority, timesheets }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [toggleTimeSheetMaintain] = useMutation(gQl);

  const [updateTaskpriority] = useMutation(togglepriority);
  function handleUpdateTask() {
    updateTaskpriority({
      variables: {
        data: {
          sourceId: parseInt(taskId),
          name: "priority",
          value: "3",
          activityType: "update",
          description: "revenir plus tard ",
          subscribers: [{ name: "users" }],
        },
        tag: "TOGGLE_PRIORITY_MAINTAIN",
      },
    })
      .then((res) => {
        // Remove self
        if (timesheets.length !== 0) {
          toggleTimeSheetMaintain({
            variables: { taskId: parseInt(taskId) },
          });
        }
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
      onClick={handleUpdateTask}
      variant="outlined"
      className={clsx(classes.retrunButton)}
      disabled={priority === 3}
    >
      {t("HomeApp:return_later")}
    </Button>
  );
}

export default RetrunButton;
