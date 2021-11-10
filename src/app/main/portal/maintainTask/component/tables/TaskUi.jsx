import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import EnhancedTable from "@catu/components/Table/EnhancedTable";
import { useTranslation } from "react-i18next";
import DeleteButton from "../buttons/DeleteButton";
import SecondaryText from "@catu/components/SecondaryText";
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

  const keywords = useSelector(({ maintainTasksApp }) =>
    maintainTasksApp.searchText.toLowerCase()
  );

  const dataup = useSelector(({ maintainTasksApp }) => maintainTasksApp.data);

  // const hasEditAccess = FuseUtils.hasPermission({
  //   slug: "room_management",
  //   permission: "can_edit",
  // });

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
        Header: t("maintainTasks:number"),
        accessor: "room.number",
        Cell: ({ cell: { value } }) => {
          return <div className="font-bold "> {value}</div>;
        },
        width: "15%",
      },
      {
        Header: t("maintainTasks:description"),
        accessor: "description",

        Cell: ({ cell }) => {
          if (!cell.value) {
            return <SecondaryText text={t("not_defined")} />;
          }
          return <span className="font-bold text-center">{cell.value}</span>;
        },
        width: "40%",
      },
      {
        Header: t("maintainTasks:assigned_to"),
        accessor: "user.firstName",

        Cell: ({ cell }) => {
          if (!cell.value) {
            return <SecondaryText text={t("not_defined")} />;
          }
          return <span className="font-bold text-center">{cell.value}</span>;
        },
      },
      {
        Header: t("maintainTasks:problem"),
        accessor: "problem",

        Cell: ({ cell, row }) => {
          if (!cell.value) {
            return <SecondaryText text={t("not_defined")} />;
          }
          let bg = "bg-white";
          switch (cell.value) {
            case "1":
              bg = "bg-green";
              break;
            case "2":
              bg = "bg-orange";
              break;
            case "3":
              bg = "bg-red";
              break;
            case "4":
              bg = "bg-blue";
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
                {t(`maintainTasks:problemType.problem${cell.value}`)}
              </span>
            </div>
          );
        },
      },

      {
        Header: t("rooms:options"),
        id: "action",
        width: "5%",

        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {/* <ViewButton item={row.original} refetch={refetch} /> */}
            <DeleteButton id={row.original.id} />
          </div>
        ),
      },
    ],
    [t]
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
