import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isLogin : false,
        emailExist : null,
        emailRole:null,
        user : null,
        status : null
    },
    reducers : {
        loginSuccess : (state,action) => {
            state.isLogin = true
            state.user= action.payload
        },
        logout : (state) => {
            state.isLogin = false
            state.user = null
        },
        EmailExistAction : (state,action) => {
            state.emailExist = action.payload
        },
        EmailExistRole : (state,action) => {
            state.emailRole = action.payload
        },
        IsStatus : (state,action) => {
            state.status = action.payload
        }
    }
})

export const {loginSuccess,logout,EmailExistAction,EmailExistRole,IsStatus} = authSlice.actions
export default authSlice.reducer