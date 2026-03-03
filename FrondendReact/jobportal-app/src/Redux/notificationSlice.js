import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name : 'notifications',
    initialState : {
        notification : null,
        notificationCount : null,
        error : null
    },
    reducers : {
        IsNotificationSuccess : (state,action) => {
            state.notification = action.payload
        },
        IsNotificationCountSuccess : (state,action) => {
            state.notificationCount = action.payload
        },
        IsNotificationFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {IsNotificationSuccess,IsNotificationCountSuccess,IsNotificationFailure} = notificationSlice.actions

export default notificationSlice.reducer