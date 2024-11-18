export const HOST=import.meta.env.VITE_API_ENDPOINT
// http://localhost:8000/api/v1/user/signup
export const AUTHROUTE="/api/v1/user"
export const SIGNUP=`${AUTHROUTE}/signup`
export const LOGIN=`${AUTHROUTE}/login`
export const USER_DETAILS=`${AUTHROUTE}/user-profile`
export const UPDATE_PROFILE=`${AUTHROUTE}/update-profile`
export const UPDATE_AVATAR=`${AUTHROUTE}/update-avatar`
export const DELETE_AVATAR=`${AUTHROUTE}/delete-avatar`
export const LOGOUT=`${AUTHROUTE}/logout`