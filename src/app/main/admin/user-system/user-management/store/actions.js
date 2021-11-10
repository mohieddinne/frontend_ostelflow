export const SET_DATA = "[User Management] Set data";
export const ADD_DATA = "[User Management] Add data";
export const DELETE_ELEMENT = "[User Management] Delete data";
export const MUTATE_DATA = "[User Management] Mutate data";
export const UPDATE_DATA = "[User Management] Update data";
export const SET_SEARCH_WORD = "[User Management] Set search text";
export const SET_FORM_DATA = "[User Management] Select an item in data table";
export const SET_SUBMITTABLE = "[User Management] Change canSubmit state";
export const UPDATE_FORM_DATA = "[User Management] Update form";
export const SET_LOADING = "[User Management] Loading";
export const TOGGLE_EDITABLE = "[User Management] Change state of form";
export const TOGGLE_USER =
  "[User Management] Toggle state of activity of the user";

export function setData(data) {
  if (!data) {
    data = [];
  }
  return {
    type: SET_DATA,
    payload: data,
  };
}

export function updateData(item) {
  return {
    type: UPDATE_DATA,
    payload: item,
  };
}

export function deleteElement(id) {
  return {
    type: DELETE_ELEMENT,
    payload: id,
  };
}

export function mutateData(item) {
  return {
    type: MUTATE_DATA,
    payload: item,
  };
}

export function addData(item) {
  return {
    type: ADD_DATA,
    payload: item,
  };
}

export function setSearchText(value) {
  return {
    type: SET_SEARCH_WORD,
    payload: value,
  };
}

export function setSubmittable(submittable) {
  return {
    type: SET_SUBMITTABLE,
    payload: Boolean(submittable),
  };
}

export function toggleEditable() {
  return {
    type: TOGGLE_EDITABLE,
  };
}

export function updateFormData(data) {
  return {
    type: UPDATE_FORM_DATA,
    payload: data,
  };
}

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    payload: Boolean(isLoading),
  };
}

export async function selectUserInDataTable(dispatch) {
  return (dispatch) => {};
}

export const toggleUserActivation = (payload) => {
  return {
    type: TOGGLE_USER,
    payload,
  };
};
