// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finalproject-nydd.onrender.com',
});

// Add a request interceptor
api.interceptors.request.use(config => {
  // Get token from local storage
  const token = localStorage.getItem('token');
  if (token) {
    // Set the Authorization header with the token
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Remove Authorization header if no token
    delete config.headers.Authorization;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // If 401 Unauthorized, remove token from local storage
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
});

export default api;
