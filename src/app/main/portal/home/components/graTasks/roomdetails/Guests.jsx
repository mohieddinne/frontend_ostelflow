import React from "react";
import { makeStyles } from "@material-ui/styles";
import DaysSlider from "./DaysSlider";
import { ReactComponent as Family } from "../../../icon/family.svg";

const useStyles = makeStyles(() => ({
  GuestsType: {
    fontWeight: "600",
    textAlign: "center",
    color: "#9ca3af",
    "@media screen and (min-width: 600px)": {
      fontSize: "10px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "14px",
    },
  },
  GuestsCount: {
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
    "@media screen and (min-width: 600px)": {
      fontSize: "14px",
    },
    "@media screen and (min-width: 1024px)": {
      fontSize: "18px",
    },
  },
}));
function Guests() {
  const classes = useStyles();

  return (
    <div className="rounded-8 200 border-1 p-8  bg-white">
      <div className="flex justify-between">
        <div className="flex flex-wrap w-2/3">
          <div className>
            <strong className="ml-8 sm:text-13 md:text-15">Guests</strong>
          </div>
        </div>
        <div>
          <Family fill="black" className="m-4" />
        </div>
      </div>
      <div className="flex  justify-between m-4 sm:w-2/3 md:w-2/3">
        <div>
          <p className={classes.GuestsType}>Adultes</p>
          <span className={classes.GuestsCount}>02</span>
        </div>
        <div>
          <p className={classes.GuestsType}>Enfants</p>
          <span className={classes.GuestsCount}>02</span>
        </div>
       
      </div>
      <div>
        <DaysSlider />
      </div>
    </div>
  );
}

export default Guests;
