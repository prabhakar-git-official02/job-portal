import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  recipientRole: {
    type: String,
    enum: ["recruiter", "user"],
    required: true
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  senderRole: {
    type: String,
    enum: ["admin","recruiter","user"]
  },

  type: {
    type: String,
    enum: [
      "job_applied",
      "interview_scheduled",
      "interview_cancelled",
      "application_status_updated",
      "applicant_interviewCall_status",
      "recruiter_post_status",
      "message"
    ],
    required: true
  },

  relatedJobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecruiterPost"
  },

  relatedInterviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview"
  },

  message: {
    type: String,
    required: true,
    trim: true
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema,"Notification");

export default Notification;