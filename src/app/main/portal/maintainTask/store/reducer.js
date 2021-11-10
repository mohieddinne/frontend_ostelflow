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
    case Actions.SET_ROOMS: {
      return {
        ...state,
        data: state.data ? state.data : action.payload,
      };
    }

    case Actions.DELETE_ITEM: {
      return {
        ...state,
        data: state.data
          ? state.data.filter(
              (item) => parseInt(item.id) !== parseInt(action.payload)
            )
          : null,
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

    case Actions.SET_LOADING: {
      return {
        ...state,
        form: {
          ...state.form,
          loading: action.payload,
        },
      };
    }

    case Actions.SET_EDITABLE: {
      return {
        ...state,
        form: {
          ...state.form,
          isEditable: action.payload,
        },
      };
    }
    // Update the data
    case Actions.ADD_DATA: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case Actions.UPDATE_FORM_DATA: {
      // Reset the form to create a new item
      if (!action.payload) {
        return {
          ...state,
          form: initialState.form,
        };
      }
      if (action.payload.id) {
        let isNew = false;
        return {
          ...state,
          form: {
            ...state.form,
            data: {
              ...action.payload,
            },
            isNew,
          },
        };
      } else {
        return {
          ...state,
          form: {
            ...state.form,
            data: state.form.data,
            isNew: false,
          },
        };
      }
    }

    case Actions.UPDATE_DATA: {
      return {
        ...state,
        data: state.data
          ? state.data.map((item) => {
              if (parseInt(item.id) === parseInt(action.payload.id)) {
                return {
                  ...item,
                  ...action.payload,
                };
              }
              return item;
            })
          : null,
      };
    }
    case Actions.TOGGLE_EDITABLE: {
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
