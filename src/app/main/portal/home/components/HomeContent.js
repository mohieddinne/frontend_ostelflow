import React, { useContext } from "react";
import Indicator from "./indicator/Indicator";
import Rooms from "./graTasks/room/Rooms";
import Task from "./maintainTasks/task/Task";

import Header from "./header/Header";
import HomeContext from "./Context";
import RoomsDetails from "./graTasks/roomdetails/RoomsDetails";
import { FuseUtils } from "@fuse";
import TaskDetails from "./maintainTasks/taskDetail/TaskDetails";
import Dashboard from "../components/dashboard/Dashboard";
function HomeContent() {
  const GraAccess = FuseUtils.hasPermission({
    slug: "dashboard_gra",
    permission: "can_view",
  });
  const maintainAccess = FuseUtils.hasPermission({
    slug: "dashboard_maintenance",
    permission: "can_view",
  });
  return (
    <div className="p-16 ">
      {(GraAccess || maintainAccess) && <Header />}
      <div className="flex items-start gap-10 w-full pt-32">
        {GraAccess ? (
          <>
            <Indicator />
            <RoomLayoutHandler />
          </>
        ) : maintainAccess ? (
          <>
            <Indicator />
            <MaintainTaskHandler />
          </>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

function RoomLayoutHandler() {
  const { showRoomDetails } = useContext(HomeContext);
  if (showRoomDetails) {
    return <RoomsDetails />;
  }
  return <Rooms />;
}
function MaintainTaskHandler() {
  const { showRoomDetails } = useContext(HomeContext);
  if (showRoomDetails) {
    return <TaskDetails />;
  }
  return <Task />;
}

export default HomeContent;
