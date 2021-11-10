import { withRouter } from "react-router-dom";
import React from "react";
import Form from "../tabs/Form";

function GroupeHeadForm(props) {
  const { tabValue, formRef } = props;
  return tabValue === 0 && <Form formRef={formRef} />;
}

export default withRouter(GroupeHeadForm);
