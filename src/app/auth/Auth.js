import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FuseSplashScreen from "@fuse/components/FuseSplashScreen/FuseSplashScreen";
import * as userActions from "app/auth/store/actions";
import * as Actions from "app/store/actions";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import jwtService from "app/services/jwtService";
import { useMutation, gql } from "@apollo/client";
import { loginDataFields } from "app/main/users/graphql/UserLoginData";

const MUTATION_LOGIN = gql`
  ${loginDataFields}
  mutation token {
    login {
      ...LoginDataFields
    }
  }
`;

function Auth(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [signInWithToken] = useMutation(MUTATION_LOGIN);

  const [waitAuthCheck, setWait] = useState(true);

  useEffect(() => {
    const jwtCheck = () => {
      return new Promise((resolve, reject) => {
        const showError = (message) => {
          dispatch(
            Actions.showMessage({
              message: t([`${message}`, "error.generic"]),
              variant: "error",
            })
          );
        };
        jwtService.on("onAutoLogin", () => {
          signInWithToken()
            .then(({ data }) => {
              const loginData = data?.login;
              jwtService.handleLogin(loginData.token);
              dispatch(userActions.setUserData(loginData.user));
              resolve(loginData.user);
            })
            .catch((error) => {
              if (process.env.NODE_ENV) {
                console.error({ error });
              }
              showError(error.message);
              jwtService.logout();
              dispatch(userActions.logoutUser());
              reject(error);
            });
        });

        jwtService.on("onAutoLogout", (message) => {
          if (message) showError(message);
          jwtService.logout();
          dispatch(userActions.logoutUser());
          resolve();
        });

        jwtService.on("onNoAccessToken", () => {
          resolve();
        });

        jwtService.init();

        return Promise.resolve();
      });
    };

    jwtCheck()
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error(error);
        }
      })
      .finally(() => {
        setWait(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (waitAuthCheck) return <FuseSplashScreen />;

  return <>{props.children}</>;
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
