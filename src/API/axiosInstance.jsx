import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/3', 
});

export default axiosInstance;


