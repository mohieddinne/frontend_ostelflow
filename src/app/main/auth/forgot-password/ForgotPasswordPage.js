import React from "react";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate } from "@fuse";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent } from "@material-ui/core";
import ForgetPasswordForm from "./sub-component/form";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: theme.palette.primary.contrastText,
  },
}));

function ForgotPasswordPage() {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <div className="w-128 m-32">
                <img src="/assets/logos/tekru-logo@2x.png" alt="Logo" />
              </div>

              <Typography variant="h6" className="mt-16 mb-32 uppercase">
                Mot de passe oublié ?
              </Typography>

              <ForgetPasswordForm />

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-medium" to="/login">
                  Retourner à la page de connexion
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
