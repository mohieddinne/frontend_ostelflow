import axios from "axios";

export const TOGGLE_QUICK_PANEL = "[QUICK PANEL] TOGGLE QUICK PANEL";
export const TOGGLE_NOTIFICATION_PANEL =
  "[QUICK PANEL] TOGGLE NOTIFICATION PANEL";
export const GET_QUICK_PANEL_DATA = "[QUICK PANEL] GET DATA";
export const NOTIFICATION_COUNT = "[QUICK PANEL] NOTIFICATION_COUNT";

export function getQuickPanelData() {
  const request = axios.get("/api/quick-panel/data");
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_QUICK_PANEL_DATA,
        payload: response.data,
      })
    );
}

export function toggleQuickPanel() {
  return {
    type: TOGGLE_QUICK_PANEL,
  };
}
export function toggleNotificationPanel() {
  return {
    type: TOGGLE_NOTIFICATION_PANEL,
  };
}
export function increment_decrement_notification(count) {
  return (dispatch) =>
    dispatch({
      type: NOTIFICATION_COUNT,
      payload: {
        count,
      },
    });
}
