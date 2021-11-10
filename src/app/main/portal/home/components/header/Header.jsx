import React from "react";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import HeaderButtons from "./HeaderButtons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  user: {
    fontWeight: "normal",
    fontSize: "26px",
    textAlign: "left",
    color: "#202020",
  },
}));
function Header() {
  const classes = useStyles();
  const { t } = useTranslation();

  const CuurentUser = useSelector(({ auth }) => auth.user.data.lastName);

  return (
    <div className="flex justify-between">
      <Typography className={classes.user}>
        {t("HomeApp:hello")} {CuurentUser},
      </Typography>
      <HeaderButtons />
    </div>
  );
}

export default Header;
