import React from "react";
import { FusePageCarded } from "@fuse";
import TimeSheetsList from "../component/tables/TimeSheets";
import ListHeader from "@catu/components/HeaderList";
import reducer from "../store/reducer";
import withReducer from "app/store/withReducer";
import { useTranslation } from "react-i18next";
import SearchInput from "../component/SearchInput";

function Page() {
  const { t } = useTranslation();

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        contentCard: "rounded-8 overflow-hidden",
        contentWrapper: "mb12",
      }}
      header={
        <ListHeader
          icon="room"
          title={t("timesheets:timesheet_list")}
          Input={SearchInput}
        />
      }
      content={<TimeSheetsList />}
    />
  );
}
export default withReducer("timesheetsApp", reducer)(Page);
