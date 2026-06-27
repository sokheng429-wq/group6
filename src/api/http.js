import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
console.log(import.meta.env.VITE_BASE_URL);

const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(config => {
    let auth = useAuthStore();
    if(auth.token){
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
})

export default api;