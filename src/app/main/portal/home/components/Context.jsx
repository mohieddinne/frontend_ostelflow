import React, { useState } from "react";
import HomeContent from "./HomeContent";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
const HomeContext = React.createContext({});

const QUERY = gql`
  query storedTimesheetActive($id: Int) {
    storedTimesheetActive(id: $id) {
      startedOn
      endedOn
      id
      task {
        id
        room {
          id
          number
          dnd
          status
        }
        user {
          id
          email
          lastName
        }
      }
    }
  }
`;

export function HomeContextContainer(props) {
  const id = parseInt(useParams().id);
  const IdRoom = parseInt(useParams().roomId);

  const { data } = useQuery(QUERY, {
    variables: { id },
    skip: !id,
  });
  const taskData = data?.storedTimesheetActive?.task;
  const [RoomNumber, setRoomNumber] = useState(taskData?.room?.number);
  const [dnd, setDnd] = useState(taskData?.room?.dnd);
  const [status, setStatus] = useState(taskData?.room?.status);
  const [timeSheetId, settimeSheetId] = useState(null);

  const dateStart = data?.storedTimesheetActive?.startedOn;
  return (
    <HomeContext.Provider
      value={{
        showRoomDetails: id,
        IdRoom,
        RoomNumber,
        setRoomNumber,
        taskId: id,
        dnd,
        setDnd,
        status,
        setStatus,
        settimeSheetId,
        timeSheetId,
        dateStart,
      }}
    >
      <HomeContent {...props} />
    </HomeContext.Provider>
  );
}

export default HomeContext;
