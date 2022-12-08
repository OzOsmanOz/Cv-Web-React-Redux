import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import api from "../Api/api";
import urls from "../Api/urls";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { LoginState } = useSelector((state) => state);
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (LoginState.success) navigate("/error");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    //validation

    if (!formRegister.email || !formRegister.password) {
      setError("Bütün Alanların Doldurulması Zorunludur");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    api
      .post(urls.register, formRegister)
      .then((resRegister) => {
        switch (resRegister?.data?.status) {
          case 400:
            setError(resRegister?.data?.message);
            setTimeout(() => {
              setError("");
            }, 3000);
            break;
          case 200:
            alert(resRegister.data.message);
            navigate("/login");
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log("Register Error", err);
      });
  };

  return (
    <div>
      <Header />
      <div
        className="register-page d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <form
          onSubmit={handleRegisterSubmit}
          style={{
            width: "350px",
            height: "400px",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          className="container rounded-4 shadow-lg form-control-sm d-flex flex-column justify-content-center"
        >
          <h3 className="text-center fw-bold text-white">Register</h3>
          <div className="form-floating mb-3 mt-5 d-flex justify-content-center">
            <input
              onChange={(e) =>
                setFormRegister({
                  ...formRegister,
                  email: e.target.value,
                })
              }
              value={formRegister.email}
              type="mail"
              className="form-control-sm w-75 rounded-3"
              id="floatingInput"
              placeholder="Mail"
            />
          </div>
          <div className="form-floating d-flex justify-content-center">
            <input
              onChange={(e) =>
                setFormRegister({
                  ...formRegister,
                  password: e.target.value,
                })
              }
              value={formRegister.password}
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
                Register
              </button>
              {error && <p className="text-warning fw-bold">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
