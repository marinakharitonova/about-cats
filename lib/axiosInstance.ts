import axios from "axios";

/**
 * Axios instance to make requests to Cat API https://developers.thecatapi.com/
 */
export const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
})

instance.defaults.headers.common['x-api-key'] = process.env.API_KEY

