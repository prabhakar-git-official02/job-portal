// config/cloudinaryConfig.js
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000
})
console.log("CLOUD:", process.env.CLOUDINARY_CLOUD_NAME);


export default cloudinary;


