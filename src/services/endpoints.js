const endPoints = {
  LOGIN_USER: "/user/login",
  REFRESH_USER: "/user/refreshAccessToken",
  SEND_RESET_PASSWORD_EMAIL:"/auth/forgot-password",
  MAGIC_LINK: "/user/sendMagicLink",
  UPLOAD_AVATAR: "/user/uploadAvatar",
  DELETE_USER: "/user/deleteUser",
  DELETE_AVATAR: "/user/deleteAvatar",
  GET_USER_DETAILS: "/user/currUserInfo",
  UPDATE_USER_DETAILS: "/user/updateUserInfo",
  GET_OTP: "/verification/sendOtp",
  VERIFY_OTP: "/verification/verifyOTP",
  LOGOUT_USER: "/user/logout",
  CREATE_MEETING: "/meeting/createMeeting",
  GET_MEETING_BY_ID: (id) => `/meeting/getMeetingById/${id}`,
  DELETE_MEETING_BY_ID: (id) => `meeting/deleteMeeting/${id}`,
  GET_DASHBOARD_STATS: "/meeting/getDashBoardStats",
  GET_ALL_MY_MEETINGS: ({ pageNo, items }) =>
    "/meeting/getMeetings" + `?pageNo=${pageNo}&items=${items}`,
  GET_UPCOMING_MEETINGS: ({ pageNo, items }) =>
    "/meeting/getUpCommingMeetings" + `?pageNo=${pageNo}&items=${items}`,
  GET_PENDING_MEETINGS: ({ pageNo, items }) =>
    "/meeting/getPendingMeetings" + `?pageNo=${pageNo}&items=${items}`,
  UPDATE_MEETING_DETAILS: (meetingId) => `/meeting/editMeeting/${meetingId}`,
  GET_CONFLICTS: (id) => `/meeting/conflicts/${id}`,
  REJECT_MEETING: "/meeting/rejectMeeting",
  ACCEPT_MEETING: "/meeting/acceptMeeting",
  GET_DEFAULT_SETTINGS: "/user/getUserSettings",
  UPDATE_USER_SETTINGS: "/user/putUserSettings",
  GET_NEARBYPLACES: (meetingId, typeQuery) =>
    `/meeting/getNearByPlaces/${meetingId}?type=${typeQuery}`,
  POPULATE_SUGGESTED_PLACES: (meetingId) =>
    `/meeting/populatedSugestedPlaces/${meetingId}`,
  GET_SUGGESTED_PLACES: (meetingId) => `/meeting/suggestedPlaces/${meetingId}`,
  TOGGELE_LIKES_DISLIKES_BY_SUGGESTEDPLACEID: (id) =>
    `/meeting/toggleLikes/${id}`,
  GENERATE_USER_REPORT: "/meeting/userReport",
  GENERATE_MEETING_REPORT: "/meeting/meetingReport",
  GET_FINALIZED_LOCATION: (meetingId) =>
    `/meeting/finalizedLocation/${meetingId}`,
  

};
export default endPoints;
