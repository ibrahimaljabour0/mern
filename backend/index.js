import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";  // Import dotenv
import Todo_Routes from "./routes/todo.route.js";

dotenv.config();  // Load .env file

const app = express();

app.use(cors({
  origin: [process.env.CLIENT_URL], 
  methods: ["GET", "POST", "PUT", "DELETE"] 
}));

app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/todo_app", Todo_Routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
