const actionTypes = {
  loginActions: {
    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT: "LOGOUT",
  },

  userActions: {
    USER_START: "USER_START",
    USER_SUCCESS: "USER_SUCCESS",
    USER_FAIL: "USER_FAIL",
    USER_UPDATE: "USER_UPDATE",
  },

  cvsActions: {
    CVS_START: "CVS_START",
    CVS_SUCCESS: "CVS_SUCCESS",
    CVS_FAIL: "CVS_FAIL",
    CVS_ADD: "CVS_ADD",
    CVS_DELETE: "CVS_DELETE",
  },
};
export default actionTypes;
