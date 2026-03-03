import mongoose from 'mongoose'

const recruiterSchema = new mongoose.Schema(
     {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: false
    },

    profileImage: {
      url : {
        type : String
      },
      public_id : {
        type : String
      }
    },

    bio : {
      type : String,
    },

    about : {
      type : String,
    },


    firstName: {
      type: String,
      required: true
    },

    lastName : {
      type : String,
      required : true
    },

email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
    /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/,
    "Invalid email format"
    ],
  },

    phone: {
      type: String,
      required: true
    },

    age : {
      type : String,
      required : true
    },

    gender : {
      type : String,
      required : true
    },

    location : {
      type : String,
      required : true
    },

    state : {
      type : String,
      required : true
    },

    country : {
      type : String,
      required : true
    },

    companyName: {
      type: String,
      required: true,
    },

    companyWebsite: {
      type: String,
      required : true
    },

    companyAddress: {
      type: String,
      required : true
    },

    industry: {
      type: String,
      required : true
    },

    companySize: {
      type: String,
      required : true
    },

    designation: {
      type: String ,
      required : true
    },

    profileStatus: {
      type: String,
      enum: ["pending", "verified", "blocked"],
      default: "pending" // admin control
    },

    isActive: {
      type: Boolean,
      default: true
    },
  },
  {timestamps: true}
);

const Recruiter = mongoose.model('Recruiter',recruiterSchema,'Recruiter_Profile')

export default Recruiter

