import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Todo_Routes from "./routes/todo.route.js";
const app = express();
app.use(cors(
  origin:["https://todoos-beta.vercel.app"],
  methods:["POST,GET"],
));
app.use(express.json());
const PORT = 5001;

mongoose
  .connect("mongodb+srv://bara:VZFVKsBQ7S7wZoQR@cluster0.zjiuz.mongodb.net/todo_app?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/todo_app", Todo_Routes);

app.listen(PORT, console.log("server is running on port", PORT));
