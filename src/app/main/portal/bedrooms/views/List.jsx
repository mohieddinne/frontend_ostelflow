import React from "react";
import { FusePageCarded } from "@fuse";
import RoomsList from "../component/tables/Rooms";
import ListHeader from "@catu/components/HeaderList";
import reducer from "../store/reducer";
import withReducer from "app/store/withReducer";
import { useTranslation } from "react-i18next";
import SearchInput from "../component/SearchInput";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
          title={t("rooms:room_list")}
          Input={SearchInput}
          actions={[
            <Button
              component={Link}
              to="/app/bedrooms/item/new"
              className="whitespace-nowrap normal-case"
              variant="contained"
              color="secondary"
              disableElevation
            >
              <span className="hidden sm:flex">{t("rooms:new_room")}</span>
              <span className="flex sm:hidden">{t("rooms:new")}</span>
            </Button>,
          ]}
        />
      }
      content={<RoomsList />}
    />
  );
}
export default withReducer("bedroomsApp", reducer)(Page);
