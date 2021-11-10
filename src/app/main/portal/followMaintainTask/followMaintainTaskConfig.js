import React from "react";
import { default as i18next } from "i18next";
import fr_CA from "./i18n/fr_CA.json";

i18next.addResourceBundle("fr-CA", "follow_maintain_tasks", fr_CA);

const followMaintainTask = {
  settings: {},
  name: "followMaintain",
  auth: "follow_maintain_tasks",
  routes: [
    {
      path: "/app/maintain/",
      component: React.lazy(() => import("./views/List")),
    },
  ],
};

export default followMaintainTask;
