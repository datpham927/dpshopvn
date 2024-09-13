import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL_BACKEND || 'http://localhost:4000/api/',
});
export const axiosJWT = axios.create({
    withCredentials: true,// không có cái này thì tình duyệt sẽ không nhận được cookie
    baseURL: import.meta.env.VITE_REACT_API_URL_BACKEND || 'http://localhost:4000/api/',
});

axiosJWT.interceptors.request.use(
    function (config) {
        const access_token=localStorage.getItem("access_token")
        if(!access_token){
             return config;
        }
        config.headers.Authorization =JSON.parse(access_token)
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
); 

// Add a request interceptor
// axiosJWT.interceptors.request.use(
//     async (config) => {
//       const access_token = localStorage.getItem('access_token');
//       if (!access_token) return config;
//       const decode: any  = jwt_decode(JSON.parse(access_token));
//       const currentTime = new Date();
//       if (decode.exp < currentTime.getTime() / 1000) {
//         const data = await apiRefreshToken();
//         console.log(data);
//         if (data.success) {
//           localStorage.setItem('access_token', JSON.stringify(data.refresh_token));
//           config.headers.Authorization = `Bearer ${data.refresh_token}`;
//         }
//       }
//       return config;
//     },
//     function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     },
//   );