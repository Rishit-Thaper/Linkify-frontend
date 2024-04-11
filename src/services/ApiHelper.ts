import { API_DEV_BASE_URL } from '../constants/ApiConstants';
const postRequest = async <T>(endpoint: string, data: T, token?: string) => {
    console.log('APIHELPER', data);
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

const postProfileRequest = async (endpoint: string, formData: FormData, token?: string) => {
    console.log('APIHELPER', formData);
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

const updateAvatarRequest = async (endpoint: string, formData: FormData, token?: string) => {
    console.log('APIHELPER', formData);
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'PATCH',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

const getRequest = async (endpoint: string, token: string, id?: string) => {
    const response = await fetch(API_DEV_BASE_URL + endpoint + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

const getPublicRequest = async (endpoint: string) => {
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

const patchRequest = async <T>(endpoint: string, data: T, token: string) => {
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

const deleteRequest = async (endpoint: string, id: string, token: string) => {
    const response = await fetch(API_DEV_BASE_URL + endpoint + id, {
        method: 'DELETE_LINK',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    return json;
};

export {
    postRequest,
    getRequest,
    getPublicRequest,
    patchRequest,
    deleteRequest,
    postProfileRequest,
    updateAvatarRequest,
};
