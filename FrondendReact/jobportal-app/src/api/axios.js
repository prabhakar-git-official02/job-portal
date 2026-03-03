import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});



api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Avoid infinite loop
    if (originalRequest?.url?.includes("/auth/refresh")) {
      console.log("Session Expired", "Please login again", "error");
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshErr) {
        console.log("Session Expired", "Please login again", "error");
        return Promise.reject(refreshErr);
      }
    }

    // Other errors
    console.log(
      "Error",
      err.response?.data?.msg || err.message || "Something went wrong",
      "error"
    );

    return Promise.reject(err);
  }
);



export default api;