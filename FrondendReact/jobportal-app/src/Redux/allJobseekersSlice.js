import { createSlice } from "@reduxjs/toolkit";

const allJobseekersSlice = createSlice({
    name : 'allJobseekersSlice',
    initialState : {
        AllJobseekers : null,
        error : null
    },
    reducers : {
        IsAllJobseekersSuccess : (state,actions) => {
            state.AllJobseekers = actions.payload
        },
        IsAllJobseekersFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsAllJobseekersSuccess,IsAllJobseekersFailure} = allJobseekersSlice.actions

export default allJobseekersSlice.reducer