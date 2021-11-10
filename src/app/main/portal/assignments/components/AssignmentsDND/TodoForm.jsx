import React from "react";
import { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as MainActions from "app/store/actions";
import IconPickerFormsy from "./IconPickerFormsy";
import TodoList from "./TodoList";
import { useMutation, gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputSelect from "./InputSelect";
import SaveFavorite from "./SaveFavorite";
import Typography from "@material-ui/core/Typography";

const TODOS_QUERY = gql`
  query graTodosItems($ids: [ID], $TaskId: [ID]) {
    graTodosItems(ids: $ids, TaskId: $TaskId) {
      id
      name
      icon
      checkedOn
      checkedBy
    }
  }
`;
const SAVED_TODOS_QUERY = gql`
  query savedTodos($ids: [ID]) {
    savedTodos(ids: $ids) {
      id
      name
      blob
    }
  }
`;
const CREATE_TODO = gql`
  mutation createTodoItem($tododata: [TodoItemInput]) {
    createTodoItem(tododata: $tododata) {
      name
      icon
    }
  }
`;
const DELETE_TODOS = gql`
  mutation deleteRecentTodos($taskId: ID) {
    deleteRecentTodos(taskId: $taskId)
  }
`;
const useStyles = makeStyles(() => ({
  container: {
    minWidth: "200px",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  button: {
    height: "30px",
    minWidth: "2rem",
  },
  label: {
    color: "gray",
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "left",
    color: "#202020",
    gap: "1rem",
  },
}));

function TodoForm({ room, date, AssignRoom }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [favorite, setFavorite] = useState("");
  const { data, refetch } = useQuery(TODOS_QUERY, {
    variables: { TaskId: AssignRoom[0]?.id },
    fetchPolicy: "no-cache",
  });
  const { data: savedTodos } = useQuery(SAVED_TODOS_QUERY);
  React.useEffect(() => {
    if (data) {
      setTodos(data?.graTodosItems);
    }
  }, [data]);
  const [createTodoItem] = useMutation(CREATE_TODO);
  const [isValid, setValid] = React.useState(true);
  const ref = React.useRef();
  const [exec] = useMutation(DELETE_TODOS);

  const handleChange = (event) => {
    const todo = event.target.value;
    setFavorite(todo);
  };
  let blob = [];
  React.useEffect(() => {
    if (favorite) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      blob = JSON.parse(favorite.blob);
      //exec({ variables: { taskId: AssignRoom[0]?.id } }).then(() => {});
      const tddata = blob.map((e) => {
        return {
          name: e.name,
          icon: e.icon,
          RoomID: room.id,
          taskId: AssignRoom[0]?.id,
        };
      });
      console.log({ tddata });
      createTodoItem({
        variables: {
          tododata: tddata,
        },
      }).then(({ data }) => {
        console.log({ data });
      });
      setTodos(blob);
    }
  }, [favorite]);

  const handleSubmit = (e) => {
    let _todos = [];
    if (!e.name && !e.icon) {
      _todos = [...todos];
    } else _todos = [...todos, e];
    console.log({ _todos });
    setTodos(_todos);
    const tddata = _todos.map((e) => {
      return {
        name: e.name,
        icon: e.icon,
        RoomID: room.id,
        taskId: AssignRoom[0]?.id,
      };
    });
    createTodoItem({
      variables: {
        tododata: tddata,
      },
    }).then(({ data }) => {
      console.log({ data });
    });

    ref?.current.reset();
  };
  function handelReset() {
    exec({ variables: { taskId: AssignRoom[0]?.id } }).then((res) => {
      refetch();
    });
  }
  return (
    <div>
      <div className="flex justify-between">
        <Typography className={classes.title}>
          {t("Assign:room") + " " + room?.number}{" "}
        </Typography>
        <Button
          onClick={() => {
            handelReset();
          }}
        >
          {t("reset")}
        </Button>
      </div>

      <Formsy
        onSubmit={handleSubmit}
        ref={ref}
        preventDefaultSubmit={true}
        onValid={() => {
          !isValid && setValid(true);
        }}
        onInvalid={() => {
          isValid && setValid(false);
        }}
      >
        <div className=" flex justify-between p-8 ">
          <TextFieldFormsy
            label={t("Task")}
            validations={{
              isAlphanumeric: true,
            }}
            validationErrors={{
              required: t("error.form.required"),
              isSpecialWords: t("UserModule:error.please_enter_a_valid_name"),
            }}
            autoFocus
            id="todo"
            name="name"
            fullWidth
            className="w-1/2 p-4"
            variant="outlined"
          />
          <IconPickerFormsy
            className="w-1/2 p-4"
            autoComplete="off"
            name="icon"
            id="icon"
            label="Icon"
            cancelLabel="Annuler"
            modalTitle="Sélectionner une icône"
            pickLabel="Choisir"
            searchLabel="Rechercher"
            noIcons="Pas d'icone"
            variant="outlined"
          />
        </div>
        <TodoList todos={todos} AssignRoom={AssignRoom} refetch={refetch} />
        <div className={clsx(classes.container, "flex justify-end")}>
          <div className={classes.label}>{t("your_favorites")}</div>
          <FormControl className=" sm:w-full md:w-2/3 lg:w-1/2 ">
            <Select
              value={favorite}
              onChange={handleChange}
              input={<InputSelect placeholder="Hello" />}
            >
              {savedTodos?.savedTodos?.map((savedtodo) => (
                <MenuItem
                  value={savedtodo}
                  key={savedtodo.id}
                  className="w-full"
                >
                  {savedtodo.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <SaveFavorite todos={todos} />
        </div>
        <div className="w-full inline-flex justify-end py-4">
          <Button
            color="default"
            autoFocus
            variant="contained"
            disableElevation
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
  );
}

export default TodoForm;
