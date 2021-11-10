import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CatuFilePageCarded from "@catu/components/PageLayouts/carded/CatuFilePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { useLocation } from "react-router-dom";
import AssignmentsDND from "../components/AssignmentsDND";
import HeaderForm from "@catu/components/HeaderForm";
import * as Actions from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, gql } from "@apollo/client";
import { showMessage } from "app/store/actions";
import DateFormatter from "@catu/components/formatters/DateFormatter";

const ASSIGN_MUTATION = gql`
  mutation assignRooms($params: [TaskInput]) {
    assignRooms(params: $params) {
      roomId
      user {
        id
        lastName
      }
    }
  }
`;

const TASKS_QUERY = gql`
  query graTasks($filters: GRA_TaskFilter) {
    graTasks(filters: $filters) {
      id
      assignedOn
      priority
      roomId
      createdBy
      user {
        email
        id
        lastName
        active
      }
      room {
        id
        number
        status
        dnd
        type {
          id
          value
        }
      }
    }
  }
`;

function Assignment(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const dataAssign = useSelector(({ AssignmentApp }) => AssignmentApp.data);
  const date = location.state.date;
  // const day = date.toJSON().slice(0, 10);
  const filters = { date };
  const { data, refetch } = useQuery(TASKS_QUERY, {
    variables: { filters },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const url = "/app/assignments";

  const tomorrow = location.state.tommorow;
  const tasks = data?.graTasks || [];

  const [assign] = useMutation(ASSIGN_MUTATION);

  const handleResponse = ({ response, error, exit }) => {
    let variant = "success";
    if (error) {
      variant = "error";
    }
    const message = t(`Assign:${variant}.${"assign"}`, {
      name: response && response.name,
    });
    dispatch(
      showMessage({
        message,
        autoHideDuration: 3000,
        variant,
      })
    );
    if ((!error && exit) || (!error && exit)) props.history.push(url || "/");
  };

  const toggleEditable = () => dispatch(Actions.toggleEditable());

  const handleSubmit = (exit) => {
    assign({
      variables: {
        params: dataAssign,
      },
    })
      .then((response) => {
        console.log({ response });
        handleResponse({ response, exit });
      })
      .catch((error) => {
        handleResponse({ error, exit });
        if (process.env.NODE_ENV !== "production") console.error(error);
      });
  };

  return (
    <CatuFilePageCarded
      classes={{
        toolbar: "p-0",
        header: "py-24",
        contentCard: "rounded-8",
        contentWrapper: "mb12",
      }}
      header={
        <HeaderForm
          strings={{
            defaultTitle: <DateFormatter date={date} />,
            // caption: t("Assign:title"),
            list_name: t("Assign:assignment", { count: 2 }),
          }}
          url={url}
          submitAction={date === tomorrow ? handleSubmit : "disable"}
          reduxStore="AssignmentApp"
          options={{
            goBack: location?.state?.title ? true : false,
            goBack_string: t(location?.state?.title),
            defaultGoBackLink: url,
            showIconEditor: false,
            single_button: true,
          }}
          toggleEditable={toggleEditable}
        />
      }
      content={<AssignmentsDND date={date} tomorrow={tomorrow} tasks={tasks} />}
      innerScroll
    />
  );
}

export default withReducer("AssignmentApp", reducer)(Assignment);
