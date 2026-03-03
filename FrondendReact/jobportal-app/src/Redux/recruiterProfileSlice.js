import { createSlice } from "@reduxjs/toolkit";

const recruiterProfileSlice = createSlice({
    name : 'recruiterProfile',
    initialState : {
        profile : null,
        error : null
    },
    reducers : {
        IsRecruiterProfileSuccess : (state,action) => {
            state.profile = action.payload
        },
        IsRecruiterProfileFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsRecruiterProfileSuccess,IsRecruiterProfileFailure} = recruiterProfileSlice.actions

export default recruiterProfileSlice.reducer
