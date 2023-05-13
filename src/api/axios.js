/* eslint-disable no-undef */
import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8000",
  // headers: {
  //   // "X-Requested-With": "XMLHttpRequest",
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,

  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
