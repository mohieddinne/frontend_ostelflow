import React from "react";
import { default as i18next } from "i18next";
import fr_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "timesheets", fr_CA);

const Timesheetsconfig = {
  settings: {},
  name: "timesheets",
  auth: "timesheet",
  routes: [
    {
      path: "/app/timesheets/",
      component: React.lazy(() => import("./views/List")),
    },
  ],
};

export default Timesheetsconfig;
