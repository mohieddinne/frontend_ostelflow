import React from "react";
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "dashboardApp", fr_CA);
i18next.addResourceBundle("en-CA", "dashboardApp", en_CA);

const config = {
  settings: {
    layout: {
      config: {},
    },
  },
  name: "Tableau de board",
  auth: "login",
  routes: [
    {
      path: "/app/dashboard",
      component: React.lazy(() => import("./Dashboard")),
    },
  ],
};

export default config;
