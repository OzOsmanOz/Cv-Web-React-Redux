import React from "react";
import Header from "../Components/Header";

const ErrorPage = () => {
  return (
    <div
      className="error-page"
      style={{ backgroundImage: "../../public/error.jpeg" }}
    >
      <Header />
      <h4 className="d-flex justify-content-center align-item-center mt-5 fw-bold">
        Hey!! WTF are you doing!
      </h4>
    </div>
  );
};

export default ErrorPage;
