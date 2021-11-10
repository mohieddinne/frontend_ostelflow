import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../store/action";
import { DatePicker } from "@material-ui/pickers";

function DtInput({ defaultValue }) {
  const [dateInput, setDateInput] = useState(
    defaultValue ? new Date(defaultValue) : new Date()
  );
  const dispatch = useDispatch();
  const handleChange = (target) => {
    setDateInput(target);
    dispatch(Actions.setDate(target));
  };

  return (
    <DatePicker
      inputVariant="outlined"
      value={dateInput}
      onChange={(e) => handleChange(e)}
    />
  );
}
export default DtInput;
