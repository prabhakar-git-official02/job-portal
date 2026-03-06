import express from "express";
import { authmiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

import {
  Admin_profile_Post,
  Admin_Profile_Update,
  Admin_Profile_Get,
  Admin_Profile_Delete,
} from "../controllers/adminProfileController.js";

import {
  Post_Update,
  Post_Delete,
  Post_Get,

  all_users,
  all_Recruiters_Get,
  all_Jobseekers_Get,

  AppliedJob_Get,
  AppliedJob_Delete,
  Post_Status_Update
} from "../controllers/adminCrudController.js";



const route = express.Router();

// admin profile routes (Test-ok) - for admin
route.post('/profilePost',authmiddleware,adminMiddleware,Admin_profile_Post)
route.patch("/profileUpdate",authmiddleware,adminMiddleware,Admin_Profile_Update); //create/update admin profile
route.get("/profileGet",authmiddleware,adminMiddleware,Admin_Profile_Get); //get admin profile
route.delete("/profileDelete",authmiddleware,adminMiddleware,Admin_Profile_Delete); //delete admin profile


// admin Get Reqs
route.get('/allUsers/Get',authmiddleware,adminMiddleware,all_users)
route.get('/allRecruiters/Get',authmiddleware,adminMiddleware,all_Recruiters_Get)
route.get('/allJobseekers/Get',authmiddleware,adminMiddleware,all_Jobseekers_Get)


// recruiter posts (Test-ok) - for admin
route.patch('/updatePost/:id',authmiddleware,adminMiddleware,Post_Update); // update recruiter status
route.delete('/deletePost/:id',authmiddleware,adminMiddleware,Post_Delete); // delete recruiter post
route.get('/getPosts',authmiddleware,adminMiddleware,Post_Get); // get all recruiter posts

// post status update
route.patch('/recruiterPost/status/update/:id',authmiddleware,adminMiddleware,Post_Status_Update)


// applicants applied jobs (Test-ok) - for Recruiter
route.get('/getJobs',authmiddleware,adminMiddleware, AppliedJob_Get); // get applied jobs
route.delete('/deleteJob/:applicantId/:jobid', authmiddleware, adminMiddleware, AppliedJob_Delete);


export default route

