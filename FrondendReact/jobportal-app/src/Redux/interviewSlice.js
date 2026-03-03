import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name : "Interviews",
    initialState : {
        interviews : null,
        error : null
    },
    reducers : {
        IsInterviewsSuccess : (state,action) => {
            state.interviews = action.payload
        },
        IsInterviewsFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsInterviewsSuccess,IsInterviewsFailure} = interviewSlice.actions

export default interviewSlice.reducer