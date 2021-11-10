export const SET_SEARCH_WORD = "[Timesheets] Set DT search text";
export const SET_DATE = "[Timesheets] Set date";
export const SET_TIMESHEETS = "[Timesheets] SET_TIMESHEETS";

export function setTimesheets(data) {
  return {
    type: SET_TIMESHEETS,
    payload: data,
  };
}

export function setSearchText(lettre) {
  return {
    type: SET_SEARCH_WORD,
    payload: lettre,
  };
}
export function setDate(date) {
  return {
    type: SET_DATE,
    payload: date,
  };
}
