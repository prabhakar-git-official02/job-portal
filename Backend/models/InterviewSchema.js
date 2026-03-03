import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecruiterPost",
        required: true
    },

    jobDetails : {
        type : Object,
        required : true,
    },

    recruiterEmail: {
        type: String,
        required: true,
        trim: true
    },

    recruiterPhone: {
        type: String,
        required: true,
        trim: true
    },

    companyName: {
        type: String,
        required: true,
        trim: true
    },

    companyWebsite: {
        type: String,
        required: true,
        trim: true
    },

    companyAddress: {
        type: String,
        required: true,
        trim: true
    },

    applicantEmail: {
        type: String,
        required: true,
        trim: true
    },

    interviewDateAndTime: {
        type: Date,
        required: true
    },

    interviewLocation: {
        type: String,
        required: true,
        trim: true
    },

    interviewMessage: {
        type: String,
        required: true,
        trim: true
    },

    interviewStatus: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    },

    interviewCancelledReason : {
        type : String,
        default : null
    },

    applicantResult : {
        type : String,
        enum: ["accepted", "rejected ", "pending"],
        default : "pending"
    }

}, { timestamps: true });

const Interview = mongoose.model("Interview", InterviewSchema);

export default Interview;
