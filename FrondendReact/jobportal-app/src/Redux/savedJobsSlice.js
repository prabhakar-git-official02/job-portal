import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
    name : 'savedJobs',
    initialState : {
        SavedJobs : null,
        error : null
    },
    reducers : {
        IsSavedJobsSuccess : (state,action) => {
            state.SavedJobs = action.payload
        },
        IsSavedJobsFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsSavedJobsSuccess,IsSavedJobsFailure} = savedJobsSlice.actions

export default savedJobsSlice.reducer