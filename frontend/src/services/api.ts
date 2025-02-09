import axios from 'axios';

interface Token {
    accessToken: string
    role: string[]
}

// Hàm để lấy Bearer Token từ localStorage hoặc bất kỳ nguồn nào bạn lưu
const getToken = () => {
    const authData = localStorage.getItem("token")
    const data: Token = authData ? JSON.parse(authData) : ""
    return data.accessToken
};

// Tạo Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENPOINT, // Thay bằng URL API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm Bearer Token vào mỗi request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken(); // Lấy token từ hàm getToken
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default axiosInstance;
