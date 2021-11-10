import React from "react";
import Button from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import RefetchButton from "../buttons/RefetchButton";
import { useTranslation } from "react-i18next";
import FilterBtn from "./actions/Filters";

function ToolbarActions(props) {
  const { t } = useTranslation();
  const { Filter, selecting, refetch, Export, options } = props;

  return (
    <>
      {Export && (
        <div>
          <Tooltip title={t("Export_the_table")}>
            <Button></Button>
          </Tooltip>
          <Export />
        </div>
      )}

      <FilterBtn Component={Filter} options={options} />

      <RefetchButton refetch={refetch} loading={props.loading} />
      {selecting && (
        <div>
          <Tooltip title="Delete">
            <Button aria-label="delete">
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default ToolbarActions;
