import actionTypes from "../action/actionTypes";

const initialState = {
  start: false,
  success: false,
  fail: false,
  cvs: [],
  error: "",
};

const CvsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.cvsActions.CVS_START:
      return {
        ...state,
        start: true,
      };

    case actionTypes.cvsActions.CVS_SUCCESS:
      return {
        ...initialState,
        success: true,
        cvs: action.payload,
      };

    case actionTypes.cvsActions.CVS_FAIL:
      return {
        ...initialState,
        fail: true,
        error: action.payload,
      };

    case actionTypes.cvsActions.CVS_ADD:
      return {
        ...state,
        cvs: [...state.cvs, action.payload],
      };

    case actionTypes.cvsActions.CVS_DELETE:
      const filteredDeleteCvs = state.cvs.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cvs: filteredDeleteCvs,
      };

    default:
      return state;
  }
};
export default CvsReducer;
