import { useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/actions";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import CustomButton from "./CustomButton";

const SAVE_Todos = gql`
  mutation ($name: String!, $blob: String!) {
    saveTodos(data: { name: $name, blob: $blob }) {
      id
      name
      blob
    }
  }
`;

function SaveFavorite(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation("");

  const [open, setOpen] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [name, setName] = useState("");

  const [exec] = useMutation(SAVE_Todos);

  const handleMessage = (message, variant, replacements = {}) => {
    dispatch(
      showMessage({
        message: t(message, replacements),
        autoHideDuration: 3000,
        variant, // success error info warning null
      })
    );
  };

  const handleSave = () => {
    const model = props.todos;
    if (!model || Object.keys(model).length <= 0) {
      handleMessage("no_filter_was_applied", "warning");
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = () => {
    const todos = props.todos;
    const tasks = todos.map((e) => {
      const t = {
        id: e.id,
        name: e.name,
        icon: e.icon,
      };
      return t;
    });
    const blob = JSON.stringify(tasks);
    exec({ variables: { name, blob } })
      .then(() => {
        handleMessage("your_todos_is_saved", "success", { name });
        // Call on success on the parent
        if (typeof props.onSuccess === "function") {
          props.onSuccess();
        }
        setOpen(false);
      })
      .catch((error) => {
        console.log({ error });
        handleMessage("error_saving_todos", "error");
      });
  };

  return (
    <>
      <CustomButton
        onClick={handleSave}
        variant="contained"
        size="small"
        disableElevation
      >
        <SaveIcon fontSize="small" />
      </CustomButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Favoris</DialogTitle>
        <div className="px-24 pb-24">
          <p>{t("saving_the_filters_p1")}</p>
          <p>{t("saving_the_filters_p2")}</p>
          <TextField
            className="my-16"
            variant="outlined"
            fullWidth={true}
            label="Favoris"
            name="name"
            required={true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (name === "" && submittable) {
                setSubmittable(false);
              } else if (!submittable) {
                setSubmittable(true);
              }
            }}
            InputProps={{ autoComplete: "off" }}
          />
          <div className="flex gap-8 justify-end">
            <Button
              onClick={() => setOpen(false)}
              disableElevation
              variant="outlined"
            >
              annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disableElevation
              variant="contained"
              color="primary"
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default SaveFavorite;
