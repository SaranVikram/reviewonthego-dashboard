import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PRIVATE_API_URL
console.log("Base URL is:", baseURL) // This will log the URL being used

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

export default api
