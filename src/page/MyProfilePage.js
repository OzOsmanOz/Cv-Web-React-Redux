import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import Header from "../Components/Header";

const MyProfile = () => {
  const navigate = useNavigate();
  const { LoginState } = useSelector((state) => state);
  const { UserState } = useSelector((state) => state);

  useEffect(() => {
    // if (!LoginState.success || !UserState.success) navigate("/error");
  }, []);

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "100vh" }}>
      <Header />
      <div className="my-profile container mt-3" style={{ height: "90vh" }}>
        <div className="row">
          <div className="">
            <span className="px-3 py-2 me-3 bg-warning rounded-circle"></span>
            <span className="text-danger fw-bold">
              {UserState?.user?.firstName}
            </span>
            <span className="mx-1 text-danger fw-bold">
              {UserState?.user?.middleName}
            </span>
            <span className="text-danger fw-bold">
              {UserState?.user?.lastName}
            </span>
            <span className="text-white ms-4">Editor</span>
          </div>
          <div
            className="row d-flex justify-content-center"
            style={{ height: "70vh" }}
          >
            <div className="col-6 d-flex justify-content-center align-items-center ">
              <img
                src={UserState?.user?.profileImage}
                alt=""
                className="img-fluid rounded-circle"
                //   style={{ width: "600px" }}
              />
            </div>
            <div className="col-6 text-white d-flex flex-column justify-content-center align-items-start">
              <h1
                className="my-4"
                style={{ fontSize: "80px", fontWeight: 600 }}
              >
                Hello
              </h1>
              <h4 className="fw-bold my-3">A Bit About Me</h4>
              <p className="my-4 fw-light lh-base" style={{ fontSize: "14px" }}>
                I'm a paragraph. Click here to add your own text and edit me.
                I’m a great place for you to tell a story and let your users
                know a little more about you.
              </p>
              <div className="d-flex justify-content-center ">
                <button className="btn btn-outline-warning rounded-circle py-4 px-2">
                  Resume
                </button>
                <button className="btn btn-outline-danger rounded-circle py-4 mx-4">
                  Project
                </button>
                <button className="btn btn-outline-primary rounded-circle py-4 px-2">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
