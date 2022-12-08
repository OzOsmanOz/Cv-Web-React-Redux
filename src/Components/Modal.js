import React from "react";

const Modal = (props) => {
  const { onCancel } = props;
  return (
    <button
      onClick={onCancel}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        cursor: "default",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <i
          onClick={onCancel}
          style={{ position: "relative", top: 0, right: 0 }}
          className="fa-solid fa-circle-xmark"
        ></i>
      </div>
    </button>
  );
};
export default Modal;
