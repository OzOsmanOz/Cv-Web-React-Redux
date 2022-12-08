import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import api from "../Api/api";
import urls from "../Api/urls";
import {
  UserStart,
  UserSuccess,
  UserFail,
  UserUpdate,
} from "../redux/action/UserAction";
import setHeaderToken from "../Api/setHeaderToken";
import userBlank from "../Assets/userBlank.png";
import Modal from "../Components/Modal";

const UpdatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { LoginState } = useSelector((state) => state);
  const { UserState } = useSelector((state) => state);
  // console.log("UserState üüüüüüü", UserState);
  const [formUpdate, setFormUpdate] = useState({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [file, setFile] = useState("");
  const [user, setUser] = useState("");
  const [prewiew, setPrewiew] = useState("");

  useEffect(() => {
    if (LoginState.fail || UserState.fail) {
      navigate("/error");
    }

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
            setUser(resGetProfile.data.user);
            setFormUpdate({
              email: resGetProfile?.data?.user?.email,
              firstName: resGetProfile?.data?.user?.firstName,
              middleName: resGetProfile?.data?.user?.middleName,
              lastName: resGetProfile?.data?.user?.lastName,
            });
            dispatch(UserSuccess(resGetProfile?.data?.user));
            // console.log("UserState useEffect", UserState);

            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log("resGetProfile Err", err);
        dispatch(UserFail("Server Hatası"));
      });
  }, []);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!formUpdate.firstName || !formUpdate.lastName) {
      alert("Ad ve Soyad alanı zorunludur");
    }

    dispatch(UserStart());
    setHeaderToken();
    api
      .post(urls.updateProfile, formUpdate, {
        headers: {
          token: LoginState.token,
        },
      })
      .then((resUpdate) => {
        console.log("resUpdate", resUpdate);
        dispatch(UserUpdate(formUpdate));
        // console.log("UserState handle", UserState);
      })
      .catch((err) => {
        console.log("Update Err", err);
        dispatch(UserFail("Server Hatası"));
      });
  };

  const checkDisabled = () => {
    return (
      UserState.user.firstName === formUpdate.firstName &&
      UserState.user.middleName === formUpdate.middleName &&
      UserState.user.lastName === formUpdate.lastName
    );
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // validation

    if (!file) {
      alert("Herhangi bir dosya seçmediniz");
      return;
    }

    formData.append("file", file);

    api({
      method: "post",
      url: urls.uploadPP,
      data: formData,
      headers: {
        "Content-Type": "multipart/formData",
      },
    })
      .then((resUplodPP) => {
        console.log("resUplodPP", resUplodPP);
        switch (resUplodPP.data.status) {
          case 400:
            dispatch(UserFail(resUplodPP.data.message));
            break;
          case 200:
            dispatch(UserUpdate(resUplodPP.data.profileImage));
            window.location.reload();
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        console.log("resUploadPP Err", err);
        dispatch(UserFail("Server Hatası"));
      });
  };

  if (!user) return null;

  // if (!UserState.success) return null;

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "100vh" }}>
      <Header />
      <div
        style={{ height: "90vh" }}
        className="update-page text-white d-flex justify-content-center align-items-center"
      >
        <div
          style={{
            width: "400px",
            height: "75vh",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          className="container rounded-4 shadow form-control-sm"
        >
          <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            {prewiew ? (
              <img
                src={prewiew}
                alt=""
                className="img-fluid mw-100 rounded-circle mt-2"
                style={{ width: "175px", height: "175px" }}
              />
            ) : (
              <img
                src={user.profileImage ? user.profileImage : userBlank}
                alt=""
                className="img-fluid mw-100 rounded-circle mt-2"
                style={{ width: "175px", height: "175px" }}
              />
            )}

            <form onSubmit={handleImageSubmit}>
              <div
                className="container mb-4 mt-4 d-flex justify-content-between"
                style={{ fontSize: "12px", height: "30px" }}
              >
                <input
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                    const objUrl = URL.createObjectURL(e.target.files[0]);
                    setPrewiew(objUrl);
                  }}
                  className="form-control w-75"
                  type="file"
                  id="formFileSm"
                  style={{ fontSize: "12px" }}
                  accept=".png,.jpg,.jpeg"
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-light fw-bold rounded-3 py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <form onSubmit={handleUpdateSubmit}>
            <h3 className="text-center fw-bold mb-4 ">Update</h3>
            <div className="form-floating px-3 mb-3 mt-3 d-flex justify-content-center">
              <input
                disabled
                value={UserState?.user?.email}
                type="text"
                className="form-control fw-bold w-100 rounded-3 border-0"
                style={{ fontSize: "12px", height: "40px" }}
                placeholder="FirstName"
              />
              <label
                htmlFor="floatingInput"
                className="py-2 px-4 fw-light text-dark"
                style={{ fontSize: "12px" }}
              >
                Email
              </label>
            </div>
            <div className="form-floating px-3 mb-3 mt-3 d-flex justify-content-center">
              <input
                onChange={(e) =>
                  setFormUpdate({
                    ...formUpdate,
                    firstName: e.target.value,
                  })
                }
                value={formUpdate.firstName}
                type="text"
                className="form-control fw-bold w-100 rounded-3 border-0"
                style={{ fontSize: "12px", height: "40px" }}
                placeholder="FirstName"
              />
              <label
                htmlFor="floatingInput"
                className="py-2 px-4 fw-light text-dark"
                style={{ fontSize: "12px" }}
              >
                FirstName
              </label>
            </div>

            <div className="form-floating d-flex justify-content-center px-3">
              <input
                onChange={(e) =>
                  setFormUpdate({
                    ...formUpdate,
                    middleName: e.target.value,
                  })
                }
                value={formUpdate.middleName}
                type="text"
                className="form-control fw-bold w-100 rounded-3 border-0"
                style={{ fontSize: "12px", height: "40px" }}
                placeholder="MiddleName"
              />
              <label
                htmlFor="floatingInput"
                className="py-2 px-4 fw-light text-dark"
                style={{ fontSize: "12px" }}
              >
                MiddleName
              </label>
            </div>
            <div className="form-floating d-flex justify-content-center px-3 mt-3">
              <input
                onChange={(e) =>
                  setFormUpdate({ ...formUpdate, lastName: e.target.value })
                }
                value={formUpdate.lastName}
                type="text"
                className="form-control fw-bold w-100 rounded-3  border-0"
                style={{ fontSize: "12px", height: "40px" }}
                placeholder="LastName"
              />
              <label
                htmlFor="floatingInput"
                className="py-2 px-4 fw-light text-dark"
                style={{ fontSize: "12px" }}
              >
                LastName
              </label>
            </div>
            <div className="text-center">
              <div className="d-flex flex-column align-items-center">
                <button
                  disabled={checkDisabled()}
                  type="submit"
                  className="btn btn-sm btn-outline-light fw-bold my-5 w-75 rounded-3"
                  style={{ fontSize: "13px" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
