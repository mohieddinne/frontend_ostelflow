import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import * as quickPanelActions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

function NotificationPanelToggleButton(props) {
  const dispatch = useDispatch();
  const count = useSelector(({ quickPanel }) => {
    if (quickPanel.data.count > 0) return "notifications_active";
    else return "notifications_none";
  });
  React.useEffect(() => {}, [count]);
  return (
    <IconButton
      className="w-64 h-64 p-0 m-0"
      onClick={(ev) => dispatch(quickPanelActions.toggleNotificationPanel())}
    >
      <Icon>{count}</Icon>
    </IconButton>
  );
}

export default NotificationPanelToggleButton;
