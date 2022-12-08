import React from "react";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import userBlank from "../Assets/userBlank.png";

const DetailPage = () => {
  const { UserState } = useSelector((state) => state);
  const { CvsState } = useSelector((state) => state);
  console.log("UserState", UserState);
  console.log("CvsState", CvsState);
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.8)", height: "100vh" }}>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-3"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "93vh" }}
          >
            <div className="mx-auto" style={{ width: "100px" }}>
              <img
                src={
                  UserState.user.profileImage
                    ? UserState.user.profileImage
                    : userBlank
                }
                className="img-fluid "
                alt=""
              />
            </div>
            <div className="text-white">
              <h5 className="fw-bold">Personal Details</h5>
              <hr />
            </div>
            <div className="text-white">
              <h6>Name</h6>
              <p>
                {UserState.user.firstName} {UserState.user.firstName}{" "}
                {UserState.user.lastName}
              </p>
            </div>
            <div className="text-white">
              <h6>Address</h6>
              <p>{CvsState.cvs[0].address}</p>
            </div>
            <div className="text-white">
              <h6>Phone Number</h6>
              <p>{CvsState.cvs[0].phone}</p>
            </div>
            <div className="text-white">
              <h6>Email Address</h6>
              <p style={{ fontSize: "12px" }}>{CvsState.cvs[0].email}</p>
            </div>
            <div className="text-white">
              <h5>Interests</h5>
              <hr />
            </div>
            <div className="text-white">
              <h5>Languages</h5>
              <hr />
            </div>
          </div>
          <div className="col-9">
            <div className="text-white">
              <h3>
                {UserState.user.firstName} {UserState.user.middleName}{" "}
                {UserState.user.lastName}
              </h3>
              <hr />
              <p>{CvsState.cvs[0].personalDescription}</p>
            </div>
            <div className="text-white">
              <h3>Work Experience</h3>
              <hr />
              <p>{CvsState.cvs[0].experiences[0].experience}</p>
            </div>
            <div className="text-white">
              <h3>Education</h3>
              <hr />
              <p>{CvsState.cvs[0].educations[0].scholl}</p>
              <p>{CvsState.cvs[0].educations[0].bolum}</p>
              <p>{CvsState.cvs[0].educations[0].mezuniyetYili}</p>
            </div>
            <div className="text-white">
              <h3>Skills</h3>
              <hr />
              <p>{CvsState.cvs[0].skills[0].skill}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
