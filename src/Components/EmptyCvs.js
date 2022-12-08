import React from "react";
import { Link } from "react-router-dom";

const EmptyCvs = () => {
  return (
    <div className="text-center my-5">
      <h6>
        Henüz kayıtlı CV'niz bulunmamaktadır. CV eklemek için{" "}
        <Link to={"/addCv"} className="link">
          tıklayınız.
        </Link>
      </h6>
    </div>
  );
};

export default EmptyCvs;
