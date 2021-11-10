import React from "react";
import { TextFieldFormsy } from "@fuse";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Formsy from "formsy-react";
import { ReactComponent as Bed } from "../../../icon/bed.svg";
import { ReactComponent as Shower } from "../../../icon/shower.svg";
import { ReactComponent as Light } from "../../../icon/light.svg";
import { ReactComponent as Tv } from "../../../icon/tv.svg";
import clsx from "clsx";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/actions";
import { useTranslation } from "react-i18next";

const gQl = gql`
  mutation createMaintananceTask($params: TaskInput!) {
    createMaintananceTask(params: $params) {
      roomId
      id
      problem
      status
      createdBy
      description
      assignedOn
    }
  }
`;
const useStyles = makeStyles(() => ({
  btnReport: {
    width: "150px",
    height: "50px",
    borderRadius: "4px",
    background: "#374151",

    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#fff",
    "&:hover": {
    
        background: "grey",
        color: "white",
      },
  },
}));
function Issues({ room }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [problem, setProblem] = React.useState("0");

  const dispatch = useDispatch();

  const problemValue = { problem };
  const [createTask] = useMutation(gQl);
  const handleResponse = ({ data, error, isNew, exit }) => {
    let variant = "success";
    if (error) {
      variant = "error";
    }
    const message = t(`HomeApp:${variant}.${"maintain_task"}`, {
      name: data && data.name,
    });
    dispatch(
      showMessage({
        message,
        autoHideDuration: 3000,
        variant,
      })
    );

    if ((!error && exit) || (isNew && !error && exit));
  };
  console.log({ problemValue });

  function handleSubmit(e) {
    let error = "Vous n'avez pas specifier la probleme";

    if (problemValue.problem !== "0") {
      const params = {
        ...e,
        ...problemValue,
        ...{ status: 4 },
        ...{ roomId: room.id },
        ...{ assignedOn: new Date() },
      };
      createTask({
        variables: {
          params,
        },
      })
        .then(({ data }) => {
          handleResponse({ data });
          setProblem("");
        })
        .catch((error) => {
          handleResponse({ error });
          console.log({ error });
        });
    } else handleResponse({ error });
  }
  // bed =1
  //shower =2
  //light=3
  //tv =4

  return (
    <Formsy
      className="rounded-8 200 border-1 p-8 bg-white"
      onValidSubmit={handleSubmit}
    >
      <strong className="ml-8 sm:text-13 md:text-17">Issues</strong>
      <div className="grid grid-cols-4 gap-2 mt-4">
        <div onClick={() => setProblem("1")} className="rounded-8">
          <Bed className="w-4/5" fill={problem === "1" ? " #fbbf24" : "none"} />
        </div>

        <div onClick={() => setProblem("2")} className=" rounded-8">
          <Shower
            className="w-4/5"
            fill={problem === "2" ? " #fbbf24" : "none"}
          />
        </div>
        <div onClick={() => setProblem("3")} className=" rounded-8">
          <Light
            className="w-4/5"
            fill={problem === "3" ? " #fbbf24" : "none"}
          />
        </div>
        <div onClick={() => setProblem("4")} className=" rounded-8">
          <Tv className="w-4/5" fill={problem === "4" ? " #fbbf24" : "none"} />
        </div>
      </div>

      <TextFieldFormsy
        id="outlined-multiline-static"
        label="More details"
        multiline
        rows={2}
        name="description"
        defaultValue="More details"
        variant="outlined"
        className="w-full mt-8"
      />
      <div className="flex justify-end ">
        <Button className={clsx(classes.btnReport, " mt-8")} type="submit">
          send Report
        </Button>
      </div>
    </Formsy>
  );
}

export default Issues;
