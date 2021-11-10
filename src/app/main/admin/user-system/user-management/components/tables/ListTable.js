import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EnhancedTable from "@catu/components/Table/EnhancedTable";
import UserSwitchComponent from "./UserSwitchComponent";
import BtnUserDeleteIconComponent from "../misc/BtnUserDeleteIcon";
import BtnEditUserComponent from "../misc/BtnEditUserComponent";
import TimeAgo from "@catu/components/TimeAgo";
import { useQuery, gql } from "@apollo/client";
import { setData } from "../../store/actions";
import ErrorComponent from "@catu/components/Error";

const gQlQuery = gql`
  query {
    users {
      id
      email
      firstName
      lastName
      lastLogin
      role {
        name
      }
      active
    }
  }
`;

function UsersTable() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = useSelector(({ userManagementApp }) => userManagementApp.data);
  const searchText = useSelector(
    ({ userManagementApp }) => userManagementApp.searchText
  );

  const { loading, error, data: gqlData } = useQuery(gQlQuery);

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    //TODO fetch data
    if (gqlData?.users) {
      dispatch(setData(gqlData.users));
    }
  }, [gqlData, dispatch]);

  useEffect(() => {
    if (!searchText) {
      setDataArray(data);
    } else {
      const keyword = searchText.toLowerCase();
      const filters = ["firstName", "lastName", "email"];
      if (Array.isArray(data)) {
        setDataArray(
          data.filter((element) => {
            for (const filterBy of filters) {
              if (element[filterBy].toLowerCase().indexOf(keyword) >= 0) {
                return true;
              }
            }
            return false;
          })
        );
      }
    }
  }, [searchText, data]);

  const columns = React.useMemo(
    () => [
      {
        Header: t("user.first_name"),
        accessor: "firstName",
        className: "font-bold",
        sortable: true,
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center">
              <Avatar
                className="mr-8"
                alt={original.firstName + " " + original.lastName}
                src={original.profileImage}
              />
              {original.firstName}
            </div>
          );
        },
      },
      {
        Header: t("user.last_name"),
        accessor: "lastName",
        className: "font-bold",
        sortable: true,
      },
      {
        Header: t("email"),
        accessor: "email",
        sortable: true,
      },
      {
        Header: t("last_login"),
        accessor: "lastLogin",
        sortable: true,
        Cell: ({ row: { original } }) => {
          return <TimeAgo date={original.lastLogin} />;
        },
      },
      {
        Header: t("user.role"),
        accessor: "role.name",
        sortable: true,
        Cell: ({ row: { original } }) => {
          let role = (original.role || { name: t("not_defined") }).name;
          return role;
        },
      },
      {
        Header: t("user.active"),
        accessor: "active",
        sortable: true,
        width: "10%",
        Cell: (data) => {
          return (
            <UserSwitchComponent
              value={data.row.original.active}
              userId={data.row.original.id}
            />
          );
        },
      },
      {
        Header: t("actions"),
        sortable: true,
        width: "10%",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <BtnUserDeleteIconComponent userId={row.original.id} />
              <BtnEditUserComponent userId={row.original.id} />
            </div>
          );
        },
      },
    ],
    [t]
  );

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <EnhancedTable
      classesNames="min-h-full sm:border-1"
      loading={loading}
      columns={columns}
      data={dataArray}
      //   onRowClick={(ev, row) => viewItem(row.original)}
      selectable={false}
    />
  );
}

export default withRouter(UsersTable);
