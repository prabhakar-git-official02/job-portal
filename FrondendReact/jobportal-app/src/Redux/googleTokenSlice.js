import { createSlice } from "@reduxjs/toolkit";

const googleTokenSlice = createSlice({
    name : 'googleToken',
    initialState : {
        googletoken : null
    },
    reducers : {
        IsGoogletokenSuccess : (state,action) => {
            state.googletoken = action.payload
        }
    }
})

export const {IsGoogletokenSuccess} = googleTokenSlice.actions

export default googleTokenSlice.reducer