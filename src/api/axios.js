import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
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