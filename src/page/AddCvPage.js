import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import setHeaderToken from "../Api/setHeaderToken";
import urls from "../Api/urls";
import Header from "../Components/Header";
import {
  CvsAdd,
  CvsFail,
  CvsStart,
  CvsSuccess,
} from "../redux/action/CvsAction";

const AddCvPage = () => {
  const navigte = useNavigate();
  const dispatch = useDispatch();
  const [cvForm, setCvForm] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    personalDescription: "",
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
    languages: [],
    socialPlatforms: [],
  });
  const [educationForm, setEducationForm] = useState({
    scholl: "",
    bolum: "",
    mezuniyetYili: "",
    bitirmeDerecesi: "",
    sehir: "",
    ulke: "",
  });

  const [experiencesForm, setExperiencesForm] = useState({
    experience: "",
    firma: "",
    sehir: "",
  });

  const [projectsForm, setProjectForm] = useState({
    project: "",
  });

  const [skillsForm, setSkillsForm] = useState({
    skill: "",
  });

  const [languagesForm, setLanguagesForm] = useState({
    language: "",
  });

  const [socialPlatformsForm, setSocialPlatformsForm] = useState({
    socialPlatform: "",
  });

  const deleteLanguagesInfo = (id) => {
    const filteredDeleteLanguage = cvForm.languages.filter(
      (item) => item.id !== id
    );
    setCvForm({
      ...cvForm,
      languages: filteredDeleteLanguage,
    });
  };

  const deleteEducationInfo = (id) => {
    const filteredDeleteEducation = cvForm.educations.filter(
      (item) => item.id !== id
    );
    setCvForm({
      ...cvForm,
      educations: filteredDeleteEducation,
    });
  };

  const deleteExperiencesInfo = (id) => {
    const filteredDeleteExperiense = cvForm.experiences.filter(
      (item) => item.id !== id
    );
    setCvForm({
      ...cvForm,
      experiences: filteredDeleteExperiense,
    });
  };

  const deleteProjectsInfo = (id) => {
    const filteredDeleteProject = cvForm.projects.filter(
      (item) => item.id !== id
    );
    setCvForm({
      ...cvForm,
      projects: filteredDeleteProject,
    });
  };

  const deleteSkillsInfo = (id) => {
    const filteredDeleteSkill = cvForm.skills.filter((item) => item.id !== id);
    setCvForm({
      ...cvForm,
      skills: filteredDeleteSkill,
    });
  };

  const deleteSocialPlatform = (id) => {
    const filteredDeleteSocial = cvForm.skills.filter((item) => item.id !== id);
    setCvForm({
      ...cvForm,
      socialPlatforms: filteredDeleteSocial,
    });
  };

  const handleCvSubmit = (e) => {
    e.preventDefault();

    dispatch(CvsStart());
    setHeaderToken();

    api
      .post(urls.addCv, cvForm)
      .then((resCvAdd) => {
        // console.log("resCvAdd", resCvAdd);

        switch (resCvAdd?.data?.status) {
          case 400:
            dispatch(CvsFail(resCvAdd?.data?.message));
            break;

          case 200:
            dispatch(CvsAdd(cvForm));
            break;

          default:
            break;
        }
        navigte("/cvs");
      })
      .catch((err) => {
        console.log("resCvAdd Err", err);
        dispatch(CvsFail("Server Hatası"));
      });
  };

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <Header />
      <div className="container">
        <form onSubmit={handleCvSubmit}>
          {/* ***** Basic Informations ***** */}

          <h5 className="fw-bold text-white mb-2">Temel Bilgiler</h5>
          <hr className="mb-4 text-white" />
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setCvForm({
                    ...cvForm,
                    name: e.target.value,
                  })
                }
                value={cvForm.name}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Cv Adı"
              />
            </div>
            <div className="col">
              <input
                onChange={(e) =>
                  setCvForm({
                    ...cvForm,
                    jobTitle: e.target.value,
                  })
                }
                value={cvForm.jobTitle}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Ünvan"
              />
            </div>
            <div className="col-12 my-3">
              <textarea
                onChange={(e) =>
                  setCvForm({
                    ...cvForm,
                    personalDescription: e.target.value,
                  })
                }
                value={cvForm.personalDescription}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Kendinizi tanıtan bir paragraf yazınız"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setCvForm({
                    ...cvForm,
                    email: e.target.value,
                  })
                }
                value={cvForm.email}
                type="email"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Email"
              />
            </div>
            <div className="col">
              <input
                onChange={(e) =>
                  setCvForm({
                    ...cvForm,
                    phone: e.target.value,
                  })
                }
                value={cvForm.phone}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Telefon"
              />
            </div>
            <div className="col-12 my-3">
              <input
                onChange={(e) =>
                  setCvForm({
                    ...cvForm,
                    address: e.target.value,
                  })
                }
                value={cvForm.address}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Adres"
              />
            </div>
          </div>

          {/* ***** Education ***** */}

          <h5 className="fw-bold text-white my-2">Eğitim Bilgileri</h5>
          <hr className="mb-4 text-white" />

          {cvForm.educations.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="row">
                <div className="col">
                  <input
                    value={item.scholl}
                    disabled
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Okul Adı"
                  />
                </div>
                <div className="col">
                  <input
                    value={item.bolum}
                    disabled
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Bölüm"
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <input
                    value={item.mezuniyetYili}
                    disabled
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Mezuniyet Yılı"
                  />
                </div>
                <div className="col">
                  <input
                    value={item.bitirme}
                    disabled
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Bitirme Derecesi"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    value={item.sehir}
                    disabled
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Şehir"
                  />
                </div>
                <div className="col">
                  <input
                    value={item.ulke}
                    disabled
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Ülke"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end my-4">
                <button
                  onClick={() => deleteEducationInfo(item.id)}
                  className="btn btn-sm btn-outline-danger fw-bold py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Sil
                </button>
              </div>
              <hr className="mb-4 text-white" />
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    scholl: e.target.value,
                  })
                }
                value={educationForm.scholl}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Okul Adı"
              />
            </div>
            <div className="col">
              <input
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    bolum: e.target.value,
                  })
                }
                value={educationForm.bolum}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Bölüm"
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <input
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    mezuniyetYili: e.target.value,
                  })
                }
                value={educationForm.mezuniyetYili}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Mezuniyet Yılı"
              />
            </div>
            <div className="col">
              <input
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    bitirmeDerecesi: e.target.value,
                  })
                }
                value={educationForm.bitirmeDerecesi}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Bitirme Derecesi"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    sehir: e.target.value,
                  })
                }
                value={educationForm.sehir}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Şehir"
              />
            </div>
            <div className="col">
              <input
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    ulke: e.target.value,
                  })
                }
                value={educationForm.ulke}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Ülke"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              onClick={() => {
                setCvForm({
                  ...cvForm,
                  educations: [
                    ...cvForm.educations,
                    { id: String(new Date().getTime()), ...educationForm },
                  ],
                });
                setEducationForm({
                  scholl: "",
                  bolum: "",
                  mezuniyetYili: "",
                  bitirmeDerecesi: "",
                  sehir: "",
                  ulke: "",
                });
              }}
              type="button"
              className="btn btn-sm btn-outline-primary fw-bold py-0 my-4"
              style={{ fontSize: "12px" }}
            >
              Okul Ekle
            </button>
          </div>

          {/* ***** Experiences ***** */}

          <h5 className="fw-bold my-2 text-white">Deneyimler</h5>
          <hr className="mb-4 text-white" />
          {cvForm.experiences.map((item) => (
            <div key={item.id} className="row mb-4">
              <div className="col">
                <input
                  disabled
                  value={item.experience}
                  type="text"
                  className="form-control"
                  style={{ fontSize: "12px" }}
                  placeholder="Deneyim"
                />
              </div>
              <div className="row my-4">
                <div className="col">
                  <input
                    value={item.firma}
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Şehir"
                  />
                </div>
                <div className="col">
                  <input
                    value={item.sehir}
                    type="text"
                    className="form-control"
                    style={{ fontSize: "12px" }}
                    placeholder="Ülke"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  onClick={() => deleteExperiencesInfo(item.id)}
                  className="btn btn-sm btn-outline-danger fw-bold py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setExperiencesForm({
                    ...experiencesForm,
                    experience: e.target.value,
                  })
                }
                value={experiencesForm.experience}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Deneyim"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <input
                onChange={(e) =>
                  setExperiencesForm({
                    ...experiencesForm,
                    firma: e.target.value,
                  })
                }
                value={experiencesForm.firma}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Firma"
              />
            </div>
            <div className="col-6">
              <input
                onChange={(e) =>
                  setExperiencesForm({
                    ...experiencesForm,
                    sehir: e.target.value,
                  })
                }
                value={experiencesForm.sehir}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Şehir"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => {
                setCvForm({
                  ...cvForm,
                  experiences: [
                    ...cvForm.experiences,
                    { id: String(new Date().getTime()), ...experiencesForm },
                  ],
                });
                setExperiencesForm({
                  experience: "",
                  firma: "",
                  sehir: "",
                });
              }}
              className="btn btn-sm btn-outline-primary fw-bold py-0 my-4"
              style={{ fontSize: "12px" }}
            >
              Deneyim Ekle
            </button>
          </div>

          {/* ***** Projects ***** */}

          <h5 className="fw-bold text-white my-2">Projeler</h5>
          <hr className=" text-white mb-4" />
          {cvForm.projects.map((item) => (
            <div key={item.id} className="row mb-4">
              <div className="col">
                <input
                  disabled
                  value={item.project}
                  type="text"
                  className="form-control"
                  style={{ fontSize: "12px" }}
                  placeholder="Proje"
                />
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  onClick={() => deleteProjectsInfo(item.id)}
                  className="btn btn-sm btn-outline-danger fw-bold py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setProjectForm({
                    ...projectsForm,
                    project: e.target.value,
                  })
                }
                value={projectsForm.project}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Proje"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => {
                setCvForm({
                  ...cvForm,
                  projects: [
                    ...cvForm.projects,
                    { id: String(new Date().getTime()), ...projectsForm },
                  ],
                });
                setProjectForm({
                  project: "",
                });
              }}
              className="btn btn-sm btn-outline-primary fw-bold py-0 my-4"
              style={{ fontSize: "12px" }}
            >
              Proje Ekle
            </button>
          </div>

          {/* ***** Skills ***** */}

          <h5 className="fw-bold text-white my-2">Beceriler</h5>
          <hr className="text-white mb-4" />
          {cvForm.skills.map((item) => (
            <div key={item.id} className="row mb-4">
              <div className="col">
                <input
                  disabled
                  value={item.skill}
                  type="text"
                  className="form-control"
                  style={{ fontSize: "12px" }}
                  placeholder="Beceri"
                />
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  onClick={() => deleteSkillsInfo(item.id)}
                  className="btn btn-sm btn-outline-danger fw-bold py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setSkillsForm({
                    ...skillsForm,
                    skill: e.target.value,
                  })
                }
                value={skillsForm.skill}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Beceri"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => {
                setCvForm({
                  ...cvForm,
                  skills: [
                    ...cvForm.skills,
                    { id: String(new Date().getTime()), ...skillsForm },
                  ],
                });
                setSkillsForm({
                  skill: "",
                });
              }}
              className="btn btn-sm btn-outline-primary fw-bold py-0 my-4"
              style={{ fontSize: "12px" }}
            >
              Beceri Ekle
            </button>
          </div>

          {/* ***** Languages ***** */}

          <h5 className="fw-bold text-white my-2">Languages</h5>
          <hr className="text-white mb-4" />
          {cvForm.languages.map((item) => (
            <div key={item.id} className="row mb-4">
              <div className="col">
                <input
                  disabled
                  value={item.language}
                  type="text"
                  className="form-control"
                  style={{ fontSize: "12px" }}
                  placeholder="Proje"
                />
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  onClick={() => deleteLanguagesInfo(item.id)}
                  className="btn btn-sm btn-outline-danger fw-bold py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setLanguagesForm({
                    ...languagesForm,
                    language: e.target.value,
                  })
                }
                value={languagesForm.language}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Language"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => {
                setCvForm({
                  ...cvForm,
                  languages: [
                    ...cvForm.languages,
                    { id: String(new Date().getTime()), ...languagesForm },
                  ],
                });
                setLanguagesForm({
                  language: "",
                });
              }}
              className="btn btn-sm btn-outline-primary fw-bold py-0 my-4"
              style={{ fontSize: "12px" }}
            >
              Dil Ekle
            </button>
          </div>

          {/* ***** SocialPlatforms ***** */}

          <h5 className="fw-bold text-white my-2">Social Platforms</h5>
          <hr className="text-white mb-4" />
          {cvForm.socialPlatforms.map((item) => (
            <div key={item.id} className="row mb-4">
              <div className="col">
                <input
                  disabled
                  value={item.socialPlatform}
                  type="text"
                  className="form-control"
                  style={{ fontSize: "12px" }}
                  placeholder="Social"
                />
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  onClick={() => deleteSocialPlatform(item.id)}
                  className="btn btn-sm btn-outline-danger fw-bold py-0 px-4"
                  style={{ fontSize: "12px" }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                onChange={(e) =>
                  setSocialPlatformsForm({
                    ...socialPlatformsForm,
                    socialPlatform: e.target.value,
                  })
                }
                value={socialPlatformsForm.socialPlatform}
                type="text"
                className="form-control"
                style={{ fontSize: "12px" }}
                placeholder="Social"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => {
                setCvForm({
                  ...cvForm,
                  socialPlatforms: [
                    ...cvForm.socialPlatforms,
                    {
                      id: String(new Date().getTime()),
                      ...socialPlatformsForm,
                    },
                  ],
                });
                setSocialPlatformsForm({
                  socialPlatform: "",
                });
              }}
              className="btn btn-sm btn-outline-primary fw-bold py-0 my-4"
              style={{ fontSize: "12px" }}
            >
              Sosyal Medya Ekle
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-sm btn-primary fw-bold w-50 mb-5"
            >
              CV ' yi Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCvPage;
