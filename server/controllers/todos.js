import Todo from "../models/Todo.js";

export const fetchTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch(err) {
        res.status(401).json({ message: "Unauthorized." });
    }
}

export const createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            userId: req.body.userId,
            todo: req.body.todo
        });
        res.status(201).json(await newTodo.save());
    } catch(err) {
        res.status(401).json({message: err.message});
    }
}

export const updateTodo = async (req, res) => {
    const { id, todo } = req.body;
    try {
        const test = await Todo.findOne({ _id: id })
        await Todo.findOneAndUpdate({ _id: id }, { $set: { todo }});
        res.status(200).json({ message: "Saved." });        
    } catch(err) {
        res.status(401).json({message: "Unauthorized."})
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.deleteOne({ _id: id });
        res.status(200).json({message: "Successfully deleted."});
    } catch(err) {
        res.status(401).json({message: "Unauthorized."})
    }
}
