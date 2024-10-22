import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:3001/api/v1/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//       // Có thể thêm token vào headers nếu cần
//       const token = localStorage.getItem('token'); // Ví dụ token từ localStorage
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );

export default instance;