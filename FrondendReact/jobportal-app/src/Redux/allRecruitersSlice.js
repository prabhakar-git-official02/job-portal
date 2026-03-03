import { createSlice } from "@reduxjs/toolkit";

const allRecruitersSlice = createSlice({
    name : 'allRecruiters',
    initialState : {
       AllRecruiters : null,
        error : null
    },
    reducers : {
        IsAllRecruitersSuccess : (state,action) => {
            state.AllRecruiters = action.payload
        },
        IsAllRecruitersFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsAllRecruitersSuccess,IsAllRecruitersFailure} = allRecruitersSlice.actions

export default allRecruitersSlice.reducer