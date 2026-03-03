import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {

    if (file.mimetype.startsWith("image/")) {
      return {
        folder: "profile_images",
        allowed_formats: ["jpg", "png", "jpeg"],
      };
    }

    if (file.mimetype === "application/pdf") {
      return {
        folder: "resumes",
        resource_type: "raw",
        allowed_formats: ["pdf"],
      };
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images & PDF allowed"));
    }
  },
});

export default upload;

