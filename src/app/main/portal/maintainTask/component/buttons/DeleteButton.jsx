import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import * as MainActions from "app/store/actions";
import { gql, useMutation } from "@apollo/client";
import * as Actions from "../../store/action";

const gQl = gql`
  mutation deleteMaintananceTask($id: Int!) {
    deleteMaintananceTask(id: $id)
  }
`;
function DeleteButton({ id }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [exec] = useMutation(gQl);

  const handleClick = (e) => {
    e.stopPropagation();
    setLoading(true);
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t(
          "maintainTasks:validation.are_you_sure_you_want_to_delete_the_maintain_task"
        ),
        content: t(
          "maintainTasks:validation.are_you_sure_you_want_to_delete_the_maintain_task_desc"
        ),
        actions: [
          <Button onClick={handleDelete} color="outlined">
            {t("i_confirm")}
          </Button>,
          <Button
            onClick={() => {
              dispatch(MainActions.closeDialog());
              setLoading(false);
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
  const handleDelete = (e) => {
    exec({ variables: { id } })
      .then(() => {
        setLoading(false);
        dispatch(MainActions.closeDialog());

        dispatch(Actions.deleteItem(parseInt(id)));
        dispatch(
          MainActions.showMessage({
            message: t("maintainTasks:success.delete"),
            autoHideDuration: 3000,
            variant: "success", // success error info warning null
          })
        );
      })
      .catch((e) => {
        setLoading(false);
        dispatch(
          MainActions.showMessage({
            message: t("maintainTasks:error.delete"),
            autoHideDuration: 3000,
            variant: "error", // success error info warning null
          })
        );
        dispatch(MainActions.closeDialog());
        console.error(e);
      });
  };

  return (
    <Tooltip title={t("maintainTasks:delete_the_task")}>
      <span>
        <IconButton onClick={handleClick} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : <Icon>delete</Icon>}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default DeleteButton;
