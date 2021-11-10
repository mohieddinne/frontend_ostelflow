import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { useQuery, gql } from "@apollo/client";
const gQlQuery = gql`
  query GraNotifications($userId: Int) {
    GraNotifications(userId: $userId) {
      id
      userId
      description
      created_at
      user {
        email
        firstName
        lastName
      }
      room {
        id
        number
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  activity: {
    
    fontWeight: "normal",
    fontSize: "12px",
    textAlign: "left",
  },
}));
function LastActivities({ userId }) {
  const { t } = useTranslation();

  const { data } = useQuery(gQlQuery, {
    variables: { userId },
    fetchPolicy: "no-cache",
  });
  const classes = useStyles();
  const camalize = function camalize(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };
  function Diff(created_at) {
    const today = new Date();
    const endDate = new Date(parseInt(created_at.created_at));
    const days = parseInt((today - endDate) / (1000 * 60 * 60 * 24));
    const hours = parseInt((Math.abs(today - endDate) / (1000 * 60 * 60)) % 24);
    const minutes = parseInt(
      (Math.abs(today.getTime() - endDate.getTime()) / (1000 * 60)) % 60
    );

    return (
      <span style={{ color: "#9ca3af" }}>
        il y'a {" " + days || (days > 0 && <> il y'a {days} jours , </>)}
        {" " + hours && <> {hours} heures et </>}
        {" " + minutes && <> {minutes} minutes </>}
      </span>
    );
  }
  return (
    <div className="p-8">
      <Typography className="p-4">Dernières activités</Typography>
      {data?.GraNotifications.filter((e) => e?.description !== "start_timer")
        .length > 0 ? (
        <>
          {data?.GraNotifications.slice(0, 2).map((e) => (
            <p className={clsx(classes.activity, "p-4 w-full")}>
              {e?.user?.firstName} :
              {t("HomeApp:" + camalize(e.description).slice(0, -1), {
                number: e?.room?.number,
              })}
              <Diff created_at={e.created_at} />
            </p>
          ))}
        </>
      ) : (
        <p className={clsx(classes.activity, "p-4 w-full")}>{t("no_data")}</p>
      )}
    </div>
  );
}

export default LastActivities;
