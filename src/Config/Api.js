import Axios from "axios";

// Constants
const API_DOMAIN = "https://api-crmcak.vps.vn/api"; // DOMAIN API
const API_DecryptString =
  "https://cakshop-api.vps.vn/api/ApiMain/DecryptString";
const API_IMAGE_URL = "https://cakshow-img.vps.vn/";
// const API_IMAGE_UPLOAD = "https://api-crmcak.vps.vn/upload";
const API_IMAGE_UPLOAD = "https://api-crmcak.vps.vn/api/ApiMain/API_spCallPostFile_V2";
const API_KEY = "netcoApikey2025";
const API_KEY_CUSTOMER = "netCoApi2022";

// Axios Instance
export const api = Axios.create({
  baseURL: API_DOMAIN,
  headers: { "Content-Type": "application/json" },
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

// Fetch User Login
const fetchUserLogin = async () => {
  return API_IMAGE_URL;
};

// Initialization
const initialize = async () => {
  await fetchUserLogin();
};

initialize();

// Exports
export const API_END_POINT = API_DOMAIN;
export const API_IMAGE = API_IMAGE_URL;
export const APIImage = API_IMAGE_UPLOAD;
export const APIImage_2 = "https://cakshow-img.vps.vn";
export const APIKey = API_KEY;
export const APIKey_Customer = API_KEY_CUSTOMER;
export const API_DECRYPTSTRING = API_DecryptString;
