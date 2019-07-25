import { SAVE_USER, REMOVE_USER } from "./types";

export const save = data => {
  data.token ? localStorage.setItem("token", data.token) : console.log("Token");
  return {
    type: SAVE_USER,
    payload: data.user
  };
};
export const load = () => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.msg) {
            console.warn(data.msg);
            localStorage.removeItem("token");
          } else {
            dispatch(save(data));
          }
        });
    }
  };
};
export const remove = () => {
  window.location.reload();
  localStorage.removeItem("token");
  return {
    type: REMOVE_USER
  };
};
