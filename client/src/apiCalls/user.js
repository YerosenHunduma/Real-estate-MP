import axios from "axios";
// import axiosInstance from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axios.post("/api/auths/signup", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axios.post("/api/auths/login", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (id, payload) => {
  console.log(payload);
  try {
    const response = await axios.post(`/api/users/update/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUser = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`/api/users/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signOutUser = async () => {
  try {
    const response = await axios.get("/api/auths/logout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createListing = async (payload) => {
  try {
    const response = await axios.post("/api/lists/create-listing", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserList = async (id) => {
  try {
    const response = await axios.get(`/api/users/get-user-lists/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteList = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(`/api/lists/delete/${id}`);
    return response.data;
  } catch (error) {}
};

export const fetchlist = async (id) => {
  try {
    const response = await axios.get(`/api/lists/get-list/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateListing = async (id, payload) => {
  try {
    const response = await axios.post(`/api/lists//update/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchlandlord = async (id) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getListings = async (searchQuery) => {
  try {
    const response = await axios.get(`/api/lists/get-listings?${searchQuery}`);
    return response.data;
  } catch (error) {}
};

export const fetchGoogleAuthUser = async () => {
  try {
    const response = await axios.get("/api/auths/success");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
