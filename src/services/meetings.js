import axios from "../axios/instance.js";
// import axios from 'axios';
import endPoints from "./endpoints.js";
export const createMeeting = (data) =>
  axios.post(endPoints.CREATE_MEETING, data);
export const getMeetingById = (id) =>
  axios.get(endPoints.GET_MEETING_BY_ID(id));
export const deleteMeetingById = (id) =>
  axios.delete(endPoints.DELETE_MEETING_BY_ID(id));
export const dashBoardStats = () => axios.get(endPoints.GET_DASHBOARD_STATS);
export const getMymeetings = (data) =>
  axios.get(endPoints.GET_ALL_MY_MEETINGS(data));
export const getUpcomingMeetings = (data) =>
  axios.get(endPoints.GET_UPCOMING_MEETINGS(data));
export const getPendingMeetings = (data) =>
  axios.get(endPoints.GET_PENDING_MEETINGS(data));
export const getConflicts = (id) => axios.get(endPoints.GET_CONFLICTS(id));
export const rejectMeeting = (meetingId) =>
  axios.put(endPoints.REJECT_MEETING, { meetingId });
export const acceptMeeting = (data) =>
  axios.put(endPoints.ACCEPT_MEETING, data);
export const updatemeetingDetails = (meetingId, data) =>
  axios.put(endPoints.UPDATE_MEETING_DETAILS(meetingId), data);
export const getNearByPlaces = (meetingId, types) => {
  const typeQuery = types.join(",");
  return axios.get(endPoints.GET_NEARBYPLACES(meetingId, typeQuery));
};
// // export const toggleLikePlace = (suggestedPlacesId) => {
// //   return axios.put(`/suggestedLocations/${suggestedPlacesId}/toggleLike`);
// // };
export const populateSuggestedPlaces = (meetingId, data) => {
  return axios.post(endPoints.POPULATE_SUGGESTED_PLACES(meetingId), data);
};
export const getSuggestedPlaces = (meetingId) => {
  return axios.get(endPoints.GET_SUGGESTED_PLACES(meetingId));
};
export const generateMeetingsReport = () => {
  return axios.get(endPoints.GENERATE_MEETING_REPORT);
};
export const toggleLikeDislikeBySuggestedPlaceId = (id) => {
  return axios.put(endPoints.TOGGELE_LIKES_DISLIKES_BY_SUGGESTEDPLACEID(id));
};
export const getFinalizedLocation = (meetingId,suggestedId) => {
  return axios.put(endPoints.GET_FINALIZED_LOCATION(meetingId),suggestedId);
};
