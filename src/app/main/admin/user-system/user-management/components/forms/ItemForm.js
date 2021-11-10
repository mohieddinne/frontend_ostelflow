import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import Formsy from "formsy-react";
import { TextFieldFormsy, SelectFormsy } from "@fuse";
import { useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import PasswordFormsy from "./PasswordFormsy";
import { gql, useQuery } from "@apollo/client";
import ErrorComponent from "@catu/components/Error";

const gQlQuery = gql`
  query {
    roles {
      id
      name
    }
  }
`;

const gQlQueryUsers = gql`
  query users($conditions: [ConditionsInput]) {
    users(conditions: $conditions) {
      id
      email
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
`;

function UserForm({ setFormRef }) {
  const { t } = useTranslation();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.itemId;

  const data = useSelector(
    ({ userManagementApp }) => userManagementApp.form.data
  );

  const isEditable = useSelector(
    ({ userManagementApp }) => userManagementApp.form.isEditable
  );
  const canSubmit = useSelector(
    ({ userManagementApp }) => userManagementApp.form.canSubmit
  );

  const { loading: rolesLoader, error: rolesError, data: gqlData } = useQuery(
    gQlQuery
  );
  const { loading, error, data: gqlDataUser } = useQuery(gQlQueryUsers, {
    skip: !id,
    variables: { conditions: [{ name: "id", value: [id] }] },
  });

  if (gqlDataUser?.users && !data) {
    dispatch(Actions.updateFormData(gqlDataUser.users[0]));
  }

  const isNew = routeParams.itemId === "new";

  useEffect(() => {
    return () => {
      dispatch(Actions.updateFormData(null));
    };
  }, [dispatch]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-full p-32">
        <Typography className="text-20 mb-16" color="textSecondary">
          {t("loading")}
        </Typography>
        <LinearProgress className="w-xs" color="secondary" />
      </div>
    );
  } else {
    return (
      <Formsy
        onValid={() => {
          if (!canSubmit) {
            dispatch(Actions.setSubmittable(true));
          }
        }}
        onInvalid={() => {
          if (canSubmit) {
            dispatch(Actions.setSubmittable(false));
          }
        }}
        className="p-16 sm:p-24 max-w-2xl"
        ref={setFormRef}
      >
        <TextFieldFormsy
          type="hidden"
          name="id"
          id="id"
          value={data ? data.id : null}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {isNew || isEditable ? (
              <TextFieldFormsy
                required
                disabled={loading}
                label={t("user.first_name")}
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  required: t("error.form.required"),
                  isSpecialWords: t(
                    "UserModule:error.please_enter_a_valid_name"
                  ),
                }}
                autoFocus
                id="firstName"
                name="firstName"
                fullWidth
                variant="outlined"
                value={data ? data.firstName : ""}
              />
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("user.first_name")}
                </Typography>
                <Typography>
                  {data && data.firstName ? data.firstName : t("not_defined")}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {isNew || isEditable ? (
              <TextFieldFormsy
                required
                disabled={loading}
                label={t("user.last_name")}
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  required: t("error.form.required"),
                  isSpecialWords: t(
                    "UserModule:error.please_enter_a_valid_name"
                  ),
                }}
                id="lastName"
                name="lastName"
                fullWidth
                variant="outlined"
                value={data ? data.lastName : ""}
              />
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("user.last_name")}
                </Typography>
                <Typography>
                  {data && data.lastName ? data.lastName : t("not_defined")}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {isNew || isEditable ? (
              <TextFieldFormsy
                required
                disabled={loading}
                label={t("email")}
                validations={{
                  isEmail: true,
                }}
                validationErrors={{
                  required: t("error.form.required"),
                  isEmail: t("error.form.value_not_supported"),
                }}
                id="email"
                name="email"
                fullWidth
                variant="outlined"
                value={data ? data.email : null}
              />
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("email")}
                </Typography>
                <Typography>
                  {data && data.email ? data.email : t("not_defined")}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {isNew || isEditable ? (
              <PasswordFormsy
                required
                disabled={loading}
                label={t("password")}
                id="password"
                name="password"
                fullWidth
                variant="outlined"
                disableValidation={!isNew}
                validations={{
                  minLength: 5,
                  maxLength: 25,
                }}
                validationErrors={{
                  required: t("error.form.required"),
                  minLength: t("error.form.minLength", { N: 5 }),
                  maxLength: t("error.form.maxLength", { N: 25 }),
                }}
              />
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("password")}
                </Typography>
                <Typography>******************</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {isNew || isEditable ? (
              <SelectFormsy
                variant="outlined"
                className="mb-16 w-full"
                fullWidth
                name="role_id"
                id="role_id"
                label={t("user.role")}
                autoComplete="off"
                value={data?.role?.id ? data.role.id : 1}
                required
                disabled={loading}
              >
                {gqlData?.roles.map((role) => {
                  return (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  );
                })}
              </SelectFormsy>
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("user.role")}
                </Typography>
                <Typography>
                  {data && data.role ? data.role.name : t("not_defined")}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Formsy>
    );
  }
}

export default withRouter(UserForm);
