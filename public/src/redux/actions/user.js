import { SAVE_USER, REMOVE_USER } from "./types";
import { error } from "./main";
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
        .then(resp => {
          if (resp.status === 500)
            dispatch(error("Something went wrong. but we're on it."));
          resp.json();
        })
        .then(data => {
          if (data.msg) {
            console.warn(data.msg);
            localStorage.removeItem("token");
          } else {
            dispatch(save(data));
          }
        })
        .catch(() => dispatch(error("Something went wrong. but we're on it.")));
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
