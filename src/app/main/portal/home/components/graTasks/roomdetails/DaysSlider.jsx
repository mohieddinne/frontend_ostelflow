import React from "react";
import Slider from "@material-ui/core/Slider";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  dateStart: {
    fontWeight: "normal",
    textAlign: "left",
    color: "#6b7280",
    "@media screen and (min-width: 600px)": {
      fontSize: "8px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "10px",
    },
  },
  Middle: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#6b7280",
    "@media screen and (min-width: 600px)": {
      fontSize: "10px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "12px",
    },
  },
}));
function DaysSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const min = 0;
  const max = 6;
  const marks = [
    {
      value: min,
    },
    {
      value: 0,
    },
    {
      value: max,
    },
  ];

  return (
      <FormControl className="w-full  rounded-4   bg-gray-200 flex justify-between">
        <div className="flex  justify-between">
          <div className={classes.dateStart}>22 juil. 18:00</div>
          <div className={classes.Middle}>2/5 Nuitées</div>
          <div className={classes.dateStart}>27 juil. 12:00</div>
        </div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          name="days"
          aria-labelledby="days-slider"
          marks={marks}
          max={max}
          min={min}
        />
      </FormControl>
  );
}

export default DaysSlider;
