import React from "react";
import QuickPanel from "app/fuse-layouts/shared-components/quickPanel/QuickPanel";
import NotificationPanel from "app/fuse-layouts/shared-components/quickPanel/NotificationPanel";
import { useSelector } from "react-redux";
function RightSideLayout1(props) {
  const stateQuickPanel = useSelector(({ quickPanel }) => {
    return quickPanel.state;
  });
  return (
    <React.Fragment>
      <NotificationPanel />
      {stateQuickPanel && <QuickPanel />}
    </React.Fragment>
  );
}

export default RightSideLayout1;
