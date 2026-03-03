import mongoose from "mongoose";

const SavedJobSchema = new mongoose.Schema(
{
      jobseekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  SavedList: [
    {
      jobId : {
            type: mongoose.Schema.Types.ObjectId,
           required: true
      },
       recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
          },
              profileImage: {
      url : {
        type : String
      },
      public_id : {
        type : String
      }
    },
      
          postId : {
            type : String,
            required : true,
            trim : true,
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
          jobPlatform: {
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
            type: [String], 
            required: true,
          },
      
          jobDescription: {
            type: String,
            required: true,
          },
          updatedAt : {
            type : String,
            required : true
          }
    }
  ]
});

const SavedJob = mongoose.model("SavedJob", SavedJobSchema, "SavedJob");

export default SavedJob;