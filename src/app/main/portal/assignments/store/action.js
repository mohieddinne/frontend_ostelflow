export const OPEN_NEW_ASSIGNMENT_DIALOG =
  "[CALENDAR APP] OPEN NEW APPOITEMENT DIALOG";
export const CLOSE_NEW_ASSIGNMENT_DIALOG =
  "[CALENDAR APP] CLOSE NEW APPOITEMENT DIALOG";
export const OPEN_EDIT_ASSIGNMENT_DIALOG =
  "[CALENDAR APP] OPEN EDIT APPOITEMENT DIALOG";
export const CLOSE_EDIT_ASSIGNMENT_DIALOG =
  "[CALENDAR APP] CLOSE EDIT APPOITEMENT DIALOG";
export const SET_LOADING = "[Assign] Set loading";
export const TOGGLE_EDITABLE = "[Assign] TOGGLE_EDITABLE";
export const SET_ROOMS = "[Assign] SET_ROOMS";

export function openNewAssignmentDialog(data) {
  return {
    type: OPEN_NEW_ASSIGNMENT_DIALOG,
    data,
  };
}
export function setRooms(data) {
  return {
    type: SET_ROOMS,
    payload: data,
  };
}

export function closeNewAssignmentDialog() {
  return {
    type: CLOSE_NEW_ASSIGNMENT_DIALOG,
  };
}
export function setLoading(state) {
  return {
    type: SET_LOADING,
    payload: Boolean(state),
  };
}

export function openEditAssignmentDialog(data) {
  return {
    type: OPEN_EDIT_ASSIGNMENT_DIALOG,
    data,
  };
}

export function closeEditAssignmentDialog() {
  return {
    type: CLOSE_EDIT_ASSIGNMENT_DIALOG,
  };
}
export function toggleEditable() {
  return {
    type: TOGGLE_EDITABLE,
  };
}
