import express from "express";
import upload from '../utils/multer.js'
import {uploadFile,deleteFile} from '../controllers/uploadController.js'
import { authmiddleware } from "../middleware/auth.js";

const route = express.Router();

route.post("/uploadFile",authmiddleware, upload.single("file"), uploadFile);

route.post(
  "/upload-Initial",
  authmiddleware,
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        console.log(" Multer error ", err);
        console.log("FILE:", req.file)
        return res.status(500).json({ msg: err.message });
      }
      next();
    });
  },
  (req, res) => {
    try {
      console.log(" File ", req.file);

      res.json({
        msg: "File Uploaded Successfully",
        url: req.file.path,
        publicId: req.file.filename,
      });
    } catch (err) {
      console.log(" Route error ", err);
      res.status(500).json({ msg: err.message });
    }
  }
);



route.delete("/deleteFile",authmiddleware, deleteFile);

export default route

