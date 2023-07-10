import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./actions/auth";
import todoReducer from "./actions/todo";

const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
    }
});

export default store;