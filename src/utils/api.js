import axios from "axios";

//创建一个axios实例
const api = axios.create({
    baseURL: "/api",
    timeout: 3000
});

export default api;