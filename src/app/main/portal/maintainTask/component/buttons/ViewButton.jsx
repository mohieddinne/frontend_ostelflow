import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { gql, useMutation, useQuery } from "@apollo/client";
import Formsy from "formsy-react";
import * as MainActions from "app/store/actions";
import { SelectFormsy } from "@fuse";
import MenuItem from "@material-ui/core/MenuItem";

const gQlQueryUsers = gql`
  query users($conditions: [ConditionsInput]) {
    users(conditions: $conditions) {
      id
      email
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
`;

const gQl = gql`
  mutation updateMaintananceTask($params: TaskInput) {
    updateMaintananceTask(params: $params)
  }
`;
function ViewButton({ item, refetch }) {
  console.log({ refetch });
  const prob = item.problem;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(true);

  const [updateMaintananceTask] = useMutation(gQl);
  const { data } = useQuery(gQlQueryUsers, {
    variables: { conditions: [{ name: "role_id", value: "4" }] },
  });

  const handleSubmit = (model) => {
    const id = model.assigned_to;
    const params = {
      user: { id },
      id: item.id,
    };
    updateMaintananceTask({
      variables: {
        params,
      },
    })
      .then((res) => {
        refetch();

        dispatch(MainActions.closeDialog());
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") console.error(error);
      });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t("maintainTasks:maintain_task_edit"),
        content: (
          <>
            <div className="flex p-8 w-full justify-between">
              <div>Description: {item.description}</div>
              <div>
                Probleme:
                <span
                  className={
                    " px-8 py-4 rounded-full border-1 whitespace-nowrap text-white font-bold bg-gray-600 "
                  }
                >
                  {t(`maintainTasks:problemType.problem${prob}`)}
                </span>
              </div>
              <div>Chambre N°: {item.room?.number}</div>
            </div>
            <Formsy
              onSubmit={handleSubmit}
              preventDefaultSubmit={true}
              onValid={() => {
                !isValid && setValid(true);
              }}
              onInvalid={() => {
                isValid && setValid(false);
              }}
              className=" p-8 "
            >
              <SelectFormsy
                className="w-full"
                variant="outlined"
                id="assigned_to"
                name="assigned_to"
                label={t("maintainTasks:assigned_to")}
                required
                validationError={t("rooms:error.field_required")}
                value={data?.users[0]?.firstName}
              >
                {data?.users?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.firstName}
                    </MenuItem>
                  );
                })}
              </SelectFormsy>
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
          </>
        ),
      })
    );
  };

  return (
    <Tooltip title={t("rooms:edit")}>
      <IconButton onClick={handleClick}>
        <Icon>edit</Icon>
      </IconButton>
    </Tooltip>
  );
}

export default withRouter(ViewButton);
