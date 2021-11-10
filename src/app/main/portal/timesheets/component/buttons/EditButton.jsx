import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import Formsy from "formsy-react";
import DateAndTimePickers from "@catu/components/formsy/DateTimePickerFormsy";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import * as MainActions from "app/store/actions";
import Button from "@material-ui/core/Button";
import { gql, useMutation } from "@apollo/client";

const gQl = gql`
  mutation updateTimesheet($id: ID, $startedOn: String, $endedOn: String) {
    updateTimesheet(id: $id, startedOn: $startedOn, endedOn: $endedOn) {
      id
      task {
        id
        roomId
      }
    }
  }
`;
function EditButton(props) {
  const {
    row: {
      task,

      id,
      startedOn: start,
      endedOn: end,
    },
    refetch,
  } = props;
  const [isValid, setValid] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [updateTimesheet] = useMutation(gQl);

  const handleSubmit = (model) => {
    if (isValid)
      updateTimesheet({
        variables: {
          ...model,
          id,
        },
      })
        .then((res) => {
          dispatch(MainActions.closeDialog());
          refetch();
          console.log({ res });
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== "production") console.error(error);
        });
  };

  function cnvrtStatut(statut) {
    if (statut === 1) return " Nettoyé ";
    if (statut === 3) return "  A néttoyer ";
    else return " A vérifier ";
  }
  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t("Modifier Timesheet"),
        content: (
          <div className="flex flex-col gap-12">
            <div>
              Employé: {clsx(task?.user?.lastName, task?.user?.firstName)}
            </div>
            <div>Chambre N°: {task?.room?.number}</div>
            <div>Statut de la chambre: {cnvrtStatut(task?.room?.status)}</div>
            <Formsy
              onSubmit={handleSubmit}
              preventDefaultSubmit={true}
              onValid={() => {
                !isValid && setValid(true);
              }}
              onInvalid={() => {
                isValid && setValid(false);
              }}
              className=""
            >
              <div className="inline-flex gap-8 justify-between">
                <DateAndTimePickers
                  className="w-full"
                  name="startedOn"
                  inputVariant="outlined"
                  id="startedOn"
                  label={t("startedOn")}
                  value={new Date(parseInt(start))}
                  ampm={false}
                />
                <DateAndTimePickers
                  className="w-full"
                  name="endedOn"
                  inputVariant="outlined"
                  id="endedOn"
                  label={t("endedOn")}
                  value={new Date(parseInt(end))}
                  ampm={false}
                />
              </div>
              <div className="w-full inline-flex justify-end py-4">
                <Button
                  onClick={() => {
                    dispatch(MainActions.closeDialog());
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit">CONFIRMER</Button>
              </div>
            </Formsy>
          </div>
        ),
        // actions: [
        //   <Button
        //     onClick={() => {
        //       dispatch(MainActions.closeDialog());
        //     }}
        //   >
        //     {t("cancel")}
        //   </Button>,
        //   <Button
        //     onClick={() => {
        //       handleSubmit();
        //     }}
        //   >
        //     CONFIRMER
        //   </Button>,
        // ],
      })
    );
  };
  return (
    <IconButton onClick={handleClick}>
      <Icon>edit</Icon>
    </IconButton>
  );
}

export default withRouter(EditButton);
