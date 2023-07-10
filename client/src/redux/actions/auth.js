import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userInfo: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signin: (state, action) => {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;
            state.userInfo = {
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userId: action.payload.userId
            }
        },
        signup: (state, action) => {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;
            state.userInfo = {
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userId: action.payload.userId
            }
        },
        signout: (state) => {
            state.token = null;
            state.userInfo = {};
            localStorage.clear();
            window.location.reload();
        },
        setsessiontoken: (state) => {
            state.token = localStorage.token;
        },
        setuserinfo: (state, action) => {
            state.userInfo = {
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userId: action.payload.userId
            }
        }
    }
});

export const { signin, signup, signout, setsessiontoken, setuserinfo } = authSlice.actions;
export default authSlice.reducer;