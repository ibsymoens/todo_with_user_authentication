import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiDeleteTodo, apiUpdateTodo } from "../api";
import { delete_todo } from "../redux/actions/todo";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const dispatch = useDispatch();
    const todosSelector = useSelector(state => state.todo.todo);

    useEffect(() => {
        const loadTodos = () => {
            setTodos(todosSelector);
        }

        loadTodos();
    }, [todosSelector]);

    const handleSave = (todo, todoId) => {
        apiUpdateTodo(todo, todoId);
    }

    const handleDelete = (todoId) => {
        apiDeleteTodo(todoId)
            .then(() => dispatch(delete_todo(todoId)))
            .catch(err => {
                console.log(err.response.data.message);
                alert("Session Expired.");
                dispatch(signout());
            });
    }

    const handleTodoChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], [name]: value };
        setTodos(updatedTodos);
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>TODO's</h3>

            {todos.map((todo, index) => 
                <div key={todo._id}>
                    <input 
                        type="text" 
                        value={todo.todo} 
                        name="todo"
                        onChange={(e) => handleTodoChange(e, index)}
                        required />
                    <button onClick={() => handleSave(todo.todo, todo._id)}>save</button>
                    <button onClick={() => handleDelete(todo._id)}>delete</button>
                </div>
            )}
        </div>
    );
}

export default TodoList;