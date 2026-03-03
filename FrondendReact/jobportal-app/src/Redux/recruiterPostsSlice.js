import { createSlice } from "@reduxjs/toolkit";

const recruiterPostsSlice = createSlice({
    name : 'recruiterPosts',
    initialState : {
        Posts : null,
        error : null
    },
    reducers : {
        IsRecruiterPostsSuccess : (state,action) => {
            state.Posts = action.payload
        },
        IsRecruiterPostsFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsRecruiterPostsSuccess,IsRecruiterPostsFailure} = recruiterPostsSlice.actions

export default recruiterPostsSlice.reducer