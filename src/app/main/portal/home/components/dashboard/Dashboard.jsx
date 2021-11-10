import React from "react";
import StaffCardWrapper from "./StaffCardWrapper";
import { useQuery, gql } from "@apollo/client";

const gQlQuery = gql`
  query {
    GraUsers {
      id
      firstName
      lastName
      active
      activityLogs {
        description
        userName
        userEmail
        createdAt
      }
      graTasks {
        assignedOn
        room {
          id
          number
          status
        }
        timesheets {
          startedOn
          endedOn
          id
        }
      }
    }
  }
`;
function Dashboard() {
  const { data } = useQuery(gQlQuery, {
    fetchPolicy: "no-cache",
  });
  return <StaffCardWrapper data={data?.GraUsers} />;
}

export default Dashboard;
