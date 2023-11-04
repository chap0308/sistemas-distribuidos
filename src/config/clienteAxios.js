import axios from 'axios'

export const clienteAxios = axios.create({
    // baseURL: `${process.env.URL_BACKEND}`
    baseURL: "http://localhost:8080/api"
})
export const authAxios = axios.create({
    // baseURL: `${process.env.URL_BACKEND}`
    baseURL: "http://localhost:8080/auth"
})
export const authAxiosFromNext = axios.create({
    // baseURL: `${process.env.URL_BACKEND}`
    baseURL: "http://localhost:3000/api/auth"
})
export const uploadAxiosFromNext = axios.create({
    // baseURL: `${process.env.URL_BACKEND}`
    baseURL: "http://localhost:3000/api"
})
