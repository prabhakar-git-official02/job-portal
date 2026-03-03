import { createSlice } from "@reduxjs/toolkit";

const ResetTokenSlice = createSlice({
    name : 'resetToken',
    initialState : {
        token : null,
        error : null
    },
    reducers : {
        IsTokenSuccess : (state,action) => {
            state.token = action.payload
        },
        IsTokenFailure : (state,action) => {
            state.error = action.payload
        }
    }
}) 

export const {IsTokenSuccess,IsTokenFailure} = ResetTokenSlice.actions

export default ResetTokenSlice.reducer