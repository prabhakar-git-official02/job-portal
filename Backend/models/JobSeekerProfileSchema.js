import mongoose from "mongoose";

const jobseekerSchema = new mongoose.Schema(
  {
    jobseekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profileImage: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
      uploaded_at: {
        type: Date,
      },
      resource_type: {
        type: String,
      },
    },

    bio: {
      type: String,
    },

    about: {
      type: String,
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
        "Invalid email format",
      ],
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required : true,
    },

    age: {
      type: String,
      required : true,
    },

    location: {
      type: String,
      required : true,
    },

    state: {
      type: String,
      required : true,
    },

    country: {
      type: String,
      required : true,
    },

    skills: [
      {
        type: String,
      },
    ],

    experienceType : {
      type : String,
      enum : ["Fresher", "Experienced",null],
      default : null
    },

    experience: [
      {
        yearStart: {
          type: Date,
        },
        yearEnd: {
          type: Date,
        },
        field: {
          type: String,
        },
        company: {
          type: String,
        },
        workExperience: {
          type: String,
        },
        CTC: {
          type: String,
        },
      },
    ],


    education: [
      {
        institute: {
          type: String,
        },
        qualification: {
          type: String,
        },
        yearStart: {
          type: Date,
        },
        yearEnd: {
          type: Date,
        },
      },
    ],


  
    resume: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
      uploaded_at: {
        type: Date,
      },
      resource_type: {
        type: String,
      },
    },

    expectedSalary: {
      type: String,
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
    },

    preferredLocation: {
      type: String,
    },

    profileStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Jobseeker = mongoose.model(
  "Jobseeker",
  jobseekerSchema,
  "Jobseeker_Profile",
);

export default Jobseeker;
