import * as actions from "./action";

const initialState = {
  data: null,
  entities: [],
  eventDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: [],
  },
  filters: {},
  filtersData: {},
  form: {
    data: null,
    isNew: true,
    canSubmit: true,
    loading: false,
    isEditable: false,
  },
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ROOMS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case actions.OPEN_NEW_ASSIGNMENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "new",
          props: {
            open: true,
          },
          data: {
            ...action.data,
          },
        },
      };
    }
    case actions.CLOSE_NEW_ASSIGNMENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "new",
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case actions.SET_LOADING: {
      return {
        ...state,
        form: {
          ...state.form,
          loading: action.payload,
        },
      };
    }
    case actions.OPEN_EDIT_ASSIGNMENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "edit",
          props: {
            open: true,
          },
          data: {
            ...action.data,
            start: new Date(action.data.start),
            end: new Date(action.data.end),
          },
        },
      };
    }
    case actions.CLOSE_EDIT_ASSIGNMENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "edit",
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case actions.TOGGLE_EDITABLE: {
      return {
        ...state,
        form: {
          ...state.form,
          isEditable: !state.form.isEditable,
        },
      };
    }
    default: {
      return state;
    }
  }
}
export default reducer;
