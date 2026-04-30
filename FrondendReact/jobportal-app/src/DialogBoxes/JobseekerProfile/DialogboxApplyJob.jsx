import { Dialog } from "primereact/dialog";
import { authThunk } from "../../Thunks/authThunk";
import { jobseekerProfileThunk } from "../../Thunks/jobseekerProfileThunk";
import { applyJobPostThunk } from "../../Thunks/applicantThunk";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageAvatar from "../../Components/ImageAvatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ErrorAlert from "../../Components/ErrorAlert";
import { useNavigate } from "react-router-dom";
import ProgressLoad from "../../Components/ProgressLoad";
import { TextField } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function DialogboxApplyJob({ btnName,JobId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [loading,setLoading] = useState(false)
  const [applied,setApplied] = useState(false)

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
    }
  }, [user, dispatch]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );

  console.log(JobseekerProfile);

  const applicantData = {
    firstName: JobseekerProfile?.firstName,
    lastName: JobseekerProfile?.lastName,
    email: JobseekerProfile?.email,
    phone: JobseekerProfile?.phone,
    location: JobseekerProfile?.location,
    qualification: qualification,
    skills: JobseekerProfile?.skills,
    experience: experience,
    expectedSalary: expectedSalary,
    preferredLocation: preferredLocation,
    resume: {
      url: JobseekerProfile?.resume?.url,
    },
  };

  const qualifications = [
    "10th",
    "12th",
    "ITI",
    "Diploma / Polytechnic",
    "UG - Any Degree",
    "B.E",
    "B.Tech",
    "B.Sc",
    "B.Com",
    "BCA",
    "BA",
    "BBA",
    "B.Pharm",
    "LLB",
    "MBBS",
    "BDS",
    "PG - Any Degree",
    "M.E",
    "M.Tech",
    "M.Sc",
    "M.Com",
    "MCA",
    "MBA",
    "M.Pharm",
    "PhD",
    "CA",
    "CS",
    "ICWA",
    "Other",
  ];

  const handleJobApply = async() => {
    try{
      setLoading(true)

    if(!JobseekerProfile){
      return navigate('/jobseekerProfileForm')
    }
    if (
      qualification.trim() === "" ||
      experience<0 || !experience ||
      preferredLocation.trim() === "" ||
      expectedSalary<0 || !expectedSalary 
    ) {
      setLoading(false)
      setApplied(false)
      setAlertMsg({
        msg: "Invalid Apply",
        id: Date.now(),
      });
      return;
    }

   await dispatch(applyJobPostThunk(JobId,applicantData))
    .then(() => setLoading(false))
    .then(() => setApplied(true))
    .then(() => setQualification(""))
    .then(() => setExperience(""))
    .then(() => setPreferredLocation(""))
    .then(() => setExpectedSalary(""))
    .then(()=> setAlertMsg(null))
  }catch(err){
    setLoading(false)
    setApplied(false)
    console.log("JobseekerProfile/DialogboxApplyJob/handleJobApply-Err",err?.message)
  }
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ background: `teal` }}
        label="Show"
        icon={`pi pi-external-link`}
        onClick={() => setVisible(true)}
      >
        {btnName}
      </Button>
      <Dialog
header="Find Dreams"
  visible={visible}
  className="applyjob-dialog"
  breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
  style={{ width: "40vw" }}
  onHide={() => {
    setVisible(false);
    setLoading(false)
    setApplied(false)
    setQualification("");
    setExperience("");
    setExpectedSalary("");
    setPreferredLocation("");
    setAlertMsg(null);
  }}
      >
        <div>
          <ImageAvatar
            avatarSizeH={`70px`}
            avatarSizeW={`70px`}
            nameClass={`h4 mt-4`}
            nameMsg={
              JobseekerProfile?.firstName + " " + JobseekerProfile?.lastName
            }
            srcLink={JobseekerProfile?.profileImage?.url}
          />
        </div>
        <div className="mt-3">
          <Box sx={{ width: `100%` }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Select your qualification
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={qualification}
                required
                label="Select your qualification"
                onChange={(e) => setQualification(e.target.value)}
              >
                {qualifications?.map((q) => (
                  <MenuItem value={q}>{q}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br />

              <TextField
                type="number"
                fullWidth
                required
                label="Enter your experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
          <br />
          <br/>
              <TextField
                type="text"
                fullWidth
                required
                label="Enter your preferred location"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
              />
          <br/>
          <br/>
              <TextField
                type="number"
                fullWidth
                required
                label="Enter your expected salary (In LPA)"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
              />
          <br />
        </div>
         {applied && !loading? <p className="text-success mt-3 d-flex"><span>Job Applied Successfully</span> <span className="mx-1"><ThumbUpAltIcon/></span></p>:null}

                {loading ? 
                <div className="mt-4">
                  <ProgressLoad trigger={1} msg={`Applying..`} setSize={`20px`}/>
                </div> : null
                }

        <ErrorAlert
          alertMsg={AlertMsg}
          buttonName={`Apply`}
          buttonVariant={`contained`}
           buttonClass={`mt-4`}
          handlefn={handleJobApply}
        />
      </Dialog>
      <style>
        {`
        .applyjob-dialog .p-dialog-content{

  padding: 20px;

}


.applyjob-dialog .p-dialog-header{

  padding: 15px 20px;

}


/* mobile full height */
@media(max-width:560px){

  .applyjob-dialog{

    margin: 10px;

  }

  .applyjob-dialog .p-dialog{

    max-height: 95vh;

  }

}
        `}
      </style>
    </>
  );
}

export default DialogboxApplyJob;
