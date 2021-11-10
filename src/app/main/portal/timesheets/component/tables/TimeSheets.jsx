import React, { useEffect } from "react";
import TimeSheetsUi from "./TimeSheetsUi";
import { useLazyQuery, gql } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/action";
import { useLocation } from "react-router-dom";

const query = gql`
  query taskAttend($date: String, $input: String, $UserId: ID) {
    taskAttend(date: $date, input: $input, UserId: $UserId) {
      id
      startedOn
      endedOn
      task {
        user {
          firstName
          lastName
        }
        room {
          status
          number
        }
      }
    }
  }
`;
function List() {
  const dispatch = useDispatch();
  const location = useLocation();
  const UserId = location?.state?.UserId;
  const Today = location?.state?.Date;
  let date = null;
  const dateStore = useSelector(({ timesheetsApp }) => timesheetsApp.date);

  if (Today) {
    date = Today;
  } else {
    date = dateStore;
  }
  const keyword = useSelector(({ timesheetsApp }) => timesheetsApp.searchText);
  const [getTasks, { loading, data, error, refetch }] = useLazyQuery(query, {
    variables: { date: date, input: keyword, UserId },
  });
  useEffect(() => {
    getTasks();
    dispatch(Actions.setTimesheets(data?.taskAttend));
  }, [date, keyword]);
  return (
    <TimeSheetsUi
      data={data?.taskAttend}
      loading={loading}
      refetch={refetch}
      error={error}
    />
  );
}

export default List;
