import React from "react";
import { default as i18next } from "i18next";
import fr_CA from "./i18n/fr_CA.json";

i18next.addResourceBundle("fr-CA", "follow_room", fr_CA);

const followConfig = {
  settings: {},
  name: "follow",
  auth: "follow_room",
  routes: [
    {
      path: "/app/follow/",
      component: React.lazy(() => import("./views/List")),
    },
  ],
};

export default followConfig;
