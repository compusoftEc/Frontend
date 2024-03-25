import axios from 'axios';

//Cors
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-requested-With': 'XMLHttpRequest',

    },
    withCredentials: false
});

export default clienteAxios;