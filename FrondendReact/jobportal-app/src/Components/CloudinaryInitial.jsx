import { useEffect, useCallback, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { showAlert } from "../Scripts/Alert";
import {
  IsImageUrlSuccess,
  IsImagePublicIdSuccess,
  IsResumeUrlSuccess,
  IsResumePublicIdSuccess,
  IsCloudinaryFailure
} from "../Redux/cloudinarySlice";
import ErrorAlert from "./ErrorAlert";

function CloudinaryInital({file,fileType,load}){
  const [uploaded,setUploaded] = useState(false)

     const dispatch = useDispatch();

     const [AlertMsg,setAlertMsg] = useState(null)

  const isFileSizeValid = (file, fileType) => {
    if (!file) return false;
    const sizeInMB = file.size / (1024 * 1024);
    if (fileType === "image") return sizeInMB <= 5;
    if (fileType === "resume") return sizeInMB <= 10;
    return false;
  }; 


 const  handleFile = useCallback(async() => {
        if (!isFileSizeValid(file, fileType)) {
          const msg =
            fileType === "image"
              ? "Image size must be less than 5 MB" :
            fileType === "resume"? "Resume size must be less than 10 MB"
              : "file must be less than";
          showAlert("Error", msg, "error");
          return;
        }
    
        if (fileType === "resume" && file.type !== "application/pdf") {
          showAlert("Error", "Only PDF resumes allowed", "error");
          return;
        }

      const formData = new FormData();
      formData.append("file", file);

      
      try{
      const response = await api.post(
        '/file/upload-Initial',
        formData,
        {withCredentials : true}
      )
       console.log(response)
      if(response){
        if (fileType === "image") {
           
        dispatch(IsImageUrlSuccess(response?.data?.url));
        dispatch(IsImagePublicIdSuccess(response?.data?.publicId));
        dispatch(IsCloudinaryFailure(null))
        setAlertMsg(null)
      } 
      else if(fileType === "resume") {
        dispatch(IsResumeUrlSuccess(response?.data?.url));
        dispatch(IsResumePublicIdSuccess(response?.data?.publicId));
        dispatch(IsCloudinaryFailure(null))
        setAlertMsg(null)
      } else {
        dispatch(IsResumeUrlSuccess(response?.data?.url));
        dispatch(IsResumePublicIdSuccess(response?.data?.publicId));
        dispatch(IsCloudinaryFailure(null))
        setAlertMsg(null)
      }
      }
    } catch(err){
      setAlertMsg({
        msg : err.message,
        id: Date.now()
      })
      dispatch(IsCloudinaryFailure(err.message))
    }
 },[dispatch,file,fileType])


useEffect(()=>{
 if(!file || !fileType || !load) return
 if(uploaded) return

 handleFile()
 setUploaded(true)

},[file,fileType,load,uploaded,handleFile])


 return  <ErrorAlert alertMsg={AlertMsg}/> 
}

export default CloudinaryInital