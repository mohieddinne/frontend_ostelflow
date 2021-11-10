import React from "react";
import { Button, Dialog, Typography, Toolbar, AppBar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../store/action";
import { useHistory } from "react-router-dom";

function EventDialog() {
  const dispatch = useDispatch();
  const history = useHistory();

  const eventDialog = useSelector(
    ({ AssignmentApp }) => AssignmentApp.eventDialog
  );
  function closeComposeDialog() {
    eventDialog.type === "edit"
      ? dispatch(Actions.closeEditAssignmentDialog())
      : dispatch(Actions.closeNewAssignmentDialog());
  }
  const assignment = eventDialog.data;
  function handleClick() {
    history.push({
      pathname: "/app/assignments/item",
      state: { assignment },
    });
  }

  return (
    <Dialog
      {...eventDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
      component="form"
    >
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {eventDialog.type === "new"
              ? "Affecter des chambres"
              : "Modifier l'affectation"}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="py-24 px-8 max-w-2xl">
        {eventDialog.type === "new" ? (
          <div className="flex justify-center">
            <div>Tu vas ajouter des nouveaux affectations </div>
            <Button
              variant="contained"
              color="secondary"
              className="w-224 mx-auto mt-16"
              onClick={handleClick}
            >
              ajouter
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="subtitle1" color="inherit">
              <span>Nom d'employé</span> : <span>{assignment?.title}</span>
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              <span>Nombre des affectations</span> :
              <span>{assignment?.nbr__of_assignments}</span>
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              className="w-224 mx-auto mt-16 place-self-end"
              onClick={handleClick}
            >
              Modifier
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default EventDialog;
