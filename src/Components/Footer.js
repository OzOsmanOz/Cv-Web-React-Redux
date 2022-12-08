import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { UserState } = useSelector((state) => state);
  const { LoginState } = useSelector((state) => state);
  const { CvsState } = useSelector((state) => state);
  // console.log("CvsState", CvsState);

  return (
    <div className="footer fixed-bottom">
      <div className="container">
        <div className="row  d-flex justify-content-between text-white">
          <div className="col text-center">
            <h6 className="fw-bold">Phone</h6>
            <p className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {/* {CvsState.cvs[0].phone} */}
            </p>
          </div>
          <div className="col text-center ">
            <h6 className="fw-bold">Email</h6>
            <p className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {LoginState.email}
            </p>
          </div>
          <div className="col text-center">
            <h6 className="fw-bold">Follow Me</h6>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-square-facebook mx-2"></i>
            <i className="fa-brands fa-square-instagram"></i>
          </div>
          <div className="col text-center">
            <p style={{ fontSize: "12px" }}>
              © 2023 By
              <div className="text-danger fw-bold">
                <span className="">{UserState?.user?.firstName}</span>
                <span className="mx-1">{UserState?.user?.middleName}</span>
                <span>{UserState?.user?.lastName}</span>
              </div>
              Proudly created.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
