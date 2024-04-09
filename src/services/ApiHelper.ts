import { API_DEV_BASE_URL } from '../constants/ApiConstants';
const postRequest = async <T>(endpoint: string, data: T, token?: string) => {
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
        // If it's HTML, parse the text response
        const errorMessage = await response.text();
        // Extract error message from HTML response (you may need to customize this)
        throw new Error(errorMessage);
    }
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

export { postRequest, getRequest, getPublicRequest, patchRequest, deleteRequest };
