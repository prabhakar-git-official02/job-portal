import express from 'express';
import {
  recruiter_Post_Post,
  recruiter_Post_Update,
  recruiter_Post_Get,
  PostedJob_Skills_Add,
  delete_Posted_Job_Skill,

  jobseeker_AppliedJob_Post,
  jobseeker_AppliedJob_Get,

  Job_Post_Check,
  
  Recruiter_Check,
  Jobseeker_Check,
  Applicants,
 
  Posts_Get,
 Applied_Jobs_Populate,
 Saved_Jobs_Populate,
 Applied_Job_Populate_Get,
 Saved_Job_Get,
 Saved_Job_Delete,
 AppliedJob_Update,
 Get_Notifications,
 SheduleInterview,
 Shedule_Interviews_Get,
 Interview_applicantResult_Update,
 Notification_Delete,
 InterviewStatus_Update
} from '../controllers/jobsController.js';

import { authmiddleware } from '../middleware/auth.js';
import { recruiter_Middleware} from '../middleware/recruiterMiddleware.js'

const route = express.Router();

// recruiters (Test-ok)
route.post('/recruiter/Post', authmiddleware,recruiter_Middleware, recruiter_Post_Post); // create recruiter post
route.patch('/recruiter/Update/:jobId', authmiddleware,recruiter_Middleware, recruiter_Post_Update); // update recruiter post
route.patch('/recruiterPost/skill/Add/:jobId',authmiddleware,recruiter_Middleware,PostedJob_Skills_Add)
route.patch('/recruiterPost/skill/delete/:jobId',authmiddleware,recruiter_Middleware,delete_Posted_Job_Skill)
route.get('/recruiterPosts/Get', authmiddleware,recruiter_Middleware,recruiter_Post_Get); // get all recruiter posts


// Post check
route.post('/jobPostCheck/Post',authmiddleware,recruiter_Middleware,Job_Post_Check)

// applicants (Test-ok)
route.post('/jobseeker/apply/:jobId',authmiddleware,jobseeker_AppliedJob_Post)
route.get('/jobseeker/Get', authmiddleware, jobseeker_AppliedJob_Get); // get applied jobs

// user post Check
route.post('/recruiterCheck',authmiddleware,recruiter_Middleware,Recruiter_Check)

// applicant check
route.post('/jobseekerCheck',authmiddleware,Jobseeker_Check)

// get All Posts
route.get('/getAllPosts',authmiddleware,Posts_Get);

// get all applied jobs
route.get('/getApplicants',authmiddleware,Applicants)

// applied Job populate
route.post('/appliedJobs/populate',authmiddleware,Applied_Jobs_Populate)

// saved job
route.post('/savedJobs/post',authmiddleware,Saved_Jobs_Populate)

// applied job populate get
route.get('/appliedJob/populateGet',authmiddleware,Applied_Job_Populate_Get)

// saved jobs
route.get('/savedJob/Get',authmiddleware,Saved_Job_Get)
route.patch('/savedJob/delete/:id',authmiddleware,Saved_Job_Delete)

// update Applicant job status - recruiter
route.patch('/updateJob/status/:applicantId/:jobid',authmiddleware,recruiter_Middleware,AppliedJob_Update);

// notifications
route.get('/Recipient/Notification/Get',authmiddleware,Get_Notifications)

// notification delete
route.delete('/Notification/Delete/:id',authmiddleware,Notification_Delete)

// shedule Interview - recruiter
route.post('/Recruiter/InterviewShedule',authmiddleware,recruiter_Middleware,SheduleInterview)

// interview applicant status update - jobseeker
route.patch('/interview/applicant/result/:applicantId/:jobId',authmiddleware,Interview_applicantResult_Update)

// interview status update - recruiter
route.patch('/interviewStatus/Update/:id',authmiddleware,recruiter_Middleware,InterviewStatus_Update)

// interviews Get
route.get('/Interviews/Get',authmiddleware,Shedule_Interviews_Get)

export default route