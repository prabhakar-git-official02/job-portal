import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice = createSlice({
    name : 'errorMemory',
    initialState : {
        error : null
    },
    reducers : {
        IsErrorSuccess : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsErrorSuccess} = ErrorSlice.actions

export default ErrorSlice.reducer