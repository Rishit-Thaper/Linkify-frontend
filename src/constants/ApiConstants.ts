//  user endpoints
const API_DEV_BASE_URL = import.meta.env.VITE_DEVELOPMENT_BASE_URL;
const API_PROD_BASE_URL = import.meta.env.VITE_PRODUCTION_URL;
const REGISTER_USER = "/api/v1/users/register";
const LOGIN_USER = "/api/v1/users/login";

//  profile endpoints
const GET_PROFILE = "/api/v1/profile/getProfile";
const GET_COMPLETE_PROFILE = "/api/v1/profile/getCompleteProfile";
const GET_PUBLIC_PROFILE = "/api/v1/profile/publicProfile/";
const CREATE_PROFILE = "/api/v1/profile/createProfile";
const UPDATE_PROFILE = "/api/v1/profile/updateProfile";
const UPDATE_AVATAR = "/api/v1/profile/updateAvatar";

//  link endpoints
const GET_SINGLE_LINK = "/api/v1/links/getSingleLink/";
const GET_ALL_LINKS = "/api/v1/links/getAllLinks";
const CREATE_LINK = "/api/v1/links/createLink";
const DELETE_LINK = "/api/v1/links/deleteLink/";
const UPDATE_LINK = "/api/v1/links/updateLink/";

export {
  REGISTER_USER,
  LOGIN_USER,
  GET_PROFILE,
  GET_COMPLETE_PROFILE,
  GET_PUBLIC_PROFILE,
  API_DEV_BASE_URL,
  API_PROD_BASE_URL,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
  GET_SINGLE_LINK,
  GET_ALL_LINKS,
  CREATE_LINK,
  DELETE_LINK,
  UPDATE_LINK,
};
