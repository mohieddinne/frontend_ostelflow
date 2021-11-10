import React from "react";
import { Redirect } from "react-router-dom";
import { default as i18next } from "i18next";
import fr_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "rooms", fr_CA);

const Bedroomsconfig = {
  settings: {},
  name: "bedrooms",
  auth: "room_management",

  routes: [
    {
      path: "/app/bedrooms/item/:itemId?/:itemSlug?",
      component: React.lazy(() => import("./views/Item")),
    },
    {
      path: "/app/bedrooms/item/:itemId?",
      component: React.lazy(() => import("./views/Item")),
    },
    {
      path: "/app/bedrooms/list",
      component: React.lazy(() => import("./views/List")),
    },
    {
      path: "/app/bedrooms/",
      component: () => <Redirect to="/app/bedrooms/list" />,
    },
  ],
};

export default Bedroomsconfig;
