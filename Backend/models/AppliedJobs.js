import mongoose from "mongoose";

const AppliedJobSchema = new mongoose.Schema(
{
      jobseekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  appliedList: [
    {
      jobId : {
            type: mongoose.Schema.Types.ObjectId,
           required: true
      },
      appliedAt: Date,
      companyName: String,
      jobLocation: String,
      jobTitle: String,
      recruiterEmail: String,
      status: String
    }
  ]
});

const AppliedJob = mongoose.model("AppliedJob", AppliedJobSchema, "AppliedJob");

export default AppliedJob;
