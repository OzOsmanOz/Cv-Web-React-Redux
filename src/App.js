import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Logout,
  LoginStart,
  LoginSuccess,
  LoginFail,
} from "./redux/action/LoginAction";
import { UserStart, UserSuccess, UserFail } from "./redux/action/UserAction";

import api from "./Api/api";
import urls from "./Api/urls";

import setHeaderToken from "./Api/setHeaderToken";
import routes from "./router/routes";

function App() {
  const dispatch = useDispatch();
  const { LoginState } = useSelector((state) => state);
  const { UserState } = useSelector((state) => state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    if (!token || token === "") {
      dispatch(Logout());
    } else {
      dispatch(LoginStart());
      api
        .get(`${urls.verifyToken}/${token}`)
        .then((res) => {
          switch (res?.data?.status) {
            case 400:
              dispatch(LoginFail(res?.data?.message));
              break;
            case 200:
              dispatch(LoginSuccess(res?.data));
              api.defaults.headers.common["token"] = res?.data?.token;
              dispatch(UserSuccess(res?.data));

              dispatch(UserStart());
              setHeaderToken();

              api
                .get(urls.getProfile)
                .then((resGetProfile) => {
                  // console.log("resGetProfile", resGetProfile);

                  switch (resGetProfile?.data?.status) {
                    case 400:
                      dispatch(UserFail(resGetProfile.data.message));
                      break;
                    case 200:
                      dispatch(UserSuccess(resGetProfile?.data?.user));

                      break;
                    default:
                      break;
                  }
                })
                .catch((err) => {
                  console.log("resGetProfile Err", err);
                  dispatch(UserFail("Server Hatası"));
                });

              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(LoginFail("Server'da bir hata oluştu"));
          dispatch(UserFail("User yüklenirken bir hata oluştu"));
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
