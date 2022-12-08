import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../Api/api";
import urls from "../Api/urls";
import Header from "../Components/Header";
import {
  LoginStart,
  LoginSuccess,
  LoginFail,
} from "../redux/action/LoginAction";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LoginState } = useSelector((state) => state);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (LoginState.success) navigate("/");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    //validation

    if (!formLogin.email || !formLogin.password) {
      setError("Bütün Alanların Doldurulması Zorunludur");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    //login Start

    dispatch(LoginStart());

    api
      .post(urls.login, formLogin)
      .then((resLogin) => {
        switch (resLogin?.data?.status) {
          case 400:
            dispatch(LoginFail(resLogin?.data?.message));
            setError(resLogin?.data?.message);
            setTimeout(() => {
              setError("");
            }, 2000);
            break;
          case 200:
            dispatch(LoginSuccess(resLogin.data));
            localStorage.setItem("token", resLogin?.data?.token);
            api.defaults.headers.common["token"] = resLogin?.data?.token;
            navigate("/");
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log("Login Error", err);
        dispatch(LoginFail("Server'da bir hata oluştu"));
      });
  };

  return (
    <div>
      <Header />
      <div
        className="login-page d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <form
          onSubmit={handleLoginSubmit}
          style={{
            width: "350px",
            height: "400px",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          className="container rounded-4 shadow-lg form-control-sm d-flex flex-column justify-content-center "
        >
          <h3 className="text-center text-white fw-bold "> Login</h3>
          <div className="form-floating mb-3 mt-5 d-flex justify-content-center">
            <input
              onChange={(e) =>
                setFormLogin({ ...formLogin, email: e.target.value })
              }
              value={formLogin.email}
              type="mail"
              className="form-control-sm w-75 rounded-3"
              id="floatingInput"
              placeholder="Mail"
            />
          </div>
          <div className="form-floating d-flex justify-content-center">
            <input
              onChange={(e) =>
                setFormLogin({
                  ...formLogin,
                  password: e.target.value,
                })
              }
              value={formLogin.password}
              type="password"
              className="form-control-sm w-75 rounded-3 mt-3"
              id="floatingPassword"
              placeholder="Password"
            />
          </div>
          <div className="text-center">
            <div className="d-flex flex-column align-items-center">
              <button
                type="submit"
                className="btn btn-sm btn-dark fw-bold my-5 w-50"
              >
                Signup
              </button>
              {error && <p className="text-warning fw-bold">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
