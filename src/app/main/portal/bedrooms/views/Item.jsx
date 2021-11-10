import React, { useRef, useEffect } from "react";
import CatuFilePageCarded from "@catu/components/PageLayouts/carded/CatuFilePageCarded";
import withReducer from "app/store/withReducer";
import { useDispatch } from "react-redux";
import reducer from "../store/reducer";
import * as Actions from "../store/action";
import { useTranslation } from "react-i18next";
import HeaderForm from "@catu/components/HeaderForm";
import { showMessage } from "app/store/actions";
import { useParams } from "react-router-dom";
import Form from "../component/tabs/Form";
import { makeStyles } from "@material-ui/core";
import { useMutation, useQuery, gql } from "@apollo/client";

const query = gql`
  query rooms($ids: [ID]) {
    rooms(ids: $ids) {
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
      __typename
    }
  }
`;
const CREATE = gql`
  mutation createRoom($data: RoomInput) {
    createRoom(data: $data) {
      id
      number
      floor
      status
      attendance
      dnd
      startAt
      expiresAt
      type {
        value
      }
      occupants {
        category
        count
      }
    }
  }
`;
const UPDATE = gql`
  mutation updateRoom($data: RoomInput) {
    updateRoom(data: $data) {
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
    }
  }
`;
const useStyle = makeStyles(() => ({
  content: {
    position: "static !important",
  },
}));

function StateHandler(props) {
  const classes = useStyle();
  const formRef = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  let skip = true;

  let id = null;
  if (itemId !== "new" && parseInt(itemId)) {
    dispatch(Actions.updateFormData({ load: t("loading") }));
    id = parseInt(itemId);
    skip = false;
  }

  const { data, loading } = useQuery(query, {
    variables: { ids: id },
    skip,
  });

  useEffect(() => {
    dispatch(Actions.setLoading(loading));
  }, [dispatch, loading]);

  useEffect(() => {
    if (!id) {
      dispatch(Actions.updateFormData(null));
    } else {
      dispatch(Actions.setLoading(true));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const room = data?.rooms[0];
    if (room) {
      dispatch(Actions.updateFormData(room));
      dispatch(Actions.setLoading(false));
    }
  }, [data, dispatch]);

  const url = "/app/bedrooms/list";

  const toggleEditable = () => dispatch(Actions.toggleEditable());
  const [create, { loading: cLoading }] = useMutation(CREATE);
  const [update] = useMutation(UPDATE);

  const handleResponse = ({ response, error, isNew, exit }) => {
    let variant = "success";
    if (error) {
      variant = "error";
    }
    const message = t(`rooms:${variant}.${isNew ? "create" : "edit"}`, {
      name: response && response.name,
    });
    dispatch(
      showMessage({
        message,
        autoHideDuration: 3000,
        variant,
      })
    );

    if ((!error && exit) || (isNew && !error && exit))
      props.history.push(url || "/");
  };

  const handleSubmit = (exit) => {
    const model = formRef.current.getModel();
    console.log({ model });
    const dd = {
      floor: parseInt(model.floor),
      status: parseInt(model.status),
      number: parseInt(model.number),
      type: model.type,
      startAt: model.startAt,
      expiresAt: model.expiresAt,
    };
    if (!(!dd.startAt instanceof Date && !isNaN(dd.startAt))) {
      delete dd.startAt;
    }
    if (!(!dd.expiresAt instanceof Date && !isNaN(dd.expiresAt))) {
      delete dd.expiresAt;
    }
    if (model.id) dd.id = parseInt(model.id);
    const isNew = !!parseInt(dd.id);
    console.log({ dd });
    if (model) {
      itemId === "new"
        ? create({
            variables: {
              data: dd,
            },
          })
            .then((response) => {
              dispatch(Actions.addData(dd));
              handleResponse({ response, isNew: !isNew, exit });
            })
            .catch((error) => {
              handleResponse({ error, isNew: !isNew, exit });
              if (process.env.NODE_ENV !== "production") console.error(error);
            })
        : update({
            variables: {
              data: dd,
            },
          })
            .then((response) => {
              dispatch(Actions.updateData(dd));
              handleResponse({ response, isNew: !isNew, exit });
            })
            .catch((error) => {
              handleResponse({ error, isNew: !isNew, exit });
              if (process.env.NODE_ENV !== "production") console.error(error);
            });
    }

    dispatch(Actions.setLoading(cLoading));
  };

  return (
    <CatuFilePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        content: classes.content,
      }}
      header={
        <HeaderForm
          strings={{
            defaultTitle: itemId === "new" ? t("rooms:new") : t("rooms:edit"),
            caption: t("rooms:room"),
            list_name: t("rooms:room", { count: 2 }),
          }}
          url={url}
          submitAction={handleSubmit}
          reduxStore="bedroomsApp"
          handlers={{
            toggleEditable,
          }}
          options={{
            isNew: !!parseInt(itemId),
            goBack: true,
            defaultGoBackLink: url,
            showIconEditor: false,
          }}
          toggleEditable={toggleEditable}
        />
      }
      content={<Form formRef={formRef} />}
      innerScroll
    />
  );
}

export default withReducer("bedroomsApp", reducer)(StateHandler);
