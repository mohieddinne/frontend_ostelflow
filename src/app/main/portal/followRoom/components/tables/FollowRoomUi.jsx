import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as MainActions from "app/store/actions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  status: {
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.4rem",
    width: "fit-content",
    textTransform: "uppercase",
    borderRadius: "10rem",

    fontWeight: "900",
    "@media screen and (min-width: 600px)": {
      fontSize: "0.9rem",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "1.1rem",
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

function List({ loading, refetch, error, data }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  let bg = "bg-red";
  const [updateRoomStatus] = useMutation(toggleStatus);
  const handleClick = (e) => {
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t("HomeApp:are_you_sure_you_want_to_assign_room_as_cleaned"),

        actions: [
          <Button
            onClick={() => handleRemakeRomm(parseInt(e))}
            color="outlined"
          >
            à refaire
          </Button>,
          <Button
            onClick={() => handleChangeCleanedRomm(parseInt(e))}
            color="outlined"
          >
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
  function handleChangeCleanedRomm(e) {
    updateRoomStatus({
      variables: {
        data: {
          sourceId: parseInt(e),
          name: "status",
          value: "1",
          activityType: "update",
          description: "cleaned room ",
          subscribers: [{ name: "users" }],
        },
        tag: "TOGGLE_CLEANED",
      },
    })
      .then(() => {
        // Remove self

        dispatch(MainActions.closeDialog());

        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleRemakeRomm(e) {
    updateRoomStatus({
      variables: {
        data: {
          sourceId: parseInt(e),
          name: "status",
          value: "3",
          activityType: "update",
          description: "cleaned room ",
          subscribers: [{ name: "users" }],
        },
        tag: "TOGGLE_CLEANED",
      },
    })
      .then(() => {
        // Remove self

        dispatch(MainActions.closeDialog());

        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function getStatusColor(status) {
    switch (status) {
      case 1:
        bg = "bg-green";
        break;
      case 2:
        bg = "bg-blue";
        break;
      case 3:
        bg = "bg-red";
        break;
      case 4:
        bg = "bg-grey";
        break;
      default:
        bg = "bg-grey";
        break;
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex flex-1 flex-col items-center justify-center h-full p-32">
          <Typography className="text-20 mb-16" color="textSecondary">
            {t("loading")}
          </Typography>
          <LinearProgress className="w-xs" color="secondary" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2   md:grid-cols-2 lg:grid-cols-2  p-8  xl:grid-cols-2 2xl:grid-cols-3 gap-16 justify-center  ">
          {data
            .filter((e) => e?.status === 2 || e?.status === 1)
            .sort((a, b) => {
              return b.status - a.status;
            })
            .map(
              (e) => (
                // eslint-disable-next-line no-sequences
                getStatusColor(e?.status),
                (
                  <div
                    className={
                      e?.status === 1
                        ? "flex flex-wrap rounded-lg 200   bg-white border-2  p-8 opacity-50"
                        : "flex flex-wrap rounded-lg 200   bg-white border-2  p-8"
                    }
                    role="button"
                    onClick={() => e?.status !== 1 && handleClick(e.id)}
                  >
                    <>
                      <div className="flex justify-between w-full">
                        <strong className="sm:text-13 md:text-15">
                          {!e?.number
                            ? t("loading")
                            : t("HomeApp:room") + " " + e?.number}
                        </strong>

                        <span
                          className={clsx(
                            classes.status,
                            `text-white ml-1 p-4 ${bg}`
                          )}
                        >
                          {!e?.status
                            ? t("loading")
                            : t(`rooms:status.status_${e?.status}`)}
                        </span>
                      </div>
                      <Typography
                        className={clsx(classes.info, "sm:text-10 md:text-13")}
                      >
                        {t("HomeApp:room")} - Niveau 2
                      </Typography>
                    </>
                  </div>
                )
              )
            )}
        </div>
      )}
    </>
  );
}

export default List;
