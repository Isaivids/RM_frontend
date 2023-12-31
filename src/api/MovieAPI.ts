import axios from 'axios';

export const MovieAPI = axios.create({
    baseURL: `http://localhost:9100`,
})