import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  footer: {
    color: "#a5a5a5",
    fontStyle: "italic",
    boxShadow: "none",
    background: "none",
    textAlign: "right",
  },
  link: {
    color: "#888888 !important",
    fontWeight: "bold",
  },
}));

function FooterLayout1() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <AppBar
      id="fuse-footer"
      className={clsx("relative z-10", classes.footer)}
      color="default"
    >
      <Toolbar className="px-16 py-0 flex items-center">
        <Typography
          variant="overline"
          display="block"
          className="text-right w-full mx-16"
        >
          {t("developed_by", { company: "" })}
          <a
            href="https://tekru.net/"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            Tekru Technologies
          </a>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default FooterLayout1;
