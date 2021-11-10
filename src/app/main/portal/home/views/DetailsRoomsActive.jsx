import React from "react";

import { Icon, Typography } from "@material-ui/core";
import { FusePageSimple } from "@fuse";
import { useTranslation } from "react-i18next";
import DetailsRoomActive from "../components/dashboard/DetailsRoomActive";

function DetailsRoomsActive(props) {
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
      content={<DetailsRoomActive />}
    />
  );
}
export default DetailsRoomsActive;
