import { createSlice } from "@reduxjs/toolkit";

const loginActivitySlice = createSlice({
    name : 'loginActivity',
    initialState : {
        loginHistory : null,
        error : null
    },
    reducers : {
        IsLoginHistorySuccess : (state,action) => {
            state.loginHistory = action.payload
        },
        IsLoginHistoryFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsLoginHistorySuccess,IsLoginHistoryFailure} = loginActivitySlice.actions

export default loginActivitySlice.reducer