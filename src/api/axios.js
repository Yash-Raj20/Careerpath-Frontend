import axios from "axios";

const instance = axios.create({
   baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_API_URL + "/api",
  withCredentials: true,
});

export const attachLoading = (setLoading) => {
  instance.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export default instance;