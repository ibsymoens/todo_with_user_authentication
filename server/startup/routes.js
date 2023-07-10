import express from "express";
import users from "../routes/users.js";
import todos from "../routes/todos.js";

const app = express();

app.use("/users", users);
app.use("/todos", todos);

export default app;