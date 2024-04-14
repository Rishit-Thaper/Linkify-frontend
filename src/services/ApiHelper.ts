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

const patchProfileRequest = async (
    endpoint: string,
    bio: string | undefined,
    dateOfBirth: string | undefined,
    avatar: File | null,
    token: string
) => {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
    };

    let body: BodyInit;

    if (avatar) {
        const formDataWithAvatar = new FormData();
        formDataWithAvatar.append('avatar', avatar);
        if (bio !== undefined) {
            formDataWithAvatar.append('bio', bio);
        }
        if (dateOfBirth !== undefined) {
            formDataWithAvatar.append('dateOfBirth', dateOfBirth);
        }

        body = formDataWithAvatar;
    } else {
        const jsonBody: Record<string, string> = {};
        if (bio !== undefined) {
            jsonBody.bio = bio;
        }
        if (dateOfBirth !== undefined) {
            jsonBody.dateOfBirth = dateOfBirth;
        }

        body = JSON.stringify(jsonBody);
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(API_DEV_BASE_URL + endpoint, {
        method: 'PATCH',
        body,
        headers,
    });

    const json = await response.json();

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

const getRequest = async (endpoint: string, token: string) => {
    const response = await fetch(API_DEV_BASE_URL + endpoint, {
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
const getIdRequest = async (endpoint: string, token: string, id: string) => {
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
        method: 'DELETE',
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
    patchProfileRequest,
    getIdRequest,
    postProfileRequest,
    updateAvatarRequest,
};
