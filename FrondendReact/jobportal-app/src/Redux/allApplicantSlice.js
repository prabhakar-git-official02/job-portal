import { createSlice } from "@reduxjs/toolkit";

const allApplicantSlice = createSlice({
    name : 'allApplicants',
    initialState : {
        All_Applicants : null,
        error : null
    },
    reducers : {
        IsAllApplicantsSuccess : (state,action) => {
            state.All_Applicants = action.payload
        },
        IsAllApplicantFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsAllApplicantsSuccess,IsAllApplicantFailure} = allApplicantSlice.actions

export default allApplicantSlice.reducer