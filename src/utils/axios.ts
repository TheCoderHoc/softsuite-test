import axios from "axios"

const baseURL = "https://650af6bedfd73d1fab094cf7.mockapi.io/"

export const axiosInstance = axios.create({
    baseURL,
})