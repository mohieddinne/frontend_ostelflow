import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import { TextFieldFormsy, SelectFormsy } from "@fuse";
import { useTranslation } from "react-i18next";
import Formsy from "formsy-react";
import * as actions from "../../store/action";
import { useQuery, gql } from "@apollo/client";
import DatePickerFormsy from "@catu/components/DatePickerFormsy";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import DateFormatter from "@catu/components/formatters/DateFormatter";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const query = gql`
  query RoomsType {
    RoomsType {
      id
      value
    }
  }
`;
function Form({ formRef }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const canSubmit = useSelector(
    ({ bedroomsApp }) => bedroomsApp.form.canSubmit
  );
  const data = useSelector(({ bedroomsApp }) => bedroomsApp.form.data || null);
  const isEditable = useSelector(
    ({ bedroomsApp }) => bedroomsApp.form.isEditable
  );
  const fetchingLoading = useSelector(
    ({ bedroomsApp }) => bedroomsApp.form.loading
  );
  const isNew = useSelector(({ bedroomsApp }) => bedroomsApp.form.isNew);

  const { data: room_type_list, loading, error } = useQuery(query);

  const statusList = [
    {
      id: 1,
      name: t("rooms:status.status_1"),
    },
    {
      id: 2,
      name: t("rooms:status.status_2"),
    },
    {
      id: 3,
      name: t("rooms:status.status_3"),
    },
    {
      id: 4,
      name: t("rooms:status.status_4"),
    },
  ];

  if (fetchingLoading) {
    return (
      <div className="flex flex-1 flex-col min-h-128 items-center justify-center">
        <Typography className="text-20 mb-16" color="textSecondary">
          {t("loading")}
        </Typography>
        <LinearProgress className="w-xs" color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Formsy
        ref={formRef}
        onValid={() => {
          if (!canSubmit) {
            dispatch(actions.setSubmittable(true));
          }
        }}
        onInvalid={() => {
          if (canSubmit) {
            dispatch(actions.setSubmittable(false));
          }
        }}
        className="p-16 sm:p-24 max-w-2xl"
      >
        <TextFieldFormsy
          id="id"
          name="id"
          type="hidden"
          value={data?.id ? data.id : null}
        />
        <div className="flex flex-wrap">
          <div className="w-1/2 p-4">
            {isNew || isEditable ? (
              <TextFieldFormsy
                className="mt-8 mb-16"
                label={t("rooms:number")}
                autofocus
                id="number"
                name="number"
                validations="isNumeric"
                validationError={t("rooms:error.only_number")}
                fullWidth
                variant="outlined"
                value={data?.number ? data.number : null}
              />
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("rooms:number")}
                </Typography>
                <Typography>
                  {data?.number ? data.number : t("not_defined")}
                </Typography>
              </>
            )}
          </div>
          <div className="w-1/2 p-4">
            {isNew || isEditable ? (
              <TextFieldFormsy
                className="mt-8 mb-16"
                label={t("rooms:floor")}
                autofocus
                validations="isNumeric"
                validationError={t("rooms:error.only_number")}
                id="floor"
                name="floor"
                fullWidth
                variant="outlined"
                value={data?.floor ? data.floor : null}
              />
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("rooms:floor")}
                </Typography>
                <Typography>
                  {data?.floor ? data.floor : t("not_defined")}
                </Typography>
              </>
            )}
          </div>
          <div className="w-1/2 p-4">
            {isNew || isEditable ? (
              <SelectFormsy
                className="mt-8 mb-16 w-full"
                variant="outlined"
                id="status"
                name="status"
                disabled={loading || error}
                label={t("rooms:status.name")}
                required
                validationError={t("rooms:error.field_required")}
                value={data?.status ? data.status : statusList[0].id}
              >
                {statusList?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </SelectFormsy>
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("rooms:status.name")}
                </Typography>
                <Typography>
                  {data?.status
                    ? statusList.find((el) => el.id === data.status)?.name
                    : t("not_defined")}
                </Typography>
              </>
            )}
          </div>
          <div className="w-1/2 p-4">
            {isNew || isEditable ? (
              <SelectFormsy
                className="mt-8 mb-16 w-full"
                variant="outlined"
                name="type"
                disabled={loading || error}
                label={t("rooms:type")}
                required
                validationError={t("rooms:error.field_required")}
                value={1}
              >
                {room_type_list?.RoomsType?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </SelectFormsy>
            ) : (
              <>
                <Typography className="font-bold mb-4 text-15">
                  {t("rooms:type")}
                </Typography>
                <Typography>
                  {data?.type?.value ? data.type?.value : t("not_defined")}
                </Typography>
              </>
            )}
          </div>
          {!isNew && (
            <>
              <div className="w-1/2 p-4">
                {isNew || isEditable ? (
                  <DatePickerFormsy
                    className="w-full"
                    name="startAt"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    id="date-picker-outlined"
                    label={t("rooms:start_reservation")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          onClick={() => console.log("close")}
                          style={{ order: 1 }}
                        >
                          <CloseIcon />
                        </IconButton>
                      ),
                    }}
                    value={
                      new Date(parseInt(data?.startAt ? data.startAt : null))
                    }
                  />
                ) : (
                  <>
                    <Typography className="font-bold mb-4 text-15">
                      {t("rooms:start_reservation")}
                    </Typography>
                    <Typography>
                      <DateFormatter
                        date={data?.startAt ? data.startAt : null}
                      />
                    </Typography>
                  </>
                )}
              </div>
              <div className="w-1/2 p-4">
                {isNew || isEditable ? (
                  <DatePickerFormsy
                    className="w-full"
                    name="expiresAt"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    id="date-picker-outlined"
                    label={t("rooms:end_reservation")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          onClick={() => console.log("close")}
                          style={{ order: 1 }}
                        >
                          <CloseIcon />
                        </IconButton>
                      ),
                    }}
                    value={
                      new Date(
                        parseInt(data?.expiresAt ? data.expiresAt : null)
                      )
                    }
                  />
                ) : (
                  <>
                    <Typography className="font-bold mb-4 text-15">
                      {t("rooms:end_reservation")}
                    </Typography>
                    <Typography>
                      <DateFormatter
                        date={data?.expiresAt ? data.expiresAt : null}
                      />
                    </Typography>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Formsy>
    </>
  );
}

export default Form;
