import express from 'express'

import { 
recruiter_Profile_Post,
recruiter_Profile_Update,
recruiter_Profile_Get,
recruiter_Profile_Field_Delete,


jobseeker_Profile_Post,
jobseeker_Profile_Update,
Jobseeker_Profile_Get,
jobseeker_Profile_Field_Delete,
jobseeker_Education_Field_Delete,
jobseeker_Education_Index_Delete,
jobseeker_Experience_Field_Delete,
jobseeker_Experience_Index_Delete,
deleteSingleSkill,
Jobseeker_Skills_Add,
jobseeker_Education_Field_Update,
jobseeker_Experience_Field_Update,

recruiter_Profile_Check,
admin_Profile_Check
} from '../controllers/profileController.js'


import {authmiddleware} from '../middleware/auth.js'
import {adminMiddleware} from '../middleware/adminMiddleware.js'
import {recruiter_Middleware} from '../middleware/recruiterMiddleware.js'
const route = express.Router()

// recruiter (Test-ok)
route.post('/recruiter-Profile/Post',authmiddleware,recruiter_Middleware,recruiter_Profile_Post) // recruiter profile create
route.patch('/recruiter-Profile/Update',authmiddleware,recruiter_Middleware,recruiter_Profile_Update) // recruiter profile create/update
route.get('/recruiter-Profile/Get',authmiddleware,recruiter_Middleware,recruiter_Profile_Get) // recruiter profile get
route.delete('/recruiter-Profile/Delete',authmiddleware,recruiter_Middleware,recruiter_Profile_Field_Delete) // recruiter fields profile delete


// jobseeker (Test-ok)
route.post('/jobseeker-Profile/Post',authmiddleware,jobseeker_Profile_Post) // jobseeker profile create
route.patch('/jobseeker-Profile/Update',authmiddleware,jobseeker_Profile_Update) // jobseeker profile update
route.get('/jobseeker-Profile/Get',authmiddleware,Jobseeker_Profile_Get) // jobseeker profile get
route.delete('/jobseeker-Profile/Delete',authmiddleware,jobseeker_Profile_Field_Delete) // jobseeker profile fields delete
    
// education array of Object
route.patch('/jobseeker-Profile/Update/Education/Field/:id/:eduId',authmiddleware,jobseeker_Education_Field_Update)
route.patch('/jobseeker-Profile/Delete/Education/Field',authmiddleware,jobseeker_Education_Field_Delete) 
route.delete('/jobseeker-Profile/Delete/Education/Index',authmiddleware,jobseeker_Education_Index_Delete)
  

// experience
route.patch('/jobseeker-Profile/Update/Experience/Field/:id/:expId',authmiddleware,jobseeker_Experience_Field_Update)
route.patch('/jobseeker-Profile/Delete/Experience/Field',authmiddleware,jobseeker_Experience_Field_Delete) 
route.delete('/jobseeker-Profile/Delete/Experience/Index',authmiddleware,jobseeker_Experience_Index_Delete)

 // skill field delete
 route.patch('/jobseeker-Profile/skill/delete',authmiddleware,deleteSingleSkill)
 route.patch('/jobseeker-profile/skill/Add',authmiddleware,Jobseeker_Skills_Add)

 // check profile
route.post('/recruite-Profile-Check',authmiddleware,recruiter_Middleware,recruiter_Profile_Check)
route.post('/admin-Profile-Check',authmiddleware,adminMiddleware,admin_Profile_Check)
export default route

