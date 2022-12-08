import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import MyProfile from "../page/MyProfilePage";
import ErrorPage from "../page/ErrorPage";
import UpdatePage from "../page/UpdatePage";
import CvsPage from "../page/CvsPage";
import AddCvPage from "../page/AddCvPage";
import UploadPP from "../page/UploadPP";
import LandingPage from "../page/LandingPage";
import DetailPage from "../page/DetailPage";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <MyProfile />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/update",
    element: <UpdatePage />,
  },
  {
    path: "/cvs",
    element: <CvsPage />,
  },
  {
    path: "/addCv",
    element: <AddCvPage />,
  },
  {
    path: "/uploadPP",
    element: <UploadPP />,
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },
];
export default routes;
