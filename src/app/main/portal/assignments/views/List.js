import React from "react";
import { useTranslation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import ListHeader from "@catu/components/HeaderList";
import Calendar from "../components/tables/calendar/Calendar";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { useLocation } from "react-router-dom";

function Assignment(props) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "py-24",
        contentCard: "rounded-8",
        contentWrapper: "mb12",
      }}
      header={
        <ListHeader
          icon="assignment"
          title={t("Assign:title", { count: 2 })}
          options={{
            goBack: location?.state?.title ? true : false,
            goBack_string: t(location?.state?.title),
          }}
        />
      }
      content={<Calendar />}
    />
  );
}

export default withReducer("AssignmentApp", reducer)(Assignment);
