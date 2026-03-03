import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import jobseekerProfileReducer from './jobseekerProfileSlice'
import recruiterProfileReducer from './recruiterProfileSlice'
import adminProfileReducer from './adminProfileSlice'
import applicantReducer from './applicantSlice'
import allPostsReducer from './allPostsSlice'
import savedJobsReducer from './savedJobsSlice'
import recruiterPostsReducer from './recruiterPostsSlice'
import cloudinaryReducer from './cloudinarySlice'
import ErrorReducer from './ErrorSlice'
import ResetTokenReducer from './ResetTokenSlice'
import loginActivityReducer from './loginActivitySlice'
import allApplicantReducer from './allApplicantSlice'
import notificationReducer from './notificationSlice'
import interviewsReducer from './interviewSlice'
import allRecruitersReducer from './allRecruitersSlice'
import allJobseekersReducer from './allJobseekersSlice'
export const store = configureStore({
    reducer : {
        auth : authReducer,
        jobseekerProfile : jobseekerProfileReducer,
        recruiterProfile : recruiterProfileReducer,
        adminProfile : adminProfileReducer,
        applicantMemory : applicantReducer,
        allPosts : allPostsReducer,
        savedJobs : savedJobsReducer,
        recruiterPosts : recruiterPostsReducer,
        cloudinary : cloudinaryReducer,
        errorMemory : ErrorReducer,
        resetToken : ResetTokenReducer,
        loginActivity : loginActivityReducer,
        allApplicants : allApplicantReducer,
        notifications : notificationReducer,
        Interviews : interviewsReducer,
        allRecruiters : allRecruitersReducer,
        allJobseekers : allJobseekersReducer
    }
})
