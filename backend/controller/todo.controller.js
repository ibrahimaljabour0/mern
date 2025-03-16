import TodoModel from "../models/todo.model.js";

export const add = async (req, res)=>{
    try {
        const {name} = req.body
        const find = await TodoModel.findOne({name})
        if (!find) {
            const newTodo = await TodoModel.create({name});
           return res.status(200).json({newTodo, notFind:true});
        }
        return res.status(200).json({notFind:false});
        
    } catch (error) {
        console.log("Error in add controller")
        res.status(500).json(error);
    }
}
export const remove = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleted = await TodoModel.findByIdAndDelete({_id:id})
        res.status(200).json(deleted)
    } catch (error) {
        console.log("Error in remove controller")
        res.status(500).json(error);
    }
}
export const mark = async (req, res)=>{
    try {
        const {id} = req.params;
        const {updatedMark} = req.body;
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, {mark: updatedMark}, {new: true})
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log("Error in mark controller")
        res.status(500).json(error);
    }
}
export const get = async (req, res)=>{
    try {
 
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        console.log("Error in mark controller")
        res.status(500).json(error);
    }
}