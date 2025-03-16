import mongoose from "mongoose";
const TodoSchema =  new mongoose.Schema({
    name:{type:String,required: true},
    mark:{type:Boolean, default: false}
});
const TodoModel = mongoose.model("Todo", TodoSchema);
export default TodoModel;
