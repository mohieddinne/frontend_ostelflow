import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { useMutation, gql } from "@apollo/client";

const gQl = gql`
  mutation timeSheets($data: TimeSheetInput!) {
    timeSheets(data: $data) {
      endedOn
      startedOn
      id
    }
  }
`;

const useStyles = makeStyles(() => ({
  btnStart: {
    width: "131px",
    height: "33px",
    borderRadius: "4px",
    background: " #059669",
    
    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#fff",
    padding: "0.6rem 0.8rem",
  },
}));
function EndButton({
  showRoomDetails,
  setShowRoomDetails,
  roomId,
  taskId,
  timeSheetId,
  dateStart,
}) {
  const [diff, setdiff] = useState(0);
  useEffect(() => {
    if (!dateStart) {
      setdiff(0);
    } else
      setdiff(
        parseInt(
          new Date().getTime() -
            new Date(parseInt(dateStart || new Date())).getTime()
        ) / 1000
      );
  }, [dateStart]);
  const classes = useStyles();
  useEffect(() => {
    setInterval(() => {
      setdiff((diff) => diff + 1);
    }, 1000);
  }, []);
  let workingTime = "";
  const [mutate] = useMutation(gQl);

  workingTime = new Date(diff * 1000).toISOString().substr(14, 5);
  function handleEnd() {
    mutate({
      variables: {
        data: {
          roomId: parseInt(roomId),
          taskId,
          startedOn: null,
          endedOn: new Date(),
          timeSheetId,
        },
      },
    })
      .then(() => {
        setShowRoomDetails(!showRoomDetails);
        localStorage.setItem("showRoomDetails", !showRoomDetails);
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  return (
    <Button className={classes.btnStart} onClick={() => handleEnd()}>
      {workingTime} || end
    </Button>
  );
}

export default EndButton;
