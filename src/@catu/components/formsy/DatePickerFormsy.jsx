import React from "react";
import { withFormsy } from "formsy-react";
import _ from "@lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function DatePickerFormsy(props, ref) {
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
    "inputVariant",
    "format",
  ]);

  // An error message is returned only if the component is invalid
  const errorMessage = props.errorMessage;
  const value = props.value || null;
  function changeValue(event) {
    let value = event.currentTarget.value;
    if (typeof props.valueHandler === "function") {
      value = props.valueHandler(value);
    }
    props.setValue(value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <MuiPickersUtilsProvider
      name={importedProps.name}
      utils={DateFnsUtils}
    >
      <KeyboardDatePicker
        {...importedProps}
        value={value}
        inputRef={ref}
        onChange={changeValue}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
      />
    </MuiPickersUtilsProvider>
  );
}

export default React.memo(withFormsy(DatePickerFormsy));
