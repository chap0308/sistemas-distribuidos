import axios from 'axios'

export const clienteAxios = axios.create({
    // baseURL: `${process.env.URL_BACKEND}`
    baseURL: "http://localhost:8080/api"
})
export const authAxios = axios.create({
    // baseURL: `${process.env.URL_BACKEND}`
    baseURL: "http://localhost:8080/auth"
})
