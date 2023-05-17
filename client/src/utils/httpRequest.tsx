import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL_BACKEND || 'http://localhost:4000/api/',
});

// Add a request interceptor
httpRequest.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers.Authorization =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUwZDFmYjFkMTM5N2EyNTk1OWRjMTciLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODMyODgxNDIsImV4cCI6MTcxNDgyNDE0Mn0.w2Llt_QDXgQNGxi3D8fckDjm0OVhLXfydKvumABFIcE';
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
