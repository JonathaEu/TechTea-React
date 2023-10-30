import axios from "axios";


const BASEURL = "http://127.0.0.1:5000/"

const api = axios.create({
    baseURL: BASEURL
})

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('ACCESS_TOKEN')
//     config.headers.Authorization = `Bearer ${token}`
//     return config;
// })

export default api