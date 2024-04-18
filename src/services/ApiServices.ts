import {
    postRequest,
    getRequest,
    getPublicRequest,
    patchRequest,
    deleteRequest,
    postProfileRequest,
    getIdRequest,
    patchProfileRequest,
} from './ApiHelper';

import {
    REGISTER_USER,
    LOGIN_USER,
    GET_PROFILE,
    GET_COMPLETE_PROFILE,
    GET_PUBLIC_PROFILE,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    // UPDATE_AVATAR,
    GET_SINGLE_LINK,
    GET_ALL_LINKS,
    CREATE_LINK,
    DELETE_LINK,
    UPDATE_LINK,
} from '../constants/ApiConstants';

// USER ENDPOINT_API SERVICES
const registerUser = async (username: string, email: string, password: string) => {
    const data = {
        username,
        email,
        password,
    };
    const response = await postRequest(REGISTER_USER, data);
    return response;
};

const loginUser = async (email: string, password: string) => {
    const data = {
        email,
        password,
    };
    const response = await postRequest(LOGIN_USER, data);
    return response;
};

// PROFILE ENDPOINT_API SERVICES
const getProfile = async (token: string) => {
    const response = await getRequest(GET_PROFILE, token);
    return response;
};

const getPublicProfile = async (userId: string) => {
    const response = await getPublicRequest(`${GET_PUBLIC_PROFILE}${userId}`);
    return response;
};

const getCompleteProfile = async (token: string) => {
    const response = await getRequest(GET_COMPLETE_PROFILE, token);
    return response;
};

const createProfile = async (formData: FormData, token: string) => {
    const response = await postProfileRequest(CREATE_PROFILE, formData, token);
    return response;
};

const updateProfile = async (
    bio: string | undefined,
    dateOfBirth: string | undefined,
    avatar: File | null,
    token: string
) => {
    const response = await patchProfileRequest(UPDATE_PROFILE, bio, dateOfBirth, avatar, token);
    return response;
};

// LINK ENDPOINT_API SERVICES
const getSingleLink = async (linkId: string, token: string) => {
    const response = await getIdRequest(GET_SINGLE_LINK, token, linkId);
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

const updateLink = async (title: string, url: string, id: string, token: string) => {
    const data = {
        title,
        url,
    };
    const response = await patchRequest(`${UPDATE_LINK}${id}`, data, token);
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
    getSingleLink,
    getAllLinks,
    createLink,
    updateLink,
    deleteLink,
};
