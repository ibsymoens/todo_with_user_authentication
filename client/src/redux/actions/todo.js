import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todo: []   
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        create_todo: (state, action) => {
            return {...state, todo: [action.payload, ...state.todo]}
        },
        fetch_todos: (state, action) => {
            state.todo = action.payload;
        },
        delete_todo: (state, action) => {
            return {...state, todo: state.todo.filter(todo => todo._id !== action.payload)}
        }
    }
});

export const { create_todo, fetch_todos, likecount_todo, delete_todo } = todoSlice.actions;
export default todoSlice.reducer;