import React, { useEffect, useRef, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { showMessage } from "app/store/actions";
import { useTranslation } from "react-i18next";
import { updateData } from "../../store/action";

const toggleUserActivation = gql`
  mutation toggleDnD($data: RoomInput!) {
    toggleDnD(data: $data) {
      id
      dnd
    }
  }
`;

function ChangeDnDStatus(props) {
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
          id: parseInt(props.roomId),
          dnd: !value,
        },
      },
    })
      .then(() => {
        dispatch(
          updateData({
            id: parseInt(props.roomId),
            dnd: !value,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        variant = "error";
      })
      .finally(() => {
        dispatch(
          showMessage({
            message: t(`rooms:${variant}.toggle_dnd`),
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

export default ChangeDnDStatus;
