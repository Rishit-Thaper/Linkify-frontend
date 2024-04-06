import { API_BASE_URL } from "../constants/ApiConstants";
const postRequest = async (endpoint: string, data: any, token?: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }
};

const getRequest = async (endpoint: string, token: string, id?: string) => {
  const response = await fetch(API_BASE_URL + endpoint + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }
};

const getPublicRequest = async (endpoint: string, token: string) => {
  const response = await fetch(API_BASE_URL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }
};

const patchRequest = async (endpoint: string, data: any, token: string) => {
  const response = await fetch(API_BASE_URL + endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }
};

const deleteRequest = async (endpoint: string, id: string, token: string) => {
  const response = await fetch(API_BASE_URL + endpoint + id, {
    method: "DELETE_LINK",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }
};

export {
  postRequest,
  getRequest,
  getPublicRequest,
  patchRequest,
  deleteRequest,
};
