import {
  postRequest,
  getRequest,
  getPublicRequest,
  patchRequest,
  deleteRequest,
} from "./ApiHelper";

import {
  REGISTER_USER,
  LOGIN_USER,
  GET_PROFILE,
  GET_COMPLETE_PROFILE,
  GET_PUBLIC_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
  GET_SINGLE_LINK,
  GET_ALL_LINKS,
  CREATE_LINK,
  DELETE_LINK,
  UPDATE_LINK,
} from "../constants/ApiConstants";

// USER ENDPOINT_API SERVICES
const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const data = {
    username,
    email,
    password,
  };
  const response = await postRequest(REGISTER_USER, data);
  console.log(response);
  return response;
};

const loginUser = async (email: string, password: string) => {
  const data = {
    email,
    password,
  };
  const response = await postRequest(LOGIN_USER, data);
  console.log(response);
  return response;
};

// PROFILE ENDPOINT_API SERVICES
const getProfile = async (token: string) => {
  const response = await getRequest(GET_PROFILE, token);
  console.log(response);
  return response;
};

const getPublicProfile = async (userId: string) => {
  const response = await getPublicRequest(GET_PUBLIC_PROFILE, userId);
  return response;
};

const getCompleteProfile = async (token: string) => {
  const response = await getRequest(GET_COMPLETE_PROFILE, token);
  return response;
};

const createProfile = async (
  dateOfBirth: string,
  bio: string,
  avatar: string,
  token: string
) => {
  const data = {
    dateOfBirth,
    bio,
    avatar,
  };
  const response = await postRequest(CREATE_PROFILE, data, token);
  return response;
};

const updateProfile = async (
  dateOfBirth: string,
  bio: string,
  token: string
) => {
  const data = {
    dateOfBirth,
    bio,
  };
  const response = await patchRequest(UPDATE_PROFILE, data, token);
  return response;
};

const updateAvatar = async (avatar: string, token: string) => {
  const data = {
    avatar,
  };
  const response = await patchRequest(UPDATE_AVATAR, data, token);
  return response;
};

// LINK ENDPOINT_API SERVICES
const getSingleLink = async (linkId: string, token: string) => {
  const response = await getRequest(GET_SINGLE_LINK, token, linkId);
  return response;
};

const getAllLinks = async (token: string) => {
  const response = await getRequest(GET_ALL_LINKS, token);
  return response;
};

const createLink = async (title: string, url: string, token: string) => {
  const data = {
    title,
    url,
  };
  const response = await postRequest(CREATE_LINK, data, token);
  return response;
};

const updateLink = async (title: string, url: string, token: string) => {
  const data = {
    title,
    url,
  };
  const response = await patchRequest(UPDATE_LINK, data, token);
  return response;
};

const deleteLink = async (linkId: string, token: string) => {
  const response = await deleteRequest(DELETE_LINK, linkId, token);
  return response;
};

export {
  registerUser,
  loginUser,
  getProfile,
  getPublicProfile,
  getCompleteProfile,
  createProfile,
  updateProfile,
  updateAvatar,
  getSingleLink,
  getAllLinks,
  createLink,
  updateLink,
  deleteLink,
};
