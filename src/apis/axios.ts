import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_BROKER_URL,
  withCredentials: false,
});

export default axiosInstance;
