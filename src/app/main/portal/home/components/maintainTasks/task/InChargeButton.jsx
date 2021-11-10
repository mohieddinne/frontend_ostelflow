import React from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as MainActions from "app/store/actions";

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
const gQl = gql`
  mutation updateMaintananceTask($params: TaskInput) {
    updateMaintananceTask(params: $params)
  }
`;
function InChargeButton({ setInCharge, id, refetch }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [updateMaintananceTask] = useMutation(gQl);
  const handleClick = (e) => {
    updateMaintananceTask({
      variables: {
        params: {
          id,
          status: 3,
          isAssigned: true,
        },
      },
    })
      .then(({ data }) => {
        const update = data?.updateMaintananceTask;
        if (update) {
          dispatch(
            MainActions.showMessage({
              message: t("HomeApp:success.assign"),
              autoHideDuration: 3000,
              variant: "success", // success error info warning null
            })
          );
          refetch();
          setInCharge(false);
        } else {
          dispatch(
            MainActions.showMessage({
              message: t("HomeApp:error.assign"),
              autoHideDuration: 3000,
              variant: "error", // success error info warning null
            })
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // setInCharge(false)
  return (
    <div>
      <Button
        classes={classes}
        // disabled={disabled || loading}
        onClick={handleClick}
      >
        {t("HomeApp:in_charge")}
      </Button>
    </div>
  );
}

export default InChargeButton;
