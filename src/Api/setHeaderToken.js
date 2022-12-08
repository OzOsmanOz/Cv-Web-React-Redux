import api from "../Api/api";

const setHeaderToken = () => {
  api.defaults.headers.common["token"] = localStorage.getItem("token");
};
export default setHeaderToken;
