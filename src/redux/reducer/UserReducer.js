import actionTypes from "../action/actionTypes";

const initialState = {
  start: false,
  success: false,
  fail: false,
  error: "",
  user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.userActions.USER_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.userActions.USER_SUCCESS:
      return {
        ...state,
        start: false,
        fail: false,
        success: true,
        user: action.payload,
      };

    case actionTypes.userActions.USER_FAIL:
      return {
        ...initialState,
        fail: true,
        error: action.payload,
      };

    case actionTypes.userActions.USER_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
export default UserReducer;
