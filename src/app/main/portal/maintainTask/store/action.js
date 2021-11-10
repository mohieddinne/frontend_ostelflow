export const SET_SEARCH_WORD = "[Rooms] Set DT search text";
export const SET_LOADING = "[Rooms] Set loading";
export const DELETE_ITEM = "[Rooms] delete row from data";
export const SET_EDITABLE = "[Rooms] Set Editable";
export const UPDATE_FORM_DATA = "[Rooms] Update form";
export const SET_SUBMITTABLE = "[Rooms] Change canSubmit state";
export const ADD_DATA = "[Rooms] Add data";
export const UPDATE_DATA = "[Rooms] Update data";
export const SET_DATATABLE_SEARCH_TEXT = "[Rooms] Set DT search text";
export const SET_ROOMS = "[Rooms] SET_ROOMS";
export const TOGGLE_EDITABLE = "[Rooms] Toggle editable value";

export function setRooms(data) {
  return {
    type: SET_ROOMS,
    payload: data,
  };
}

export function setSearchText(lettre) {
  return {
    type: SET_SEARCH_WORD,
    payload: lettre,
  };
}

/// ----
export function toggleEditable() {
  return {
    type: TOGGLE_EDITABLE,
  };
}
export function setLoading(state) {
  return {
    type: SET_LOADING,
    payload: Boolean(state),
  };
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
}
// Search -----> exemple

export function setEditable(isEditable) {
  return {
    type: SET_EDITABLE,
    payload: isEditable,
  };
}

export function updateFormData(data) {
  return {
    type: UPDATE_FORM_DATA,
    payload: data,
  };
}
export function setSubmittable(submittable) {
  return {
    type: SET_SUBMITTABLE,
    payload: Boolean(submittable),
  };
}
export function addData(item) {
  return {
    type: ADD_DATA,
    payload: item,
  };
}
export function updateData(item) {
  return {
    type: UPDATE_DATA,
    payload: item,
  };
}
