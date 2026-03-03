import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ErrorAlert from "../../Components/ErrorAlert";
import ImageAvatar from "../../Components/ImageAvatar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { allPostsThunk } from "../../Thunks/allPostsThunk";
import { IsImageUrlSuccess,IsImagePublicIdSuccess,IsCloudinaryFailure } from "../../Redux/cloudinarySlice";
import Cloudinary from "../../Components/Cloudinary";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { recruiterPostsThunk,recruiterPostSkillAddThunk,recruiterPostSkillDeleteThunk, recruiterPostUpdateThunk } from "../../Thunks/recruiterPostsThunk";
import ProgressLoad from "../../Components/ProgressLoad";
import { showAlert } from "../../Scripts/Alert";
import ButtonUI from "../../Components/ButttonUI";

function DialogboxRecruiterPost({postId}){
    
       const dispatch = useDispatch()
    
             useEffect(() => {
                dispatch(recruiterPostsThunk())
            },[dispatch])
    
         const Posts = useSelector((state) => state.recruiterPosts.Posts)

         const Post = Posts?.find((post) => post._id === postId)

         console.log(Post)

         const ImageUrl = useSelector((state) => state.cloudinary.ImageUrl);
         const ImagePublicId = useSelector((state) => state.cloudinary.ImagePublicId);     
         const UploadError = useSelector((state) => state.cloudinary.error);

         const [profileImage, setProfileImage] = useState(null);
         const [profileImagePreview, setProfileImagePreview] = useState(
         Post?.profileImage?.url,
         );
         const [visible, setVisible] = useState(false)
         const [AlertMsg, setAlertMsg] = useState(null)
         const [company, setCompany] = useState(Post?.companyName)
         const [location,setLocation] = useState(Post?.jobLocation)
         const [jobType,setJobType] = useState(Post?.jobType)
         const [jobPlatform,setJobPlatform] = useState(Post?.jobPlatform)
         const [experience,setExperience] = useState(Post?.experience)
         const [AddSkill,setAddSkill] = useState("")
         const [salary,setSalary] = useState(Post?.salary)
         const [jobDescription,setJobDescription] = useState(Post?.jobDescription)
         const [load, setLoad] = useState(false);
         const [savebtnError, setSavebtnError] = useState(null);
         const [submitbtnError, setSubmitbtnError] = useState(null);

         const UpdateDatas = {
         profileImage: {
         url: ImageUrl ? ImageUrl :  Post?.profileImage?.url,
         public_id:  ImagePublicId ? ImagePublicId :  Post?.profileImage?.public_id,
         },
         companyName: company ? company : Post?.companyName,
         location : location ? location : Post?.jobLocation,
         jobType : jobType ? jobType : Post?.jobType,
         jobPlatform : jobPlatform ? jobPlatform : Post?.jobPlatform,
         experience : experience ? experience : Post?.experience,
         salary : salary? salary : Post?.salary,
         jobDescription : jobDescription?jobDescription : Post?.jobDescription
         };


    useEffect(() => {
    if (UploadError) {
      setLoad(false);
    }
  }, [UploadError]);

    // handle skill add
     const handleSkillAdd = () => {
      if(AddSkill.trim() ===""){
          return setAlertMsg({
              msg : 'Invalid Skill Add!',
              id: Date.now()
          })
      }
      dispatch(recruiterPostSkillAddThunk(Post?._id,AddSkill))
      setAlertMsg(null)
      setAddSkill("")
     }
  
     // handle skill delete
       const handleSkillDelete = (caughtJobId,caughtSkill) => {
        dispatch(recruiterPostSkillDeleteThunk(caughtJobId,caughtSkill))
       }


  const Nums = [];

  for (let i = 1; i < 50; i++) {
    Nums.push(i);
  }



       const handleSave = () => {
           if (
            company.trim() === "" || !company ||
            location.trim() === "" || !location ||
            jobType.trim() === "" || !jobType ||
            jobPlatform.trim() === "" || !jobPlatform ||
            experience.trim() === "" || !experience ||
            salary.trim() === "" || !salary ||
            jobDescription.trim() === "" || !jobDescription
           ) {
             setLoad(false);
             setSavebtnError({
               msg: "Invalid Form Update!",
               id: Date.now(),
             });
             return;
           }     
           setLoad(true);
         };

          const handleSubmit = async () => {
              dispatch(recruiterPostUpdateThunk(Post?._id,UpdateDatas))
             .then(() => {showAlert("Success", "Profile Updated", "success")})
             .then(() => {setLoad(false)})
             .then(() => {setAlertMsg(null)})
             .then(() => {setSavebtnError(null)})
             .then(() => {setSubmitbtnError(null)})
             .then(() => {setProfileImage(null)})
             .then(() => {dispatch(IsImageUrlSuccess(null))})
             .then(() => {dispatch(IsImagePublicIdSuccess(null))})
             .then(() => {dispatch(IsCloudinaryFailure(null))})
             .then(() => {setCompany(Post?.company)})
             .then(() => {setLocation(Post?.location)})
             .then(() => {setJobType(Post?.jobType)})
             .then(() => setJobPlatform(Post?.jobPlatform))
             .then(() => {setExperience(Post?.experience)})
             .then(() => {setSalary(Post?.salary)})
             .then(() => {setJobDescription(Post?.jobDescription)})
              .then(() => {setVisible(false)})
          }

    const jobFields = [
  "Information Technology",
  "Software Development",
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cyber Security",
  "Cloud Computing",
  "DevOps",
  "Networking",
  "Embedded Systems",
  "Electronics",
  "Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Automobile Engineering",
  "Aerospace Engineering",
  "Robotics",
  "Manufacturing",
  "Quality Assurance",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Content Writing",
  "Human Resources",
  "Recruitment",
  "Sales",
  "Marketing",
  "Customer Support",
  "Technical Support",
  "Business Development",
  "Finance",
  "Accounting",
  "Banking",
  "Insurance",
  "Healthcare",
  "Pharmacy",
  "Biotechnology",
  "Education",
  "Teaching",
  "Research",
  "Logistics",
  "Supply Chain Management",
  "Operations",
  "Administration",
  "Hospitality",
  "Construction",
  "Government Services"
];


    return(
        <>
             <span
                className="mx-2"
                label="Show"
                icon={`pi pi-external-link`}
                style={{cursor : `pointer`}}
                onClick={() => {
                  setVisible(true)
                  setProfileImagePreview(Post?.profileImage?.url)
                  setCompany(Post?.companyName)
                  setLocation(Post?.jobLocation)
                  setJobType(Post?.jobType)
                  setJobPlatform(Post?.jobPlatform)
                  setExperience(Post?.experience)
                  setSalary(Post?.salary)
                  setJobDescription(Post?.jobDescription)
                }}
              >
                <span>{`Edit`}</span>
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faPenToSquare}
                ></FontAwesomeIcon>
              </span>
              <Dialog
                header={`Find Dreams`}
                visible={visible}
                style={{ width: "50vw" }}
                                  breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
                onHide={() => {
                  if (!visible) return;
                  setVisible(false)
                  setLoad(false)
                  setProfileImage(null)
                  setProfileImagePreview(Post?.profileImage?.url)
                  setCompany(Post?.companyName)
                  setLocation(Post?.jobLocation)
                  setJobType(Post?.jobType)
                  setJobPlatform(Post?.jobPlatform)
                  setExperience(Post?.experience)
                  setSalary(Post?.salary)
                  setJobDescription(Post?.jobDescription)
                  setAlertMsg(null);
                }}
              >
        <div>
        <h5>Update Job Post</h5>
        <br/>
                  {load && profileImage && !ImageUrl? 
                  <Cloudinary
                    file={profileImage}
                    fileType="image"
                    model={"recruiterPosts"}
                    id={Post?._id}
                    field="image"
                    existingFile={Post?.profileImage}
                  />
                 : null}
                <img
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : Post?.profileImage?.url
                  }
                  alt="Preview"
                  className="image-preview"
                  style={{
                    width: `200px`,
                    height: `200px`,
                    borderRadius: "100%",
                    border : `1px solid`
                  }}
                />
                <br />

                {!load && !ImageUrl ? (
                  <>
                    <label
                      className="upload-btn mt-3 mx-5"
                      htmlFor="profileUpload"
                      style={{
                        fontSize: `12pt`,
                        borderRadius: `100%`,
                        cursor : `pointer`
                      }}
                    >
                      <span>Change profile</span>
                      <FontAwesomeIcon
                        className="mx-1"
                        icon={faPenToSquare}
                      ></FontAwesomeIcon>
                    </label>
                    <br />

                    <input
                      id="profileUpload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if(file){
                        setProfileImage(file);
                        setProfileImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </>
                ) : null}
                <br />
                     <Box
                        component="form"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          id="outlined-basic"
                          label="Update your Company Name"
                          variant="outlined"
                        />
                      </Box>
                      <br/>

                        <Box
                        component="form"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          id="outlined-basic"
                          label="Update Job Location"
                          variant="outlined"
                        />
                      </Box>
                      <br/>

                <Box sx={{ width: `100%`}}>
                  <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">
                      Update Job Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={jobType}
                      label="Update your Job Type"
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <MenuItem value={"Full Time"}>Full Time</MenuItem>
                      <MenuItem value={"Part Time"}>Part Time</MenuItem>
                      <MenuItem value={"Internship"}>Internship</MenuItem>
                      <MenuItem value={"Contract"}>Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <br />

                                <Box sx={{ width: `100%`}}>
                  <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">
                      Update Job Platform
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={jobPlatform}
                      label="Update your Job Platform"
                      onChange={(e) => setJobPlatform(e.target.value)}
                    >
                      <MenuItem value={"Full Time"}>Full Time</MenuItem>
                      {jobFields?.map((f) => (
                        <MenuItem value={f}>{f}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <br />

                <Box sx={{ width: `100%`}}>
                  <FormControl fullWidth>
                    <InputLabel required id="demo-simple-select-label">
                      Update Job Experience
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={experience}
                      required
                      label="Update your Experience"
                      onChange={(e) => setExperience(e.target.value)}
                    >
                        <MenuItem value={"Less than 1 year"}>{`Less than 1 year`}</MenuItem>
                        {Nums?.map((n) => (
                      <MenuItem value={`${n} years`}>{`${n} years`}</MenuItem>
                        ))}
                      <MenuItem value={"50+ years"}>{`${50}+ years`}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <br />

        <FormControl fullWidth required>
          <InputLabel>Salary (LPA)</InputLabel>
          <Select value={salary} label="Salary" onChange={(e)=>setSalary(e.target.value)}>
            {Nums.map((n)=>(
              <MenuItem key={n} value={`${n} LPA`}>{`${n} LPA`}</MenuItem>
            ))}
          </Select>
        </FormControl>
                <br /><br />

                                        <Box
                        component="form"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          value={jobDescription}
                          multiline
                          onChange={(e) => setJobDescription(e.target.value)}
                          id="outlined-basic"
                          label="Update Job Description"
                          variant="outlined"
                        />
                      </Box>
                      <br/>


            {/* Skills */}
            <div className="skills-section">

              <h5>Skills</h5>

              <div className="skills-container">
                {Post?.skills?.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill}
                    <span style={{cursor : `pointer`}}>
                      <FontAwesomeIcon onClick={() => handleSkillDelete(Post?._id,skill)} className="mx-2" icon={faDeleteLeft}/>
                    </span>
                  </span>
                ))}
              </div>

            </div>

        <br/>
        <div>

                      <Box
                        component="form"
                        sx={{ "& > :not(style)": { width: `100%` } }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          type="text"
                          value={AddSkill}
                          multiline
                          onChange={(e) => setAddSkill(e.target.value)}
                          id="outlined-basic"
                          label="Add your skills here.."
                          variant="outlined"
                        />
                      </Box>
                      </div>
    </div>
    <ErrorAlert
    alertMsg={AlertMsg}
    buttonName={`Add Skill`}
    buttonVariant={`contained`}
    colorbg={`green`}
    buttonClass={`mt-3`}
    handlefn={handleSkillAdd}
    />
                   {load && profileImage && !ImageUrl?
                <div className="mb-3">
                  <ProgressLoad trigger={1} setSize={`20px`} msg={`Loading`}/>
                  <p style={{cursor : `pointer`}} className="text-danger" onClick={() => setLoad(false)}>Cancel?</p>
                </div>
                : null}
                <div className="mt-3">
                {!load && !ImageUrl ? (
                  <ErrorAlert
                    alertMsg={savebtnError}
                    buttonName={`Save`}
                    buttonVariant={`outlined`}
                    handlefn={handleSave}
                  />
                ) :
                 (  
                  <div className="d-flex">
                    <ErrorAlert
                      alertMsg={submitbtnError}
                      buttonName={`Update`}
                      buttonVariant={`contained`}
                      handlefn={handleSubmit}
                    />
                  </div>
                )
            }
              </div>
              </Dialog>
              <style>{`
              .skills-container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-chip{
  background: linear-gradient(135deg,#007bff,#00c6ff);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
 }

 .skills-section{
  margin-bottom: 25px;
}
  
              `}</style>
        </>
    )
}

export default DialogboxRecruiterPost