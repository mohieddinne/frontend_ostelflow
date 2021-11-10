import React from "react";
import MaintainTaskUi from "./MaintainTaskUi";
import { useQuery, gql } from "@apollo/client";
import NoDataComponent from "@catu/components/Table/components/bodies/NoData";

const query = gql`
  query maintainTasks($ids: [Int]) {
    maintainTasks(ids: $ids) {
      id
      assignedOn
      priority
      description
      problem
      createdBy
      roomId
      status
      room {
        id
        number
      }
      user {
        id
        firstName
      }
    }
  }
`;
function List() {
  const { loading, data, error, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
  });
  console.log({ data: data?.maintainTasks });
  return (
    <>
      {data?.maintainTasks.length === 0 ? (
        <div className="flex justify-center">
          <NoDataComponent />
        </div>
      ) : (
        <MaintainTaskUi
          loading={loading}
          refetch={refetch}
          error={error}
          data={data?.maintainTasks}
        />
      )}
    </>
  );
}

export default List;
