import React, { useEffect, useRef, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import { useMutation, gql } from "@apollo/client";
import { showMessage } from "app/store/actions";
import { useTranslation } from "react-i18next";

const toggleUserActivation = gql`
  mutation user($data: UserInput!) {
    user(data: $data)
  }
`;

function UserSwitchComponent(props) {
  const { t } = useTranslation();
  const valueRef = useRef(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.value);

  const [exec, { loading }] = useMutation(toggleUserActivation);

  useEffect(() => {
    setValue(props.value);
  }, [props]);

  function handleChange() {
    let variant = "success";
    exec({
      variables: {
        data: {
          id: props.userId,
          active: !value,
        },
      },
    })
      .then(() => {
        dispatch(Actions.toggleUserActivation(props.userId));
      })
      .catch((err) => {
        console.error(err);
        variant = "error";
      })
      .finally(() => {
        dispatch(
          showMessage({
            message: t(`UserModule:${variant}.toggle`),
            autoHideDuration: 3000,
            variant,
          })
        );
      });
  }

  return (
    <Switch
      value="actif"
      checked={value}
      ref={valueRef}
      onChange={handleChange}
      disabled={loading}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}

export default UserSwitchComponent;
