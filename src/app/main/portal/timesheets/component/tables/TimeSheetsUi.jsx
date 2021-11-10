import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "@catu/components/Table/EnhancedTable";
import DateFormatter from "@catu/components/formatters/DateFormatter";
import { useTranslation } from "react-i18next";
import SecondaryText from "@catu/components/SecondaryText";
import TaskDatePicker from "../TaskDatePicker";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    marginTop: "7rem",
  },
}));
const option = {
  year: "numeric",
  month: "numeric",
  hour: "numeric",
  day: "numeric",
  minute: "numeric",
  timeZone: "Africa/Tunis",
};
function List({ data, loading, refetch, error }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const keywords = useSelector(({ timesheetsApp }) => timesheetsApp.searchText);
  const [searchResults, setSearchResults] = useState([]);
  console.log({ data });
  useEffect(() => {
    let filteredData;

    if (!keywords) filteredData = data;
    else
      filteredData = data?.filter((item) => {
        const values = Object.values(item);

        console.log({ values });
        const find = values.find((val) => {
          if (!val) return false;
          const value = val.toString().toLowerCase();
          return value.includes(keywords);
        });
        return find;
      });
    setSearchResults(filteredData);
  }, [data, keywords]);
  const columns = [
    {
      Header: "Id",
      accessor: "id",
      width: "5%",
      sortMethod: (a, b) => Number(a) - Number(b),
      Cell: ({ cell }) => <div className="text-left">{cell.value}</div>,
    },
    {
      Header: t("timesheets:firstName"),
      accessor: "task.user.firstName",
      Cell: ({ cell }) => <div className="text-left">{cell.value}</div>,
    },
    {
      Header: t("timesheets:lastName"),
      accessor: "task.user.lastName",
      Cell: ({ cell }) => <div className="text-left">{cell.value}</div>,
    },
    {
      Header: t("timesheets:startedOn"),
      accessor: "startedOn",
      // width: "15%",
      Cell: ({ cell: { value } }) => {
        return (
          <div className="font-bold text-left">
            <DateFormatter date={value} option={option} />
          </div>
        );
      },
    },
    {
      Header: t("timesheets:endedOn"),
      accessor: "endedOn",
      // width: "15%",
      Cell: ({ cell: { value } }) => {
        return (
          <div className="font-bold text-left">
            <DateFormatter date={value} option={option} />
          </div>
        );
      },
    },
    {
      Header: t("timesheets:statut"),
      accessor: "task.room.status",
      width: "15%",
      Cell: ({ cell, row }) => {
        if (!cell.value) {
          return <SecondaryText text={t("not_defined")} />;
        }
        let bg = "bg-white";
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
          <div className="flex justify-between items-center">
            <span
              className={
                "px-8 py-4 rounded-4 whitespace-nowrap text-center " + bg
              }
            >
              {t(`timesheets:status.status_${cell.value}`)}
            </span>
          </div>
        );
      },
    },
    {
      Header: t("timesheets:number"),
      accessor: "task.room.number",
      Cell: ({ cell }) => <div className="text-left">{cell.value}</div>,
    },
    {
      Header: t("rooms:options"),
      id: "action",
      width: "5%",

      sortable: false,
      Cell: ({ row }) => {
        return (
          <div className="inline-flex">
            <EditButton refetch={refetch} row={row?.original} />
            <DeleteButton refetch={refetch} id={row?.original?.id} />
          </div>
        );
      },
    },
  ];
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
          title=""
          options={{
            subTitleComponemt: (
              <div className="p-20 text-right">
                <TaskDatePicker />
              </div>
            ),
          }}
        />
      )}
    </>
  );
}

export default List;
