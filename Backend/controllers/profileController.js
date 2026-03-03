import Recruiter from "../models/RecruiterProfileShema.js";
import Jobseeker from "../models/JobSeekerProfileSchema.js";
import Admin from '../models/adminProfileSchema.js'
// Recruiter
// Recruiter profile Post
export const recruiter_Profile_Post = async(req,res) => {
  try{
    const existing = await Recruiter.findOne({recruiterId: req.userId})

    if(existing){
      return res.status(409).json({msg : 'Profile already exist'})
    }

    const allowedFields = [
      "profileImage",
      "firstName",
      "lastName",
      "bio",
      "about",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country",
      "companyName",
      "companyWebsite",
      "companyAddress",
      "industry",
      "companySize",
      "designation"
    ]

    const Created = {}
    let isValid = false

    allowedFields.forEach((field) => {
      if(req.body[field]!==undefined){
        Created[field] = req.body[field];
        isValid = true
      }
    })

    const {email} = req.body

    if(!isValid){
      return res.status(400).json({msg : 'No valid field selected'})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

      await Recruiter.create({
        recruiterId: req.userId,
       ...Created
    })
    res.json({
      msg : 'Profile created successfully',
      data : Created
    })
  
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}


// Recruiter Profile update
export const recruiter_Profile_Update = async (req, res) => {
  try {
    const existing = await Recruiter.findOne({ recruiterId: req.userId });

    if(!existing){
      return res.status(409).json({msg : 'profile not Found'})
    }

    const allowedFields = [
      "profileImage",
      "firstName",
      "lastName",
      "bio",
      "about",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country",
      "companyName",
      "companyWebsite",
      "companyAddress",
      "industry",
      "companySize",
      "designation"
    ]

    const updated = {};
    let isValid = false
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updated[field] = req.body[field];
        isValid = true
      }
    });

    if(!isValid){
      return res.status(400).json({msg : 'No valid field selected'})
    }
      await Recruiter.findOneAndUpdate(
        { recruiterId: req.userId },
        { $set: updated },
        {new : true}
      );
      return res.json({ msg: "Profile Updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Recruiter Profile Get 
export const recruiter_Profile_Get = async(req,res) => {
  try{
    const Recruiter_Profile_Data = await Recruiter.findOne({recruiterId : req.userId})
    if(!Recruiter_Profile_Data){
      return res.status(404).json({msg : 'Recruiter Not Found'})
    }
    res.json({
      msg : 'Recieved Successfully',
      data : Recruiter_Profile_Data,
  })
  } catch(err){
    res.status(500).json({msg : "Server Error!"})
  }
}


// Recruiter Profile field delete
export const recruiter_Profile_Field_Delete = async (req, res) => {
  try {
    const existing = await Recruiter.findOne({ recruiterId: req.userId });
    if (!existing) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    const allowedFields = [
      "profileImage",
      "firstName",
      "lastName",
      "bio",
      "about",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country",
      "companyName",
      "companyWebsite",
      "companyAddress",
      "industry",
      "companySize",
      "designation"
    ]

    const deleted = {};
    let isValid = false;

    allowedField.forEach((field) => {
      if (req.body[field] === true) {
        deleted[field] = 1;  
        isValid = true;
      }
    });

    if (!isValid) {
      return res.status(409).json({ msg: "No valid field selected" });
    }

    await Recruiter.findOneAndUpdate(
      { recruiterId: req.userId },
      { $unset: deleted }
    );

    res.json({ msg: "Recruiter field deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Jobseeker
// Jobseeker Profile Post
export const jobseeker_Profile_Post = async(req,res) => {
  try{
   const {email} = req.body
    const existing = await Jobseeker.findOne({jobseekerId: req.userId})

    if(existing){
      return res.status(409).json({msg : 'Profile already exist'})
    }

    const allowedFields = [
      "profileImage",
      "bio",
      "about",
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country",
      "skills",
      "expectedSalary",
      "jobType",
      "experience",
      "education",
      "resume"
    ]

    const Created = {}
    let isValid = false

    allowedFields.forEach((field) => {
      if(req.body[field]!==undefined){
        Created[field] = req.body[field];
        isValid = true
      }
    })

    if(!isValid){
      return res.status(400).json({msg : 'No valid field selected'})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

      await Jobseeker.create({
       jobseekerId: req.userId,
       ...Created
    })
    res.json({
      msg : 'Profile created successfully',
      data : Created
    })
  
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}

// Jobseeker Profile Update
export const jobseeker_Profile_Update = async(req, res) => {
  try {
    const existing = await Jobseeker.findOne({ jobseekerId: req.userId });
    if(!existing){
      return res.status(409).json({msg : 'profile not Found'})
    }

    const allowedFields = [
      "profileImage",
      "bio",
      "about",
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country",
      "skills",
      "expectedSalary",
      "jobType",
      "experience",
      "education",
      "resume",
      "experienceType"
    ];

    let isValid = false
    const updated = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updated[field] = req.body[field];
        isValid = true
      }
    });

    if(!isValid){
      return res.status(400).json({msg : 'No valid field selected'})
    }
      await Jobseeker.findOneAndUpdate(
        { jobseekerId: req.userId },
        { $set: updated },
        {new : true}
      );
      return res.json({
         msg: "Jobseeker Profile Updated" ,
         data : updated
        });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Jobseeker Profile Get  
export const Jobseeker_Profile_Get = async(req,res) => {
  try{
    const JobSeeker_Profile_Data = await Jobseeker.findOne({jobseekerId : req.userId})
    if(!JobSeeker_Profile_Data){
      return res.status(404).json({msg : 'Profile Not Found'})
    }
    res.json({
      msg : 'Jobseeker profile successfully recieved',
      data : JobSeeker_Profile_Data
    })
  } catch(err){
    res.status(500).json({msg : "Server Error"})
  }
}


// jobseeker profile field delete
export const jobseeker_Profile_Field_Delete = async (req, res) => {
  try {
    const existing = await Jobseeker.findOne({ jobseekerId: req.userId });
    if (!existing) {
      return res.status(409).json({ msg: "Profile not found" });
    }

    const allowedField = [
      "profileUrl",
      "firstName",
      "lastName",
      "location",
      "phone",
      "skills",
      "education",
      "experience",
      "qualification",
      "resumeUrl",
      "expectedSalary",
      "jobType",  
      "preferredLocation",
      "bio",
      "about"
    ];

    const deleted = {};
    let isValid = false;

    allowedField.forEach((field) => {
      if (req.body[field] === true) {
        deleted[field] = 1;   
        isValid = true;
      }
    });

    if (!isValid) {
      return res.status(400).json({ msg: "No valid field selected" });
    }

    await Jobseeker.findOneAndUpdate(
      { jobseekerId: req.userId },
      { $unset: deleted }
    );

   return res.json({ msg: "Jobseeker fields deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Education Field
export const jobseeker_Education_Field_Delete = async (req, res) => {
  try {
    const { index, fieldName } = req.body;

    const allowedFields = [
      "institute",
      "qualification",
      "yearStart",
      "yearEnd"
    ];

    if (
      index === undefined ||
      !allowedFields.includes(fieldName)
    ) {
      return res.status(400).json({ msg: "No valid field selected" });
    }

    const profile = await Jobseeker.findOne({ jobseekerId: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    profile.education[index][fieldName] = "";
    await profile.save();

    res.json({ msg: "Education field deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Education Index
export const jobseeker_Education_Index_Delete = async (req, res) => {
  try {
    const { index } = req.body;

    if (index === undefined) {
      return res.status(400).json({ msg: "Index required" });
    }

    const profile = await Jobseeker.findOne({ jobseekerId: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    if (!profile.education || !profile.education[index]) {
      return res.status(400).json({ msg: "Invalid index" });
    }

    
    profile.education.splice(index, 1);

    await profile.save();

    res.json({ msg: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Experience Index delete
export const jobseeker_Experience_Index_Delete = async (req, res) => {
  try {
    const { index } = req.body;

    if (index === undefined) {
      return res.status(400).json({ msg: "Index required" });
    }

    const profile = await Jobseeker.findOne({ jobseekerId: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    if (!profile.experience || !profile.experience[index]) {
      return res.status(400).json({ msg: "Invalid index" });
    }

    
    profile.experience.splice(index, 1);

    await profile.save();

    res.json({ msg: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// Experience Field
export const jobseeker_Experience_Field_Delete = async (req, res) => {
  try {
    const { index, fieldName } = req.body;

    const allowedFields = [
      "yearStart",
      "yearEnd",
      "field",
      "company",
      "workExperience"
    ];

    if (
      index === undefined ||
      !allowedFields.includes(fieldName)
    ) {
      return res.status(400).json({ msg: "No valid field selected" });
    }

    const profile = await Jobseeker.findOne({ jobseekerId: req.userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    profile.experience[index][fieldName] = null;
    await profile.save();

    res.json({ msg: "Education field deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


//  skill field delete
export const deleteSingleSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({ msg: "Skill is required" });
    }

    const updatedProfile = await Jobseeker.findOneAndUpdate(
      { jobseekerId: req.userId },
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




// recruiter profile check
export const recruiter_Profile_Check = async(req,res) => {
  try{
  const recruiterExist = await Recruiter.findOne({recruiterId : req.userId})

  if(!recruiterExist){
    return res.status(200).json({
      msg : 'Recruiter profile not found',
      hasProfile : false
    })
  }
  res.status(200).json({
    msg : 'Recruiter Profile Defined',
    hasProfile : true
  })
} catch(err){
  res.status(500).json({msg : err.message})
}
}



// Admin role check
export const admin_Profile_Check = async(req,res) => {
  try{
  const adminExist = await Admin.findOne({adminId: req.userId})

  if(!adminExist){
    return res.status(200).json({
      msg : 'Admin profile not found',
      hasProfile : false
    })
  }
  res.status(200).json({
    msg : 'Admin Profile Defined',
    hasProfile : true
  })
} catch(err){
  res.status(500).json({msg : err.message})
}
}

// skills add
export const Jobseeker_Skills_Add = async(req,res) => {
  try{
  const {skill} = req.body

if(!skill){
  return res.json({msg : 'Skill not found'})
}

const ExistUser = await Jobseeker.findOne({jobseekerId : req.userId})

if(!ExistUser){
  return res.status(404).json({msg : 'User not found!'})
}
await Jobseeker.findOneAndUpdate(
  {jobseekerId : req.userId},
  {$addToSet : {skills : skill}},
  {new:true}
)

res.json({msg : 'Skill Added Successfully'})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}


export const jobseeker_Education_Field_Update = async(req,res) => {
  try {

    const UpdatedData = req.body;   
    const { id, eduId } = req.params;

    const ExistUser = await Jobseeker.findOne({jobseekerId : req.userId})

    if(!ExistUser){
      return res.status(404).json({msg : 'User not found!'})
    }

    if(!UpdatedData){
      return res.status(400).json({msg:"No updated data"});
    }

    let updateFields = {};

    Object.keys(UpdatedData).forEach(key => {
      updateFields[`education.$.${key}`] = UpdatedData[key];
    });

    const result = await Jobseeker.updateOne(
      { _id: id, "education._id": eduId },
      { $set: updateFields }
    );

    console.log(result);

    res.json({ msg : "Education Updated" });

  } catch(err){
    res.status(500).json({ msg : err.message });
  }
}

export const jobseeker_Experience_Field_Update = async(req,res) => {
  try{
    const UpdatedData = req.body
    const {id} = req.params
    const {expId} = req.params
    console.log(UpdatedData)
    console.log(id);
    console.log(expId);
    
    
    const ExistUser = await Jobseeker.findOne({jobseekerId : req.userId})

    if(!ExistUser){
      return res.status(404).json({msg : 'User not found!'})
    }

    if(!UpdatedData){
      return res.status(400).json({msg:"No updated data"});
    }

    const updateFields = {}

    Object.keys(UpdatedData).forEach((key) => {
      updateFields[`experience.$.${key}`] = UpdatedData[key] 
    })

    const result = await Jobseeker.updateOne(
      {_id : id,"experience._id" : expId},
      {$set : updateFields}
    )

    res.json({msg : 'Experiece Field Updated',data : result})
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}

