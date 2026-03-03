import mongoose from "mongoose";

const LoginActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userRole: {
    type: String,
    required: true
  },

  loginHistory: [
    {
      type: Date,
      default: Date.now
    }
  ]

}, {
  timestamps: true
});

const LoginActivity = mongoose.model(
  "LoginActivity",
  LoginActivitySchema,
  "login_activity"
);

export default LoginActivity;

