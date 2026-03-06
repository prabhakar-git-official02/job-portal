import RecruiterPost from '../models/RecruiterPostShema.js'
import Applicant from '../models/ApplicantShema.js'
import mongoose from 'mongoose'
import Jobseeker from '../models/JobSeekerProfileSchema.js'
import Recruiter from '../models/RecruiterProfileShema.js'
import Notification from '../models/NotificationSchema.js'
import User from '../models/UsersShema.js'


// Posted job Update
export const Post_Update = async(req,res) => {
    const {id} = req.params
    try{
    const Postexist = await RecruiterPost.findById(id)

    if(!Postexist){
        return res.status(404).json({msg : 'Post Not Available'})
    }

    const allowedFields = [
      "jobTitle",
      "jobLocation",
      "jobType",
      "experience",
      "salary",
      "skills",
      "companyName",
      "jobDescription",
      "status",
      "rejectionReason"
    ]

    const updated = {}
    
    let isValid = false 

    allowedFields.forEach((field) => {
        if(req.body[field]!==undefined){
            updated[field] = req.body[field];
            isValid = true
        }
    })

    if(!isValid){
        return res.status(400).json({msg : 'Invalid'})
    }
    await RecruiterPost.findByIdAndUpdate(
        id,
        {$set : updated},
        {new : true}
    )
    res.json({
        msg : 'Post Updated',
        data : updated
    })
} catch(err){
    res.status(500).json({msg : err.message})
}
}
 

// Posted job Delete
export const  Post_Delete = async(req,res) => {
    try{
    const {id} = req.params
    const PostExist = await RecruiterPost.findById(id)
    if(!PostExist){
        return res.status(404).json({msg : 'Post not Available'})
    }
    await RecruiterPost.findByIdAndDelete(id)
    res.json({msg : 'Post Deleted'})
} catch(err){
    res.status(500).json({msg : err.message})
}}


// Posted job get
export const Post_Get = async(req,res) => {
    try{
        const posts = await RecruiterPost.find()
        if(posts.length === 0){
            return res.status(404).json({msg : 'Posts Not Available'})
        }
        res.json({
          msg : 'Post Fetched Successfully',
          data : posts
        })
    } catch(err){
        res.status(500).json({msg : err.message})
    }
}



// Get all applied jobs
export const AppliedJob_Get = async (req, res) => {
  try {
    const appliedJobs = await Applicant.find()
      .populate({
        path: "appliedJobs.jobId",
        select: "jobTitle companyName jobLocation",
        populate: { path: "recruiterId", select: "name email" }
      });

    if (!appliedJobs || appliedJobs.length === 0) {
      return res.status(404).json({ msg: "No applied jobs found" });
    }

    res.json({
      msg : 'Applied Jobs fetched Successfully',
      data : appliedJobs
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Delete  specific applied job
export const AppliedJob_Delete = async (req, res) => {
  try {
    const { applicantId, jobid } = req.params; 
    const applicant_Object_Id = new mongoose.Types.ObjectId(applicantId)
    const jobObjectId = new mongoose.Types.ObjectId(jobid);

    const applicant = await Applicant.findById(applicant_Object_Id);
    if (!applicant) {
      return res.status(404).json({ msg: "Applicant not found" });
    }

   
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      applicant_Object_Id,
      { $pull: { appliedJobs: { jobId: jobObjectId } } },
      { new: true }
    ).populate({
      path: "appliedJobs.jobId",
      select: "jobTitle companyName jobLocation",
      populate: { path: "recruiterId", select: "name email" }
    });

    if (!updatedApplicant.appliedJobs.length) {
      return res.json({ msg: "Job removed. No applied jobs left.", appliedJobs: [] });
    }

    res.json({ msg: "Applied job deleted successfully", appliedJobs: updatedApplicant.appliedJobs });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Recruiters
export const all_Recruiters_Get = async(req,res) => {
  try{
    const All_Recruiters = await User.find({role : "recruiter"})

    const All_Recruiters_Profiles = await Recruiter.find()

    if(All_Recruiters.length === 0){
      return res.status(404).json({msg : 'Recruiters Not Found'})
    }

    if(All_Recruiters_Profiles.length === 0){
      return res.status(404).json({msg : 'Recruiters Profile Not Found'})
    }
    res.json({
      msg : 'Recruiters Fetched Successfully',
      recruitersData : All_Recruiters,
      recruitersProfileData : All_Recruiters_Profiles,
    })
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}


// Get All Jobseekers
export const all_Jobseekers_Get = async(req,res) => {
    try{
    const All_Jobseekers = await Jobseeker.find()

    if(All_Jobseekers.length === 0){
      return res.status(404).json({msg : 'Jobseekers not found'})
    }
    res.json({msg : 'Jobseekers Fetched Successfully',data : All_Jobseekers})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}

// post status Update
export const Post_Status_Update = async(req,res) => {
  try{
    const {status,recruiterId} = req.body
    const {id} = req.params

    const FindPost = await RecruiterPost.findById(id)

     const RecruiterId = new mongoose.Types.ObjectId(recruiterId)

    if(!FindPost){
      return res.status(404).json({msg : 'Post Unavailable!'})
    }

    await RecruiterPost.findByIdAndUpdate(
      id,
      {$set : {status : status}}
    )

    try {
      await Notification.create({
    recipientId: RecruiterId,
    recipientRole: "recruiter",
    senderId: req.userId,
    senderRole: "admin",
    type: "recruiter_post_status",
    relatedJobId: id,
    message: `Admin ${status} your Job Post`
});
  } catch (err) {
    return console.error("Notification Error:", err.message);
  }

    res.json({msg : `Post ${status}`})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}