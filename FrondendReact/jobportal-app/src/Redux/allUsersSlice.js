import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
    name : "allUsers",
    initialState : {
        Users : null,
        error : null
    },
    reducers : {
        IsUsersSuccess : (state,action) => {
            state.Users = action.payload
        },
        IsUsersFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const { IsUsersSuccess,IsUsersFailure } = allUsersSlice.actions

export default allUsersSlice.reducer