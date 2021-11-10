import ForgotPasswordPage from "./ForgotPasswordPage";

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
      path: "/auth/forgot-password",
      component: ForgotPasswordPage,
    },
  ],
};

export default config;
