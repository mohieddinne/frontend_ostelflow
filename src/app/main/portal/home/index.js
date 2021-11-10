import React from "react";
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "HomeApp", fr_CA);
i18next.addResourceBundle("en-CA", "HomeApp", en_CA);

const config = {
  settings: {
    layout: {
      config: {},
    },
  },
  name: "Acceuil",
  auth: "login",
  routes: [
    {
      path: "/app/home/:id/:roomId",
      component: React.lazy(() => import("./views/Home")),
    },
    {
      path: "/app/roomDetails/:roomId",
      component: React.lazy(() => import("./views/DetailsRoomsActive")),
    },
    {
      path: "/app/home/:id",
      component: React.lazy(() => import("./views/Home")),
    },
    {
      path: "/app/home",
      component: React.lazy(() => import("./views/Home")),
    },
  ],
};

export default config;
