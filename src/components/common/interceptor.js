// import axios from '../../axios/axios';
// import Cookies from 'js-cookie';
// import { addUser, removeUser } from '../../slices/userSlice.js';
// import  store from '../../slices/store.js';

// export default axios.interceptors.response.use(
//   (response) => {
//     // If the response is successful, just return the response
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = store.getState().user[0]?.refreshToken;
//         const response = await axios.post('/user/accessToken', {
//           refreshToken,
//         });

//         const newAccessToken = response.data.accessToken;

//         // Update the token in the cookies and redux store
//         Cookies.set('token', newAccessToken, { expires: 1, secure: true });
//         store.dispatch(addUser({
//           id: store.getState().user[0]?.id,
//           accessToken: newAccessToken,
//           refreshToken,
//         }));

//         // Retry the original request with the new token
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (err) {
//         // If refreshing fails, log out the user and redirect to login
//         store.dispatch(removeUser());
//         return Promise.reject(err);
//       }
//     }

//     // If the error is not 401, just return the error
//     return Promise.reject(error);
//   }
// );

