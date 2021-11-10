import Login from "./Login";

const config = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: "onlyGuest",
  routes: [
    {
      path: "/login",
      component: Login,
    },
  ],
};

export default config;
