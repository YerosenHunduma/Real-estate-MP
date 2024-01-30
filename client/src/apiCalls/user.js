import axiosInstance from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/auths/signup", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/auths/login", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
