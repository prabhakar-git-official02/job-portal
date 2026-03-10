import mongoose, { trusted } from 'mongoose'

const recruiterPostSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    postId : {
      type : String,
      required : true,
      trim : true,
      unique : true
    },

     profileImage: {
      url : {
        type : String
      },
      public_id : {
        type : String
      }
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    jobLocation: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      required: true,
    },

    jobPlatform:{
      type : String,
      required : true
    },

    experience: {
      type: String, 
      required: true,
    },

    salary: {
      type: String, 
    },

    skills: {
      type: [String]
    },

    jobDescription: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", 
    },

    rejectionReason: {
      type: String, 
    },
  },
  { timestamps: true }
);

const RecruiterPost = mongoose.model("RecruiterPost",recruiterPostSchema,"recruiterPosts")
export default RecruiterPost