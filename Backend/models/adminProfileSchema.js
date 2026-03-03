import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    adminId: {
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

    
    bio : {
      type : String
    },

    about : {
      type : String
    },

    firstName: {
      type: String,
      required: true,
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
      required : true
    },
    gender : {
      type : String,
      required : true
    },
    age : {
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
    
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin"
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active"
    },

    permissions: {
      manageUsers: { type: Boolean, default: true },
      manageRecruiters: { type: Boolean, default: true },
      manageJobs: { type: Boolean, default: true },
      dashboardAccess: { type: Boolean, default: true }
    },

    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model('AdminProfile',adminProfileSchema,'Admin_profile')

export default Admin