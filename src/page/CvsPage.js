import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../Api/api";
import setHeaderToken from "../Api/setHeaderToken";
import urls from "../Api/urls";
import EmptyCvs from "../Components/EmptyCvs";
import Header from "../Components/Header";
import {
  CvsDelete,
  CvsFail,
  CvsStart,
  CvsSuccess,
} from "../redux/action/CvsAction";

const CvsPage = () => {
  const dispatch = useDispatch();
  const { CvsState } = useSelector((state) => state);
  // console.log("CvsState", CvsState);

  useEffect(() => {
    dispatch(CvsStart());
    setHeaderToken();

    api
      .get(urls.getCvs)
      .then((resGetCvs) => {
        // console.log("resGetCvs", resGetCvs);

        switch (resGetCvs?.data?.status) {
          case 400:
            dispatch(CvsFail(resGetCvs?.data?.message));
            break;
          case 200:
            dispatch(CvsSuccess(resGetCvs?.data?.cvs));

            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log("resGetCvs Err", err);
      });
  }, []);

  const deleteCv = (id) => {
    dispatch(CvsStart());
    setHeaderToken();

    api
      .post(`${urls.deleteCv}/${id}`)
      .then((resDeleteCvs) => {
        // console.log("resDeleteCvs", resDeleteCvs);
        if (resDeleteCvs.data.status === 400) {
          dispatch(CvsFail(resDeleteCvs.data.message));
        }
        if (resDeleteCvs.data.status === 200) {
          dispatch(CvsDelete(id));
        }
      })
      .catch((err) => {
        console.log("resDeleteCvs Err", err);
      });
  };

  if (!CvsState.success) return null;

  return (
    <div
      className="cvs"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "100vh" }}
    >
      <Header />
      {CvsState.success === 0 && <EmptyCvs />}
      {CvsState.success > 0 && (
        <div className="container">
          <div className="d-flex justify-content-end my-4">
            <Link
              to={"/addCv"}
              className="btn btn-sm btn-primary fw-bold py-0"
              style={{ fontSize: "13px" }}
            >
              Cv Ekle
            </Link>
          </div>
          <div className="row">
            {CvsState.cvs.map((cv) => (
              <div
                key={cv.id}
                className="col-sm-6"
                style={{ fontSize: "12px" }}
              >
                <div
                  className="card text-white mb-4"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <div className="card-body ">
                    <h4 className="card-title">{cv.name}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {cv.jobTitle}
                    </h6>
                    <p
                      className="card-text"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cv.personalDescription}
                    </p>
                    <div className="d-flex justify-content-between align-item-center">
                      <Link to={"/detail"} className="card-link fw-bold">
                        Detaylar
                      </Link>
                      <button
                        onClick={() => deleteCv(cv.id)}
                        className="btn btn-sm btn-outline-danger fw-bold py-0"
                        style={{ fontSize: "12px" }}
                      >
                        CV' yi Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CvsPage;
