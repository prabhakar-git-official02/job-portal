import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    jobseekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      // match: [
      // /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/,
      // "Invalid email format"
      // ],
    },

    phone: {
      type: String,
      required: true,
    },

    appliedJobs: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RecruiterPost",
          required: true,
        },

        jobseekerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        userDatas: {
          type: Object,
        },
        
        appliedAt: {
          type: Date,
          default: Date.now,
        },

        status: {
          type: String,
          enum: ["applied", "shortlisted", "rejected"],
          default: "applied",
        },
      },
    ],

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Applicant = mongoose.model("Applicant", applicantSchema, "Applicants");

export default Applicant;
