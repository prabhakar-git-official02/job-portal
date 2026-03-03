import { createSlice } from "@reduxjs/toolkit";

const adminProfileSlice = createSlice({
    name : 'adminProfile',
    initialState : {
        profile : null,
        error : null
    },
    reducers : {
        IsAdminProfileSuccess : (state,action) => {
            state.profile = action.payload
        },
        IsAdminProfileFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsAdminProfileSuccess,IsAdminProfileFailure} = adminProfileSlice.actions

export default adminProfileSlice.reducer