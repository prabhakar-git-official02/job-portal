import { createSlice } from "@reduxjs/toolkit";

const jobseekerProfileSlice = createSlice({
  name: "jobseekerProfile",
  initialState: {
    profile: null,
    error: null,
  },
  reducers: {
    IsJobseekerProfileSuccess: (state, action) => {
      state.profile = action.payload;
    },
    IsJobseekerProfileFailure: (state,action) => {
      state.error = action.payload
    },
  },
});

export const { IsJobseekerProfileSuccess, IsJobseekerProfileFailure } =
  jobseekerProfileSlice.actions;

export default jobseekerProfileSlice.reducer;
