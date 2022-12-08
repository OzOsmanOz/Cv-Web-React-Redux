import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../redux/action/LoginAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { LoginState } = useSelector((state) => state);

  return (
    <div className="header" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
        <div className="container">
          <Link to={"/"} className="navbar-brand fw-bold fs-3 me-5" href="#">
            Cv Web
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link active"
                  style={{ fontWeight: 600 }}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {LoginState.success && (
                <>
                  <Link
                    to={"/profile"}
                    className="nav-link active"
                    style={{ fontWeight: 600 }}
                    aria-current="page"
                  >
                    My Profile
                  </Link>
                  <Link
                    to={"/update"}
                    className="nav-link active"
                    style={{ fontWeight: 600 }}
                    aria-current="page"
                  >
                    Update
                  </Link>
                  <Link
                    to={"/cvs"}
                    className="nav-link active"
                    style={{ fontWeight: 600 }}
                    aria-current="page"
                  >
                    Cvs
                  </Link>
                </>
              )}
            </ul>
            {LoginState.success ? (
              <div>
                <span
                  className="text-white me-2"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {LoginState.email}
                </span>
                <button
                  onClick={() => {
                    dispatch(Logout());
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  type="button"
                  className="btn btn-sm btn-outline-danger py-0 px-3 fw-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to={"/login"}
                  className="btn btn-sm btn-outline-success py-0 px-4 fw-bold me-2"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="btn btn-sm btn-outline-light py-0 px-3 fw-bold me-2"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
