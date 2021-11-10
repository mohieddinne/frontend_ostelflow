import React from "react";
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "Assign", fr_CA);

const assignmentsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  name: "assignments",
  auth: "affectation_management",
  routes: [
    {
      path: "/app/assignments/item",
      component: React.lazy(() => import("./views/Assignment")),
    },
    {
      path: "/app/assignments",
      component: React.lazy(() => import("./views/List")),
    },
  ],
};

export default assignmentsConfig;
