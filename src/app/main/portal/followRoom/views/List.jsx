import React from "react";
import { FusePageCarded } from "@fuse";
import FollowRoom from "../components/tables/FollowRoom";
import ListHeader from "@catu/components/HeaderList";
import { useTranslation } from "react-i18next";

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
        <ListHeader icon="room" title={t("follow_room:room_list_to_verify")} />
      }
      content={<FollowRoom />}
    />
  );
}
export default Page;
