import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import EnhancedTable from "@catu/components/Table/EnhancedTable";
import { useTranslation } from "react-i18next";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import SecondaryText from "@catu/components/SecondaryText";
import WarningIcon from "@material-ui/icons/Warning";
import red from "@material-ui/core/colors/red";
import Tooltip from "@material-ui/core/Tooltip";
import { FuseUtils } from "@fuse";
import ChangeDnDStatus from "../buttons/ChangeDnDStatus";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    marginTop: "7rem",
  },
}));

function List({ loading, refetch, error }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState([]);

  const keywords = useSelector(({ bedroomsApp }) =>
    bedroomsApp.searchText.toLowerCase()
  );

  const dataup = useSelector(({ bedroomsApp }) => bedroomsApp.data);

  const hasEditAccess = FuseUtils.hasPermission({
    slug: "room_management",
    permission: "can_edit",
  });

  useEffect(() => {
    let filteredData;
    if (!keywords) filteredData = dataup;
    else
      filteredData = dataup.filter((item) => {
        const values = Object.values(item);
        const find = values.find((val) => {
          if (!val) return false;
          const value = val.toString().toLowerCase();
          return value.includes(keywords);
        });
        return find;
      });
    setSearchResults(filteredData);
  }, [dataup, keywords]);

  const columns = useMemo(
    () => [
      {
        Header: t("rooms:number"),
        accessor: "number",
        width: "15%",
        Cell: ({ cell: { value } }) => {
          return <div className="font-bold ">{"N° " + value}</div>;
        },
      },
      {
        Header: t("rooms:floor"),
        accessor: "floor",
        width: "15%",

        Cell: ({ cell }) => {
          if (!cell.value) {
            return <SecondaryText text={t("not_defined")} />;
          }
          return <span className="font-bold text-center">{cell.value}</span>;
        },
      },
      {
        Header: t("rooms:type"),
        accessor: "type.value",
        width: "15%",

        Cell: ({ cell }) => {
          if (!cell.value) {
            return <SecondaryText text={t("not_defined")} />;
          }
          return <span className="font-bold text-center">{cell.value}</span>;
        },
      },
      {
        Header: t("rooms:status.name"),
        accessor: "status",
        width: "30%",

        Cell: ({ cell, row }) => {
          if (!cell.value) {
            return <SecondaryText text={t("not_defined")} />;
          }
          const dnd = row?.original?.dnd;
          let bg = "bg-white ";
          switch (cell.value) {
            case 1:
              bg = "bg-green";
              break;
            case 2:
              bg = "bg-orange";
              break;
            case 3:
              bg = "bg-red";
              break;
            case 4:
              bg = "bg-grey";
              break;
            default:
              bg = "bg-grey";
              break;
          }
          return (
            <div className="flex  items-center px-4 ">
              <span
                className={
                  "px-8 py-4 rounded-full border-1 whitespace-nowrap text-white font-bold " +
                  bg
                }
              >
                {t(`rooms:status.status_${cell.value}`)}
              </span>
              {dnd && (
                <Tooltip title={t("rooms:status.dnd")}>
                  <WarningIcon style={{ color: red[700] }} />
                </Tooltip>
              )}
              {hasEditAccess && (
                <ChangeDnDStatus value={dnd} roomId={row.original.id} />
              )}
            </div>
          );
        },
      },

      {
        Header: t("rooms:options"),
        id: "action",
        width: "15%",

        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {hasEditAccess && <ViewButton item={row.original} />}
            <DeleteButton id={row.original.id} />
          </div>
        ),
      },
    ],
    [hasEditAccess, t]
  );

  return (
    <>
      {loading ? (
        <div className="flex flex-1 flex-col items-center justify-center h-full p-32">
          <Typography className="text-20 mb-16" color="textSecondary">
            {t("loading")}
          </Typography>
          <LinearProgress className="w-xs" color="secondary" />
        </div>
      ) : (
        <EnhancedTable
          loading={loading}
          className={classes.root}
          columns={columns}
          data={searchResults || []}
          selectable={false}
          footer={false}
          error={error}
        />
      )}
    </>
  );
}

export default List;
