import axios from 'axios';
// import authHeader from "./auth-header";
// export const baseUrl = 'http://localhost';
export const baseUrl = '';

export const auth = (data) => axios.post(`${baseUrl}/wastemgt-api.php`, data)

export const setWeight = (data) => axios.post(`${baseUrl}/wastemgt-api.php`, data)
