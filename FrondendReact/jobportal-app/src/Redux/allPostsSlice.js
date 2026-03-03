import { createSlice } from "@reduxjs/toolkit";

const allPostsSlice = createSlice({
    name : 'allPosts',
    initialState : {
        Posts : null,
        error : null
    },
    reducers : {
        IsAllPostsSuccess : (state,action) => {
            state.Posts = action.payload
        },
        IsAllPostsFailure : (state) => {
            state.error = "No Available"
        }
    }
})

export const {IsAllPostsSuccess,IsAllPostsFailure} = allPostsSlice.actions

export default allPostsSlice.reducer