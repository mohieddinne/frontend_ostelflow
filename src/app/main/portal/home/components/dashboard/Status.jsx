import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useQuery, gql } from "@apollo/client";
const gQlQuery = gql`
  query graBreaks($UserId: ID) {
    graBreaks(UserId: $UserId) {
      id
      endedOn
      UserId
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  holiday: {
    backgroundColor: "#f59e0b",
    textTransform: "uppercase",
    border: "1px solid #f59e0b",
  },
  inActivity: {
    backgroundColor: "#10b981",
    textTransform: "uppercase",
    border: "1px solid #10b981",
  },
  notConnected: {
    backgroundColor: "#374151",
    textTransform: "uppercase",
    border: "1px solid #374151",
  },
}));

function Status({ connected, UserId }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { data } = useQuery(gQlQuery, {
    variables: { UserId },
    fetchPolicy: "no-cache",
  });
  return (
    <div className="flex justify-end  ">
      {!connected ? (
        <span
          className={clsx(
            classes.notConnected,
            "rounded-full border-1 text-center p-4  font-bold text-white   "
          )}
        >
          {t("HomeApp:notConnected")}
        </span>
      ) : connected && data?.graBreaks.length === 0 ? (
        <span
          className={clsx(
            classes.inActivity,
            "rounded-full border-1 text-center  p-4 text-12 font-bold text-white   "
          )}
        >
          {t("HomeApp:inActivity")}
        </span>
      ) : (
        data?.graBreaks.length > 0 && (
          <span
            className={clsx(
              classes.holiday,
              "rounded-full border-1 text-center  p-4 font-bold text-white   "
            )}
          >
            {t("HomeApp:satut_pause")}
          </span>
        )
      )}
    </div>
  );
}

export default Status;
