import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import slugify from "slugify";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/action";

function ViewButton({ item, history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    const slug = slugify(item.name || "").toLocaleLowerCase();
    dispatch(Actions.setEditable(false));

    history.push(`/app/bedrooms/item/${item.id}/${slug}`);
    return true;
  };

  return (
    <Tooltip title={t("rooms:edit")}>
      <IconButton onClick={handleEditClick}>
        <Icon>edit</Icon>
      </IconButton>
    </Tooltip>
  );
}

export default withRouter(ViewButton);
