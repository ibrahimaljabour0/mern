import express, { Router } from "express"
import { add, get, mark, remove } from "../controller/todo.controller.js";
const router = express.Router();
router.post("/add", add)
router.delete("/delete/:id", remove)
router.put("/mark/:id", mark)
router.get("/get", get)

export default router;
