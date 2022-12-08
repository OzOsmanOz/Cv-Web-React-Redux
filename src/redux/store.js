import { createStore, combineReducers } from "redux";

import LoginReducer from "./reducer/LoginReducer";
import UserReducer from "./reducer/UserReducer";
import CvsReducer from "./reducer/CvsReducer";

const rootReducer = combineReducers({
  LoginState: LoginReducer,
  UserState: UserReducer,
  CvsState: CvsReducer,
});

const store = createStore(rootReducer);

export default store;
