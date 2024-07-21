export const API_DOMAIN = "http://localhost:9000/api/v1/";

export const get = async (path) => {
  const respone = await fetch(API_DOMAIN + path, {
    withCredntials: true,
    credentials: 'include'
  });
  const result = await respone.json();
  return result;
}

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const del = async (path) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "DELETE"
  })
  const result = await respone.json();
  return result;
}

export const patch = async (path, options) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },credentials: 'include',
    body: JSON.stringify(options)
  })
  const result = await respone.json();
  return result;
}

export const getToken = async (path, token) => {
  const respone = await fetch(API_DOMAIN + path, {
    headers: { Authorization: `Bearer ${token}` },
    withCredntials: true,
    credentials: 'include'
  });
  const result = await respone.json();
  return result;
}

export const postToken = async (path, token, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const patchToken = async (path, token, options) => {
  const respone = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify(options)
  })
  const result = await respone.json();
  return result;
}
