import React, { useEffect } from "react";
import TaskUi from "./TaskUi";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/action";

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
  const dispatch = useDispatch();
  const { loading, data, error, refetch } = useQuery(query, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    dispatch(Actions.setRooms(data?.maintainTasks));
  }, [data, dispatch]);

  return <TaskUi loading={loading} refetch={refetch} error={error} />;
}

export default List;
