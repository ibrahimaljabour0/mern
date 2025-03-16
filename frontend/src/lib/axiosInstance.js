import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: "https://todoos-beta.vercel.app/todo_app"
})
