import React, { useState, useEffect, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import AssignmentLayout from "./Layout";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const ROOM_QUERY = gql`
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
      graTasks {
        id
        assignedOn
      }
    }
    users {
      id
      email
      lastName
      profileImage
      active
      admin
      role {
        id
      }
    }
  }
`;

function AssignmentWrapper({ date, tasks, tomorrow }) {
  const { t } = useTranslation();

  const { data, loading } = useQuery(ROOM_QUERY, {
    fetchPolicy: "no-cache",
  });
  const rooms = useMemo(() => {
    return data?.rooms || [];
  }, [data]);

  const staff = useMemo(() => {
    return data?.users || [];
  }, [data]);

  const [dragableRooms, setDragableRooms] = useState(rooms);

  useEffect(() => {
    const stateRoom = tasks.map((e) => {
      const dd = { room: e?.room, user: e?.user };
      return dd;
    });
    if (Array.isArray(rooms)) {
      setDragableRooms(
        rooms.map((el) => {
          const assignedRoom = stateRoom.find(
            (state) => parseInt(el?.id) === parseInt(state?.room?.id)
          );
          return {
            ...el,
            assignedTo: assignedRoom?.user?.id ? assignedRoom.user.id : null,
            lastName: assignedRoom?.user?.lastName
              ? assignedRoom.user.lastName
              : "",
            email: assignedRoom?.user?.email ? assignedRoom.user.email : "",
          };
        })
      );
    }
  }, [rooms, tasks]);
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
        <AssignmentLayout
          setDragableRooms={setDragableRooms}
          rooms={dragableRooms}
          staff={staff}
          date={date}
          tomorrow={tomorrow}
          tasks={tasks}
        />
      )}
    </>
  );
}

export default AssignmentWrapper;
