import { createSlice } from "@reduxjs/toolkit";

const applicantSlice = createSlice({
    name : 'applicantMemory',
    initialState : {
        applicant : null,
        error : null
    },
    reducers : {
        IsApplicantSuccess : (state,action) => {
            state.applicant = action.payload
        },
        IsApplicantFailure : (state) => {
            state.error = "Applicant not found!"
        }
    }
})

export const {IsApplicantSuccess,IsApplicantFailure} = applicantSlice.actions

export default applicantSlice.reducer