import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/actions/auth";
import { apiCreateTodo } from "../api";
import { create_todo } from "../redux/actions/todo";


const initialState = {todo: ""}

const Todo = () => {
    const [todo, setTodo] = useState(initialState);
    const dispatch = useDispatch();
    const authSelector = useSelector(state => state.auth);

    const handleSignout = () => {
        dispatch(signout());
    }

    const addTodo = (e) => {
        e.preventDefault();
   
        apiCreateTodo(todo.todo, authSelector?.userInfo?.userId)
            .then(res => dispatch(create_todo(res)))
            .catch(() => {
                alert("Session Expired.");
                dispatch(signout());
            });
        setTodo(initialState);
    }

    return (
        <>
            <div style={{
                display: "flex",
                margin: "20px 0"
            }}>
                <h3 style={{ marginRight: "100px" }}>Hello, {authSelector?.userInfo?.userName}</h3>
                <button onClick={handleSignout}>Sign out</button>
            </div>
            <form onSubmit={addTodo}>
                <input 
                    type="text" 
                    name="todo" 
                    value={todo.todo}
                    onChange={(e) => setTodo({...todo, [e.target.name]: e.target.value})}
                    placeholder="Add TODO" 
                    required />
                <button type="submit">Add</button>
            </form>
        </>
    );
}

export default Todo;