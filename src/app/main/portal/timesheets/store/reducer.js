import * as Actions from "./action";

const initialState = {
  data: null,
  searchText: "",
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
    case Actions.SET_TIMESHEETS: {
      return {
        ...state,
        data: state.data ? state.data : action.payload,
      };
    }
    //[...state.data,action.payload]
    case Actions.SET_SEARCH_WORD: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    /// ----
    case Actions.SET_DATE: {
      return {
        ...state,
        date: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
export default reducer;
