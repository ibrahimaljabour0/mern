import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://todo-backend-sandy-one.vercel.app/todo_app"
});
