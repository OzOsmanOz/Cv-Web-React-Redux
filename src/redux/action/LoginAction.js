import actitionTypes from "./actionTypes";

export const LoginStart = () => {
  return {
    type: actitionTypes.loginActions.LOGIN_START,
  };
};

export const LoginSuccess = (parametre) => {
  return {
    type: actitionTypes.loginActions.LOGIN_SUCCESS,
    payload: parametre,
  };
};

export const LoginFail = (parametre) => {
  return {
    type: actitionTypes.loginActions.LOGIN_FAIL,
    payload: parametre,
  };
};

export const Logout = () => {
  return {
    type: actitionTypes.loginActions.LOGOUT,
  };
};
