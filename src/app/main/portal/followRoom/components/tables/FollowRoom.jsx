import React from "react";
import FollowRoomUi from "./FollowRoomUi";
import { useQuery, gql } from "@apollo/client";
import NoDataComponent from "@catu/components/Table/components/bodies/NoData";

const query = gql`
  query rooms {
    rooms {
      id
      number
      floor
      status
      attendance
      dnd
      startAt
      expiresAt
      type {
        id
        value
      }
      occupants {
        category
        count
      }
      __typename
    }
  }
`;
function List() {
  const { loading, data, error, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
  });
  return (
    <>
      {data?.rooms.length === 0 ? (
        <div className="flex justify-center">
          <NoDataComponent />
        </div>
      ) : (
        <FollowRoomUi
          loading={loading}
          refetch={refetch}
          error={error}
          data={data?.rooms}
        />
      )}
    </>
  );
}

export default List;
