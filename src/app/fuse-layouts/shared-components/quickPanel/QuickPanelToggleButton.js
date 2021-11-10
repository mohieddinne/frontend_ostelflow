import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import * as quickPanelActions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

function QuickPanelToggleButton(props) {
  const dispatch = useDispatch();

  return (
    <IconButton
      className="w-64 h-64 p-0 m-0"
      onClick={(ev) => dispatch(quickPanelActions.toggleQuickPanel())}
    >
      {props.children}
    </IconButton>
  );
}

QuickPanelToggleButton.defaultProps = {
  children: <Icon>format_list_bulleted </Icon>,
};

export default QuickPanelToggleButton;
