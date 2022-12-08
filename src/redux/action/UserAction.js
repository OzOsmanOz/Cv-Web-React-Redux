import actitionTypes from "./actionTypes";

export const UserStart = () => {
  return {
    type: actitionTypes.userActions.USER_START,
  };
};

export const UserSuccess = (parametre) => {
  return {
    type: actitionTypes.userActions.USER_SUCCESS,
    payload: parametre,
  };
};

export const UserFail = (parametre) => {
  return {
    type: actitionTypes.userActions.USER_FAIL,
    payload: parametre,
  };
};

export const UserUpdate = (parametre) => {
  return {
    type: actitionTypes.userActions.USER_UPDATE,
    payload: parametre,
  };
};
