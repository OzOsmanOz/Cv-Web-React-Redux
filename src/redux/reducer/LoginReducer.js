import actionTypes from "../action/actionTypes";

const initialState = {
  start: false,
  success: false,
  fail: false,
  error: "",
  token: "",
  email: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loginActions.LOGIN_START:
      return {
        ...state,
        start: true,
      };

    case actionTypes.loginActions.LOGIN_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        token: action.payload.token,
        email: action.payload.email,
      };

    case actionTypes.loginActions.LOGIN_FAIL:
      return {
        ...initialState,
        start: false,
        fail: true,
        error: action.payload,
      };

    case actionTypes.loginActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
export default LoginReducer;
