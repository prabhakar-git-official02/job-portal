import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Scripts/Alert';
import Cloudinary from '../../Components/Cloudinary';
import { jobseekerProfileUpdateThunk } from '../../Thunks/jobseekerProfileThunk';
import { IsImageUrlSuccess,IsImagePublicIdSuccess, IsCloudinaryFailure } from '../../Redux/cloudinarySlice';

function Dialogbox1({imgUrl,imgPublicId,nameMsg,bioMsg,aboutMsg,existingFile}){
   
    const dispatch = useDispatch()

    const ImageUrl = useSelector(state => state.cloudinary.ImageUrl)
    const ImagePublicId = useSelector(state => state.cloudinary.ImagePublicId)
    const UploadError = useSelector(state => state.cloudinary.error)

    const [visible,setVisible] = useState(false)
    const [profileImage,setProfileImage] = useState(null)
    const [profileImagePreview,setProfileImagePreview] = useState(imgUrl)
    const [fullName,setFullName] = useState(nameMsg)
    const [bio,setBio] = useState(bioMsg)
    const [about,setAbout] = useState(aboutMsg)
    const [load,setLoad] = useState(false)


   const UpdateDatas = {
    profileImage : {url : ImageUrl?ImageUrl : imgUrl ,public_id : ImagePublicId?ImagePublicId : imgPublicId},
    fullName : fullName?fullName : nameMsg,
    bio : bio?bio : bioMsg,
    about : about?about : aboutMsg
            }

useEffect(() => {
    if(UploadError){
        setLoad(false)
    }
},[UploadError])


    
   const handleSave = () => {
    if(
        fullName === "" ||
        about === "" || 
        bio === ""
    ){
        return showAlert("Error","Invalid Form Update")
    }

    setLoad(true)
   }

   const handleSubmit = async() => {
        if(
        fullName === "" ||
        about === "" || 
        bio === ""
    ){
        return showAlert("Error","Invalid Form Update")
    }
    dispatch(jobseekerProfileUpdateThunk(UpdateDatas))
    setLoad(false)
    setProfileImage(null)
    dispatch(IsImageUrlSuccess(null))
    dispatch(IsImagePublicIdSuccess(null))
    dispatch(IsCloudinaryFailure(null))
    setVisible(false)
   }
return(
    <>
    <span label="Show" icon={`pi pi-external-link`} onClick={() => setVisible(true)}><span>{`Edit`}</span><FontAwesomeIcon className='mx-1' icon={faPenToSquare}></FontAwesomeIcon></span>
<Dialog 
 header={nameMsg} 
 visible={visible } 
   breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
 style={{ width: '50vw' }}
  onHide={() => {if (!visible)
   return;
    setVisible(false);
    setLoad(false);
    setProfileImage(null);
    dispatch(IsImageUrlSuccess(null));
    dispatch(IsImagePublicIdSuccess(null))}}>
    <form>
        {load && profileImage ? 
<Cloudinary
  file={profileImage}
  fileType="image"
  model="jobseekerProfile"
  id={existingFile?._id}          
  field="image"
  existingFile={existingFile?.profileImage}
/>
 : null}
                <img

                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : imgUrl
                  }
                  alt="Preview"
                  className="image-preview"
                  style={{width : `200px`,borderRadius : '50%'}}
                />
                {load && profileImage && !ImageUrl?<p className='mt-3'>Profile Uploading...</p> : null}
                <br />
       
           {!load && !ImageUrl ?
           <>
                <label
                  className="upload-btn mt-3"
                  htmlFor="profileUpload"
                  style={{
                    fontSize: `12pt`,
                    borderRadius: `100%`,
                  }}
                >
                  <span>Change profile</span><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>

                </label> 
                <br/>

                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProfileImage(file);
                    setProfileImagePreview(URL.createObjectURL(file));
                  }}
                  
                  />
                  </>:null
                }
    <br/>
    <input 
    className='form-control'
    onChange={(e) => setFullName(e.target.value)}
    placeholder='Enter your Name'
    type='text'
    value={fullName}
    />
    <br/>
    <input
     className='form-control'
     onChange={(e) => setBio(e.target.value)}
     type='text'
     placeholder='Enter your Bio'
     value={bio}
     />
    <br/>
    <textarea 
    className='form-control'
    onChange={(e) => setAbout(e.target.value)}
    type="text"
    placeholder='Enter About here...'
    value={about}
    />
    </form>
    <br/>
    <div>
    {!load && !ImageUrl ?

    <button className='btn btn-outline-dark' onClick={handleSave}>Save</button>
   :
   <div className='d-flex'>
    <span className='flex-grow-1'></span>
    <button className={`btn btn-outline-success ${!ImageUrl && profileImage?"disabled" : null}`} onClick={handleSubmit}>Submit</button>
    </div>
}
</div>
</Dialog>

    </>
)
}

export default Dialogbox1