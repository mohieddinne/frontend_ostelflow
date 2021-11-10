import React, { Fragment, useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { addValidationRule, withFormsy } from "formsy-react";
import _ from "@lodash";
// import DataPreview from "./formsy/DataPreview";
import { useSelector } from "react-redux";
// import DateFormatter from "../formatters/DateFormatter";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function DateAndTimePickers(props) {
  const importedProps = _.pick(props, [
    "autoComplete",
    "autoFocus",
    "children",
    "className",
    "disabled",
    "disableToolbar",
    "FormHelperTextProps",
    "format",
    "fullWidth",
    "id",
    "InputLabelProps",
    "inputProps",
    "InputProps",
    "inputRef",
    "label",
    "margin",
    "multiline",
    "name",
    "onBlur",
    "onChange",
    "onFocus",
    "placeholder",
    "required",
    "rows",
    "rowsMax",
    "select",
    "SelectProps",
    "type",
    "variant",
    "margin",
    "disablePast",
    "ampm",
  ]);
  addValidationRule("isDate", function (values, value) {
    if (value && value.toString() === "Invalid Date") {
      return false;
    }
    return true;
  });
  addValidationRule("isLessThan", function (values, value, valueName) {
    if (value?.toString() === "Invalid Date") {
      return "Invalid Date";
    }
    return new Date(value) <= new Date(values[valueName]);
  });
  addValidationRule("isMoreThan", function (values, value, valueName) {
    if (value?.toString() === "Invalid Date") {
      return "Invalid Date";
    }

    return new Date(value) >= new Date(values[valueName]);
  });
  const errorMessage = props.errorMessage;
  const value = props.value;
  //console.log(value);
  function changeValue(event, value) {
    //console.log(event);
    props.setValue(event);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  const isEditable = useSelector((state) => {
    try {
      if (props.toggleEditable === true && state[props.store])
        return state[props.store].form.isEditable;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.log({ error });
    }
    return true;
  });

  // if (!isEditable)
  //   return (
  //     <DataPreview {...props} value={<DateFormatter date={props.value} />} />
  //   );

  return (
    <MuiPickersUtilsProvider name={importedProps.name} utils={DateFnsUtils}>
      <DateTimePicker
        {...importedProps}
        inputVariant={props.variant}
        value={value}
        onChange={changeValue}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
}
export default React.memo(withFormsy(DateAndTimePickers));
