/* eslint-disable no-undef */
import axios from "axios";

export default axios.create({
  // baseURL: "",
  // headers: {
  //   // "X-Requested-With": "XMLHttpRequest",
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,

  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
