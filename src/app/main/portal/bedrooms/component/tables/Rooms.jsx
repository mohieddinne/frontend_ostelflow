import React, { useEffect } from "react";
import RoomsUi from "./RoomsUi";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/action";

const SUBSCRIPTION = gql`
  subscription notifications {
    notifications {
      id
      data {
        ... on Room {
          id
        }
      }
    }
  }
`;

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
  const dispatch = useDispatch();
  const { loading, data, error, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
  });
  const { data: dataSub } = useSubscription(SUBSCRIPTION);
  useEffect(() => {
    refetch();
  }, [dataSub, data]);
  dispatch(Actions.setRooms(data?.rooms));

  return <RoomsUi loading={loading} refetch={refetch} error={error} />;
}

export default List;
