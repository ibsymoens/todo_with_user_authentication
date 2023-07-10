import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    todo: {
        type: String,
        require: true
    },
}, { timestamps: true });

export default mongoose.model("todo", todoSchema);