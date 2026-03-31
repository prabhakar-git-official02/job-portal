import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
    /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/,
    "Invalid email format"
    ],
  },

    name: {
      type: String,
      trim: true,
    },

    picture: {
      type: String, 
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true, 
    },

   authProvider: {
      type: String,
      enum: ["google", "local"],
    },

    authorizedType : {
      type : String,
      enum : ["google","local"],
      default : null,
    },


password: {
  type: String,
  minlength: 6,
  required: function () {
    return this.authProvider === "local";
  },
},


  resetPasswordToken : String,
  resetPasswordExpire : Date,
  
  role: {
    type: String,
    enum: ["user", "recruiter", "admin"],
    default: "user"
  }
    }
)

const User = mongoose.model('User',userSchema,'users')

export default User
