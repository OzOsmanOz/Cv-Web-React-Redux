import actionTypes from "./actionTypes";

export const CvsStart = () => {
  return {
    type: actionTypes.cvsActions.CVS_START,
  };
};

export const CvsSuccess = (payload) => {
  return {
    type: actionTypes.cvsActions.CVS_SUCCESS,
    payload,
  };
};

export const CvsFail = (payload) => {
  return {
    type: actionTypes.cvsActions.CVS_FAIL,
    payload,
  };
};

export const CvsAdd = (payload) => {
  return {
    type: actionTypes.cvsActions.CVS_ADD,
    payload,
  };
};

export const CvsDelete = (payload) => {
  return {
    type: actionTypes.cvsActions.CVS_DELETE,
    payload,
  };
};
