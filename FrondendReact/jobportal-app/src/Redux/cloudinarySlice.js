import { createSlice } from "@reduxjs/toolkit";

const cloudinarySlice = createSlice({
    name : 'cloudinary',
    initialState : {
        ImageUrl : null,
        ResumeUrl : null,
        ImagePublicId : null,
        ResumePublicId : null,
        error : null
    },
    reducers : {
        IsImageUrlSuccess : (state,action) => {
            state.ImageUrl = action.payload
        },
        IsImagePublicIdSuccess : (state,action) => {
            state.ImagePublicId= action.payload
        },
        IsResumeUrlSuccess : (state,action) => {
            state.ResumeUrl = action.payload
        },
        IsResumePublicIdSuccess : (state,action) => {
            state.ResumePublicId = action.payload
        },
        IsCloudinaryFailure : (state,action) => {
            state.error = action.payload
        }
    }
})

export const {
    IsImageUrlSuccess,
    IsImagePublicIdSuccess,
    IsResumeUrlSuccess,
    IsResumePublicIdSuccess,
    IsCloudinaryFailure
} = cloudinarySlice.actions

export default cloudinarySlice.reducer