import * as Actions from "../actions";

const initialState = {
  state: false,
  NotificationState: false,
  data: {
    count: 0,
  },
};

const quickPanel = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUICK_PANEL_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.TOGGLE_QUICK_PANEL: {
      return {
        ...state,
        state: !state.state,
      };
    }
    case Actions.TOGGLE_NOTIFICATION_PANEL: {
      return {
        ...state,
        state: false,
        NotificationState: !state.NotificationState,
      };
    }
    case Actions.NOTIFICATION_COUNT: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default quickPanel;
