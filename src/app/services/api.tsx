import axios from "axios";


const BASEURL = "https://tech-tea-backend.vercel.app/"

const api = axios.create({
    baseURL: BASEURL
})

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('ACCESS_TOKEN')
//     config.headers.Authorization = `Bearer ${token}`
//     return config;
// })

export default api