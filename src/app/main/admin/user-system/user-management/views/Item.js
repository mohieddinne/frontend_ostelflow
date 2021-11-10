import React, { useState } from "react";
import { FusePageCarded } from "@fuse";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import { useTranslation } from "react-i18next";
import HeaderForm from "@catu/components/HeaderForm";
import ItemForm from "../components/forms/ItemForm";
import { showMessage } from "app/store/actions";
import { useMutation, gql } from "@apollo/client";

const toggleUserActivation = gql`
  mutation user($data: UserInput!, $operation: String) {
    user(data: $data, operation: $operation)
  }
`;

function FormPage(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [formRef, setFormRef] = useState(null);
  const url = "/admin/users/management/list";

  const isNew = useSelector(
    ({ userManagementApp }) => userManagementApp.form.isNew
  );
  const [exec] = useMutation(toggleUserActivation);

  const handleRemoveIcon = () =>
    dispatch(Actions.updateFormData({ icon: null }));

  const toggleEditable = () => dispatch(Actions.toggleEditable());
  const handleResponse = ({ response, error, isNew, exit }) => {
    const variant = error ? "error" : "success";
    let message = t(`UserModule:${variant}.${!isNew ? "create" : "update"}`, {
      name: response && response.name,
    });

    if (error && Array.isArray(response))
      for (const e of response) {
        if (e.code === "EMAIL_ALREADY_IN_USE") {
          message = t(`UserModule:error.EMAIL_ALREADY_IN_USE`);
          formRef.updateInputsWithError({ email: message });
        }
      }

    dispatch(
      showMessage({
        message,
        autoHideDuration: 3000,
        variant, //success error info warning null
      })
    );
    dispatch(Actions.setLoading(false));
    if ((!error && exit) || (isNew && !error && exit))
      props.history.push(url || "/");
  };

  const handleSubmit = (exit) => {
    const data = formRef.getModel();
    const formattedData = data;
    const isNew = !!formattedData.id;
    formattedData.role = {
      id: formattedData.role_id,
    };
    delete formattedData.role_id;
    exec({
      variables: {
        data: formattedData,
        operation: data?.id ? "update" : "create",
      },
    })
      .then((response) => {
        handleResponse({ response, exit, isNew });
      })
      .catch((error) => {
        handleResponse({ error, exit, isNew });
      });
  };

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <HeaderForm
          strings={{
            defaultTitle: t(`UserModule:${isNew ? "new_user" : "edit_user"}`),
            caption: t("UserModule:user_details"),
            list_name: t("UserModule:title", { count: 2 }),
          }}
          url={url}
          submitAction={handleSubmit}
          handlers={{
            removeImage: handleRemoveIcon,
            toggleEditable,
          }}
          attributes={{
            icon: "profileImage",
          }}
          reduxStore="userManagementApp"
        />
      }
      contentToolbar={
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label={t("detail", { count: 2 })} />
        </Tabs>
      }
      content={<ItemForm setFormRef={setFormRef} />}
      innerScroll
    />
  );
}

export default withReducer("userManagementApp", reducer)(FormPage);
