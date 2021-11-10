import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, gql } from "@apollo/client";
import { showMessage } from "app/store/actions";

const gQlQuery = gql`
  query graBreaks($UserId: ID) {
    graBreaks(UserId: $UserId) {
      id
      endedOn
      UserId
    }
  }
`;
const gQl = gql`
  mutation breaks {
    breaks {
      id
      endedOn
      startedOn
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    fontWeight: "normal",
    color: "#202020",
  },
}));
function HeaderButtons() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [state, setstate] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const handleResponse = ({ data, error, isNew, exit }) => {
    let variant = "success";
    if (error) {
      variant = "error";
    }
    const message = t(`HomeApp:${variant}.${"break"}`, {
      name: data && data.name,
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
  const [breaks, { loading }] = useMutation(gQl);
  const handleBreak = () => {
    breaks()
      .then(({ data }) => {
        if (data?.breaks?.startedOn) {
          setstate(true);
          handleResponse({ data });
        }
      })
      .catch((error) => {
        handleResponse({ error });
      });
  };
  const { data } = useQuery(gQlQuery, {
    variables: { UserId: user.data.Id },
    fetchPolicy: "no-cache",
  });
  React.useEffect(() => {
    if (data?.graBreaks?.length > 0) {
      setstate(true);
    }
  }, [data]);

  return (
    <div className={clsx(classes.root, "flex flex-wrap justify-between")}>
      <Button
        variant="outlined"
        className={state ? "bg-red-600 text-white " : classes.button}
        onClick={() => {
          handleBreak();
          setstate(!state);
        }}
      >
        {loading ? t("loading") : t("HomeApp:pause")}
      </Button>
      <Button variant="outlined" className={classes.button} disabled>
        {t("HomeApp:end_of_the_day")}
      </Button>
    </div>
  );
}

export default HeaderButtons;
