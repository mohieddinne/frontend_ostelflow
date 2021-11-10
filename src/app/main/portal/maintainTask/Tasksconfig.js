import React from "react";
import { Redirect } from "react-router-dom";
import { default as i18next } from "i18next";
import fr_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "maintainTasks", fr_CA);

const Bedroomsconfig = {
  settings: {},
  name: "maintainTasks",
  auth: "maintain_tasks",

  routes: [
    {
      path: "/app/maintainTasks/list",
      component: React.lazy(() => import("./views/List")),
    },
    {
      path: "/app/maintainTasks/",
      component: () => <Redirect to="/app/maintainTasks/list" />,
    },
  ],
};

export default Bedroomsconfig;
