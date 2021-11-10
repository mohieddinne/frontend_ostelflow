import store from "./store";
import DateFnsUtils from "@date-io/date-fns";
import AuthorizationWrapper from "@catu/components/AuthorizationWrapper";
import FuseLayout from "@fuse/components/FuseLayout/FuseLayout";
import FuseTheme from "@fuse/components/FuseTheme/FuseTheme";
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import React from "react";
import Provider from "react-redux/es/components/Provider";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "./AppContext";
import { Auth } from "./auth";
import routes from "./configs/routesConfig";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fr from "javascript-time-ago/locale/fr";
import { ApolloProvider } from "@apollo/client";
import client from "./services/apolloClient";

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(fr);

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

const App = () => {
  return (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <ApolloProvider client={client}>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Auth>
                <Router>
                  <AuthorizationWrapper>
                    <FuseTheme>
                      <FuseLayout />
                    </FuseTheme>
                  </AuthorizationWrapper>
                </Router>
              </Auth>
            </MuiPickersUtilsProvider>
          </Provider>
        </StylesProvider>
      </ApolloProvider>
    </AppContext.Provider>
  );
};

export default App;
