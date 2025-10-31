import axios from "../axios/instance.js";
import endPoints from "./endpoints.js";
export const uploadAvatar = (data) => axios.post(endPoints.UPLOAD_AVATAR, data);
export const deleteAvatar = () => axios.post(endPoints.DELETE_AVATAR);
export const getUserProfileInfo = () => axios.get(endPoints.GET_USER_DETAILS);
export const updateUserProfileInfo = (data) =>
  axios.put(endPoints.UPDATE_USER_DETAILS, data);
export const deleteUserAccount = () => axios.delete(endPoints.DELETE_USER);
export const getUserDefaultSettings = () =>
  axios.get(endPoints.GET_DEFAULT_SETTINGS);
export const updateUserDefaultSettings = (settings) =>
  axios.put(endPoints.UPDATE_USER_SETTINGS, settings);
export const generateUserReport = () => {
  return axios.get(endPoints.GENERATE_USER_REPORT);
}