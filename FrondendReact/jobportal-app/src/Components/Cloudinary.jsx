import { useEffect, useCallback } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";

import {
  IsImageUrlSuccess,
  IsImagePublicIdSuccess,
  IsResumeUrlSuccess,
  IsResumePublicIdSuccess,
  IsCloudinaryFailure,
} from "../Redux/cloudinarySlice";

import { showAlert } from "../Scripts/Alert";

function Cloudinary({ file, fileType, model, id, field, existingFile }) {
  const dispatch = useDispatch();

  const isFileSizeValid = (file, fileType) => {
    if (!file) return false;
    const sizeInMB = file.size / (1024 * 1024);
    if (fileType === "image") return sizeInMB <= 5;
    if (fileType === "resume") return sizeInMB <= 10;
    return false;
  };


  const handleDelete = useCallback(async () => {
    if (!existingFile?.public_id) return;

    try {
     const response =  await api.delete("/file/deleteFile", {
        data: { publicId: existingFile?.public_id },
      });
      if(response){
        console.log("Cloudinary Delete",response?.data?.msg)
      }
    } catch (err) {
      console.log('Cloudinaru Delete Error',err?.response?.data?.msg);
      dispatch(IsCloudinaryFailure(err?.response?.data?.msg))
    }
  }, [existingFile,dispatch]);



  const handleUpload = useCallback(async () => {
    if (!file) return;

    if (!isFileSizeValid(file, fileType)) {
      const msg =
        fileType === "image"
          ? "Image size must be less than 5 MB"
          : "Resume size must be less than 10 MB";
      showAlert("Error", msg, "error");
      return;
    }

    if (fileType === "resume" && file.type !== "application/pdf") {
      showAlert("Error", "Only PDF resumes allowed", "error");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post(
        `/file/uploadFile?model=${model}&field=${field}&id=${id}`,
        formData
      );

      const uploadedFile = res.data.file;

      if (fileType === "image") {
        dispatch(IsImageUrlSuccess(uploadedFile.url));
        dispatch(IsImagePublicIdSuccess(uploadedFile.public_id));
        console.log("Success", "Image Saved successfully", "success");
      } else {
        dispatch(IsResumeUrlSuccess(uploadedFile.url));
        dispatch(IsResumePublicIdSuccess(uploadedFile.public_id));
        console.log("Success", "Resume Saved successfully", "success");
      }
    } catch (err) {
      console.error(err);

      dispatch(IsCloudinaryFailure(err.response?.data?.msg));
    }
  }, [file, fileType, model, id, field, dispatch]);

  useEffect(() => {
    if (file){
      handleDelete()
      .then(() => handleUpload())
    };
  }, [file, handleUpload,handleDelete]);

  return null; 
}

export default Cloudinary;

