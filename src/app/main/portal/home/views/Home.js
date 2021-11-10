import React from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { Icon, Typography } from "@material-ui/core";
import { FusePageSimple } from "@fuse";
import { useTranslation } from "react-i18next";
import HomeContent from "../components";

function Home(props) {
  const { t } = useTranslation();
  return (
    <FusePageSimple
      header={
        <div className="flex flex-1 items-center justify-between p-24 ">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Icon className="text-18" color="action">
                home
              </Icon>
              <Icon className="text-16" color="action">
                chevron_right
              </Icon>
              <Typography color="textSecondary">{t("HomeApp:home")}</Typography>
            </div>
          </div>
        </div>
      }
      content={<HomeContent />}
    />
  );
}

export default withReducer("home", reducer)(Home);
