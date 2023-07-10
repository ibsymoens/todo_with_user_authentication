import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8001" });

export const apiSignup = async (obj) => {
    const { data } = await API.post("/users/signup", {
        name: obj.name,
        email: obj.email,
        password: obj.password
    });
    return data;
}

export const apiSignin = async (obj) => {
    const { data } = await API.post("/users/signin", {
        email: obj.email,
        password: obj.password
    });
    return data;
}

export const apiGetUserInfo = async () => {
    const { data } = await API.get("/users/getUserInfo", {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });
    return data;
}

export const apiFetchTodos = async (id) => {
    const { data } = await API.get(`/todos/fetchTodos/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        },
    });
    return data;
}

export const apiCreateTodo = async (todo, id) => {
    const { data } = await API.post("/todos/createTodo", {
        userId: id,
        todo
    });
    return data;
}

export const apiUpdateTodo = async (todo, id) => {
    const { data } = await API.patch(`/todos/updateTodo`, {
        id,
        todo
    });
    return data;
}

export const apiDeleteTodo = async (id) => {
    const { data } = await API.delete(`/todos/deleteTodo/${id}`);
    return data;
}