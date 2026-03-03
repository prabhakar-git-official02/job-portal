import Recruiter from "../models/RecruiterProfileShema.js";
import Jobseeker from "../models/JobSeekerProfileSchema.js"
import Admin from "../models/adminProfileSchema.js";
import cloudinary from '../config/cloudinaryConfig.js'
import RecruiterPost from "../models/RecruiterPostShema.js";


export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const { model, field, id } = req.query;
    const file = req.file;

    const fileData = {
      url: file.path,
      public_id: file.filename,
      uploaded_at: new Date(),
      resource_type: file.mimetype.startsWith("image") ? "image" : "raw",
    };

    let Model;
    if (model === "adminProfile") Model = Admin;
    else if (model === "recruiterProfile") Model = Recruiter;
    else if (model === "jobseekerProfile") Model = Jobseeker; 
    else if(model === "recruiterPosts") Model = RecruiterPost
    else return res.status(400).json({ msg: "Invalid model" });


    const updateObj = {};
    updateObj[field] = fileData;

    const Exist = await Model.findById(id)

    await Model.findByIdAndUpdate(id, updateObj);

    res.json({ msg: "File uploaded", file: fileData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ msg: "No public ID provided" });
    }

    console.log("Deleting:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Cloudinary Result:", result);

    return res.status(200).json({
      msg: "File deleted successfully",
      result
    });

  } catch (err) {
    console.log("DELETE ERROR:", JSON.stringify(err, null, 2));

    return res.status(500).json({
      msg: err?.message || "Delete failed"
    });
  }
};


