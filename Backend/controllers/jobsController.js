import mongoose from "mongoose";
import RecruiterPost from "../models/RecruiterPostShema.js";
import Recruiter from "../models/RecruiterProfileShema.js";
import Jobseeker from "../models/JobSeekerProfileSchema.js";
import Applicant from "../models/ApplicantShema.js";
import AppliedJob from "../models/AppliedJobs.js";
import SavedJob from "../models/SavedJobs.js";
import Interview from "../models/InterviewSchema.js";
import Notification from "../models/NotificationSchema.js";
                                              // Recruiter Post

// Recruiter creates a new Post
export const recruiter_Post_Post = async (req, res) => {
  try { 
    
    const existing = await Recruiter.findOne({recruiterId : req.userId})

    if(!existing){
      return res.status(404).json({msg : 'Profile not Found'})
    }

    const allowedFields = [
      "profileImage",
      "jobTitle",
      "jobLocation",
      "jobType",
      "jobPlatform",
      "companyName",
      "experience",
      "salary",
      "skills",
      "jobDescription",
      "postId"
    ];

    const jobData = {};
    let isValid = false
    allowedFields.forEach(field => {
      
      if (req.body[field] !== undefined){
        jobData[field] = req.body[field];
        isValid = true
      }
    });

    if(!isValid){
      return res.status(409).json({msg : 'Invalid!'})
    }

   
     const job = await RecruiterPost.create({
      recruiterId: req.userId,
      ...jobData
    });

    res.json({ 
      msg: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Recruiter update post
export const recruiter_Post_Update = async (req, res) => {
  try {
    const existing = await Recruiter.findOne({recruiterId : req.userId})

    if(!existing){
      return res.status(404).json({msg : 'Profile not Found'})
    }
    const { jobId } = req.params;
    const allowedFields = [
      "profileImage",
      "jobTitle",
      "jobLocation",
      "jobType",
      "jobPlatform",
      "experience",
      "salary",
      "skills",
      "companyName",
      "jobDescription",
    ];

    const updateData = {};
    let isValid = false
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined){
        updateData[field] = req.body[field];
        isValid = true
      }
    });

    if(!isValid){
      return res.status(409).json({msg : 'Invalid!'})
    }

    const job = await RecruiterPost.findOneAndUpdate(
      { _id: jobId,recruiterId: req.userId },
      { $set: updateData },
      { new: true }
    );

    if (!job) return res.status(404).json({ msg: "Job not found " });

    res.json({ msg: "Job updated successfully", job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Posted Job skills add
export const PostedJob_Skills_Add = async(req,res) => {
  try{
  const {skill} = req.body

  const { jobId } = req.params;

if(!skill){
  return res.json({msg : 'Skill not found'})
}

const ExistUser = await RecruiterPost.findOne({recruiterId : req.userId})

if(!ExistUser){
  return res.status(404).json({msg : 'User not found!'})
}
await RecruiterPost.findOneAndUpdate(
  { _id: jobId,recruiterId: req.userId },
  {$addToSet : {skills : skill}},
  {new:true}
)

res.json({msg : 'Skill Added Successfully'})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}


// Posts skill delete
export const delete_Posted_Job_Skill = async (req, res) => {
  try {
    const { skill } = req.body;

    const {jobId} = req.params

    if (!skill) {
      return res.status(400).json({ msg: "Skill is required" });
    }

    const updatedProfile = await RecruiterPost.findOneAndUpdate(
      {_id : jobId,recruiterId: req.userId },
      {
        $pull: { skills: skill }  
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json({
      msg: "Skill deleted successfully",
      skills: updatedProfile.skills
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Recruiter Get all post
export const recruiter_Post_Get = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({recruiterId:req.userId})
    if(!recruiter){
      return res.status(404).json({msg : 'Profile not Found'})
    }
     const posts = await RecruiterPost.find({recruiterId : req.userId})
     if(posts.length === 0){
      return res.status(404).json({msg:'No posts posted!'})
     }
     res.json({
      msg : 'Recruiter Posts fetched Successfully',
      data : posts
     })
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


                                                        // Jobseeker
// Jobseeker Apply
export const jobseeker_AppliedJob_Post = async (req, res) => {
  try {

    const {userData} = req.body
    const existing = await Jobseeker.findOne({jobseekerId : req.userId})

    if(!existing){
      return res.status(404).json({msg : 'Profile not Found'})
    }

    const { jobId } = req.params;

    if (!jobId){ 
      return res.status(400).json({ msg: "Job ID required" });
    }

    const job = await RecruiterPost.findById(jobId);
    if (!job){
      return res.status(404).json({ msg: "Job not found" });
    } 

    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "location",
      "qualification",
      "skills",
      "experience",
      "resume",
      "expectedSalary",
      "preferredLocation"
    ];

    const userdata = {};
    let isValid = false

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined){
        userdata[field] = req.body[field];
        isValid = true
      }
    });

    if(!isValid){
      return res.status(400).json({msg : 'Invalid!'})
    }

    
    
    const jobExist = await Applicant.findOne({ //already applied ?
      jobseekerId: req.userId,
      appliedJobs : {$elemMatch : {jobId:job._id}}
    });

    if(jobExist){
      return res.status(409).json({msg : 'Already applied for this job!'})
    }

await Applicant.findOneAndUpdate(
    { jobseekerId: req.userId },
    {
      $setOnInsert: { 
        jobseekerId: req.userId,
         ...userdata 
        },

      $addToSet: { 
        appliedJobs: {
         jobId: job._id,
         jobseekerId: req.userId,
         userDatas : userdata,
          appliedAt: new Date(), 
          status: "applied",
        } 
      }
    },
    { upsert: true, new: true }
);

    const applicant = await Applicant.findOne({ jobseekerId: req.userId }).populate({
      path: "appliedJobs.jobId",
      populate: { path: "recruiterId", select: "name email" }
    });


  try {
await Notification.create({
    recipientId: job.recruiterId,
    recipientRole: "recruiter",
    senderId: req.userId,
    senderRole: "user",
    type: "job_applied",
    relatedJobId: job._id,
    message: "Candidate applied for your job."
});
  } catch (err) {
    console.error("Notification Error:", err.message);
  }
  
  
    res.json(
      {
         msg: "Applied successfully", 
         data : true,
        appliedJobs: applicant.appliedJobs
       });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};





// Get Applicants
export const jobseeker_AppliedJob_Get = async (req, res) => {
  try {
    const jobseeker = await Jobseeker.findOne({jobseekerId:req.userId})

    if(!jobseeker){
      return res.status(404).json({msg : 'Profile not found'})
    }

    const applicant = await Applicant.findOne({ jobseekerId: req.userId }).populate({
      path: "appliedJobs.jobId",
      populate: { path: "recruiterId", select: "name email" }
    });

    if (!applicant || applicant.appliedJobs.length === 0){
      return res.status(404).json({ msg: "No applied jobs found" });
    }
    res.json({
      msg : 'Applied Jobs Recieved Successfully',
      datas : {
         data : applicant,
         populateData : applicant.appliedJobs
      }
  });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Job Post Check
export const Job_Post_Check = async(req,res) => {
  try{
    const {postId} = req.body
  const recruiterExist = await Recruiter.findOne({recruiterId : req.userId})

  if(!recruiterExist){
    return res.json({msg : 'Recruiter not Found'})
  }

  const postCheck = await RecruiterPost.findOne({postId})

  if(postCheck){
    return res.status(409).json({
      msg : "Post Already Exist!",
    })
  }


  res.json({
    msg : 'Post Not Exist',
    hasNoPost : true
  })

} catch(err){
  res.json({msg : err.message})
}
}


// Recruiter check
export const Recruiter_Check = async(req,res) => {
  try{
  const recruiterExist = await Recruiter.findOne({recruiterId : req.userId})
  if(!recruiterExist){
    return res.status(404).json({msg : 'Recruiter not Found'})
  }
  res.json({
    msg : 'Recruiter Found',
    hasRecruiter : true
  })
} catch(err){
  res.status(500).json({msg : err.message})
}
}


// Posted job get
export const Posts_Get = async(req,res) => {
    try{
        const posts = await RecruiterPost.find()
        if(posts.length === 0){
            return res.status(404).json({msg : 'Posts Not Available'})
        }
        res.json({
          msg : 'Posts Get Successfully',
          data : posts
        })
    } catch(err){
        res.status(500).json({msg : err.message})
    }
}


// jobseeker Check
export const Jobseeker_Check = async(req,res) => {
 
  try{
 
  const ExistJobseeker = await Applicant.findOne({jobseekerId : req.userId})
 
  if(ExistJobseeker){
    return res.status(200).json({
      msg : 'Applicant Exist',
      hasApplicant:true
    })
  }

  res.status(200).json({
    msg : 'Applicant not exist',
    hasApplicant : false
  })

} catch(err){
  res.status(500).json({msg : err.message})
}}


// All Applicants get
export const Applicants = async(req,res) => {
      try{

      const applicant = await Applicant.find().populate({
      path: "appliedJobs.jobId",
      populate: { path: "recruiterId", select: "name email" }
    });

        if(applicant.length === 0){
            return res.status(404).json({msg : 'Applicant Not Available'})
        }
    res.json({
      msg : 'Applicants Recieved Successfully',
      data : {
         data : applicant,
         populateData : applicant.appliedJobs
      }
  });
    } catch(err){
        res.status(500).json({msg : err.message || "Something went wrong"})
    }
}


export const Applied_Jobs_Populate = async (req, res) => {
  try {
    const allowedFields = [
      "jobId",
      "appliedAt",
      "companyName",
      "jobLocation",
      "jobTitle",
      "recruiterEmail",
      "status"
    ];

    const Jobs = {};
    let isValid = false;

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        Jobs[field] = req.body[field];
        isValid = true;
      }
    });

    if (!isValid) {
      return res.status(400).json({ msg: "Invalid populate data" });
    }

    const ExistUser = await AppliedJob.findOne({jobseekerId: req.userId});

   
    if (ExistUser) {
      const existsPopulate = ExistUser.appliedList.some((e) =>
          e.companyName === Jobs.companyName &&
          e.jobTitle === Jobs.jobTitle  
      );

      if (existsPopulate) {
        return res.status(409).json({ msg: "Already populated" });
      }

      ExistUser.appliedList.push(Jobs);
      await ExistUser.save();
    
      return res.json({ msg: "Populate data pushed" });
    }


   
    await AppliedJob.create({
      jobseekerId: req.userId,
      appliedList: [Jobs]
    });

    res.status(201).json({ msg: "Populate data created" });

  } catch(err) {
    res.status(500).json({ msg: err.message || "Something went wrong"});
  }
};


// Applied job populate get
export const Applied_Job_Populate_Get = async(req,res) => {
  try{
  const ExistUser = await AppliedJob.findOne({jobseekerId : req.userId})

  if(!ExistUser){
    return res.status(404).json({msg : 'Jobseeker not found'})
  }

 res.status(200).json({
  msg : 'Applied Jobs Populate Recieved Successfully',
  data : ExistUser
 })

} catch(err){
  res.status(500).json({msg : err.message || "Something went wrong"})
}
}

// Saved Jobs Post
export const Saved_Jobs_Populate = async(req,res) => {
   try {
    const allowedFields = [
      "jobId",
      "profileImage",
      "recruiterId",
      "postId",
      "jobTitle",
      "jobPlatform",
      "companyName",
      "jobLocation",
      "jobType",
      "experience",
      "salary",
      "skills",
      "jobDescription",
      "updatedAt"
    ];

    const Jobs = {};
    let isValid = false;

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        Jobs[field] = req.body[field];
        isValid = true;
      }
    });

    if (!isValid) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    const ExistUser = await SavedJob.findOne({jobseekerId: req.userId});

   
    if (ExistUser) {
      const existSaved = ExistUser.SavedList.some((e) =>
          e.jobId.toString() === Jobs.jobId.toString() 
      );

      if (existSaved) {
        return res.status(409).json({ msg: "Job Already Saved" });
      }

      ExistUser.SavedList.push(Jobs);
      await ExistUser.save();

      return res.status(200).json({ msg: "Job Saved Successfully" });
    }

   
    await SavedJob.create({
      jobseekerId: req.userId,
      SavedList: [Jobs]
    });

    res.status(201).json({ msg: "Job Saved Successfully" });

  } catch(err) {
    res.status(500).json({ msg: err.message})
  }
}


// Get saved Job
export const Saved_Job_Get = async(req,res) => {
  try{
  const ExistUser = await SavedJob.findOne({jobseekerId : req.userId})

  if(!ExistUser){
    return res.status(404).json({msg : 'No Jobs Found'})
  }

 res.status(200).json({
  msg : 'Saved Jobs fetched Successfully',
  data : ExistUser
 })

} catch(err){
  res.status(500).json({msg : err.message || "Something went wrong"})
}
}


// delete saved Job
export const Saved_Job_Delete = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await SavedJob.findOneAndUpdate(
      { 
        jobseekerId: req.userId,
      },
      {
        $pull: {
          SavedList: { jobId: id },
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Jobseeker not found" });
    }

    res.json({ msg: "Saved Job Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Applied Job status Update - for Recruiter

export const AppliedJob_Update = async(req,res) => {
try{
    const {applicantId,jobid} = req.params
    const jobObjectId = new mongoose.Types.ObjectId(jobid);

    const {email} = req.body
    const {status} = req.body
     

    const existing = await Applicant.findOne({
        email,
        appliedJobs:{$elemMatch:{jobId : jobObjectId}}
     })
     
     if(!existing){
        return res.status(404).json({msg : 'Applicant and Job not available'})
     }

      await Applicant.findOneAndUpdate(
        {
        email,
        appliedJobs:{$elemMatch:{jobId : jobObjectId}}
        },
        {
            $set : {"appliedJobs.$.status" : status}
        },
        {new : true}
    )

  try {
     await Notification.create({
    recipientId: applicantId,
    recipientRole: "user",
    senderId: req.userId,
    senderRole: "recruiter",
    type: "application_status_updated",
    relatedJobId: jobid,
    message: `your applied job can be ${status}`
});
  } catch (err) {
    console.error("Notification Error:", err.message);
  }

     return res.json({msg : 'Updated Successfully'})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}


// shedule interview Post
export const SheduleInterview = async (req, res) => {
  try {

    const {
      applicantId,
      jobId,
      jobDetails,
      applicantEmail,
      interviewDateAndTime,
      interviewLocation,
      interviewMessage,
      interviewStatus
    } = req.body;

    if (
      !applicantId ||
      !jobId ||
      !jobDetails ||
      !applicantEmail ||
      !interviewDateAndTime ||
      !interviewLocation ||
      !interviewMessage
    ) {
      return res.status(400).json({
        msg: "All required fields are mandatory"
      });
    }

    const AlreadyExist = await Interview.findOne({
      applicantId,
      jobId
    });

    if (AlreadyExist) {
      return res.status(409).json({
        msg: "Interview Call Already Exist for this job!"
      });
    }

    const recruiterExist = await Recruiter.findOne({
      recruiterId: req.userId
    });

    if (!recruiterExist) {
      return res.status(404).json({
        msg: "Recruiter not found!"
      });
    }

    const interviewCall = await Interview.create({
      recruiterId: req.userId,
      recruiterEmail: recruiterExist.email,
      recruiterPhone: recruiterExist.phone,
      companyName: recruiterExist.companyName,
      companyWebsite: recruiterExist.companyWebsite,
      companyAddress: recruiterExist.companyAddress,
      applicantId,
      jobId,
      jobDetails ,
      applicantEmail,
      interviewDateAndTime,
      interviewLocation,
      interviewMessage,
      interviewStatus
    });

    try {
    await Notification.create({
      recipientId: applicantId,
      recipientRole: "user",
      senderId: req.userId,
      senderRole: "recruiter",
      type: "interview_scheduled",
      relatedJobId: jobId,
      message: "Interview Call from Recruiter"
    });
      } catch (err) {
    console.error("Notification Error:", err.message);
  }

    return res.status(201).json({
      msg: "Interview Scheduled",
      data: interviewCall
    });

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


// Shedule Interview Get for recruiter
export const Shedule_Interviews_Get = async(req,res) => {
  try{

    const interviews = await Interview.find().sort({ createdAt: -1 });

    if (interviews.length === 0) {
      return res.status(404).json({ msg: "No interviews found" });
    }

    res.status(200).json({
      count: interviews.length,
      data: interviews
    });

    res.json({msg : 'Interview Calls Recieved',data : interviews})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}

// Notifications
export const Get_Notifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      recipientId: req.userId,
      recipientRole: req.role
    }).sort({ createdAt: -1 });

    if (notifications.length === 0) {
      return res.status(404).json({ msg: "No notifications found" });
    }

    res.status(200).json({
      count: notifications.length,
      data: notifications
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Interview Applicant Intrest  Update

export const Interview_applicantResult_Update = async(req,res) => {
  try{
    const {result,recruiterId} = req.body
    const {applicantId,jobId} = req.params

    const RecruiterId = new mongoose.Types.ObjectId(recruiterId)

    const ExistUser = await Interview.findOne({applicantId : req.userId})

    if(!ExistUser){
      return res.status(404).json({msg : 'User not found'})
    }

    await Interview.findOneAndUpdate(
      {
        applicantId : applicantId,
        jobId : jobId
      },
      {
        $set : {applicantResult : result}
      },
      {new : true}
    )

      try {
await Notification.create({
    recipientId: RecruiterId,
    recipientRole: "recruiter",
    senderId: req.userId,
    senderRole: "user",
    type: "applicant_interviewCall_status",
    relatedJobId: jobId,
    message: `Applicant ${result} your interview call`
});
  } catch (err) {
    console.error("Notification Error:", err.message);
  }

    res.json({msg : "Interview applicant result updated"})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}




// Interview Status Update
export const InterviewStatus_Update = async(req,res) => {
  try{
    const {id} = req.params
    const {result,CancelReason,applicantId,jobId} = req.body

    const ApplicantId = new mongoose.Types.ObjectId(applicantId)

    const ExistInterview = await Interview.findById(id)

    if(!ExistInterview){
      return res.status(404).json({msg : 'Interview not found'})
    }

    await Interview.findByIdAndUpdate(
      id,
      {$set : {
        interviewStatus : result,
        interviewCancelledReason : CancelReason
      }},
      {new : true}
    )

    try {
      await Notification.create({
    recipientId: ApplicantId,
    recipientRole: "user",
    senderId: req.userId,
    senderRole: "recruiter",
    type: "interview_cancelled",
    relatedJobId: jobId,
    message: `Recruiter ${result} your interview call`
});
  } catch (err) {
    return console.error("Notification Error:", err.message);
  }

   res.json({msg : 'Interview Status Updated'})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}


// Notification Delete
export const Notification_Delete = async(req,res) => {
  try{
     const {id} = req.params

     if(!id){
      return res.status(404).json({msg : 'Notification not found!'})
     }

     await Notification.findByIdAndDelete(id)
     res.json({msg : 'Notification Deleted Successfully'})
  } catch(err){
    res.status(500).json({msg : err.message})
  }


}