import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL_BACKEND || 'http://localhost:4000/api/',
});

// Add a request interceptor
httpRequest.interceptors.request.use(
    function (config) {
            // Do something before request is sent
        const access_token=localStorage.getItem("access_token")
        if(!access_token){
             return config;
        }
        config.headers.Authorization =JSON.parse(access_token)
        // const user= 
        return config;

    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
httpRequest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);
