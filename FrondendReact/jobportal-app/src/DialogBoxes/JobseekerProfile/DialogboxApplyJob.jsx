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

function DialogboxApplyJob({ btnName,JobId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);

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

  const Nums = [];

  for (let i = 1; i < 50; i++) {
    Nums.push(i);
  }

  console.log(Nums);

  const preferredLocations = [
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Mumbai",
    "Pune",
    "New Delhi",
    "Noida",
    "Gurugram",
    "Kolkata",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Jaipur",
    "Indore",
    "Bhopal",
    "Lucknow",
    "Kanpur",
    "Chandigarh",
    "Ludhiana",
    "Amritsar",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Kochi",
    "Thiruvananthapuram",
    "Kozhikode",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Warangal",
    "Nashik",
    "Nagpur",
    "Aurangabad",
    "Rajkot",
    "Jodhpur",
    "Udaipur",
    "Raipur",
    "Bhubaneswar",
    "Cuttack",
    "Ranchi",
    "Jamshedpur",
    "Patna",
    "Guwahati",
    "Shillong",
    "Dehradun",
    "Haridwar",
    "Srinagar",
    "Jammu",
    "Agra",
  ];

  const handleJobApply = () => {
    if (
      qualification.trim() === "" ||
      experience === 0 || experience === "" ||
      preferredLocation.trim() === "" ||
      expectedSalary === 0 || expectedSalary === "" 
    ) {
      setAlertMsg({
        msg: "Invalid Apply",
        id: Date.now(),
      });
      return;
    }

    dispatch(applyJobPostThunk(JobId,applicantData))
    .then(() => setQualification(""))
    .then(() => setExperience(""))
    .then(() => setPreferredLocation(""))
    .then(() => setExpectedSalary(""))
    .then(()=> setAlertMsg(null))
    .then(() => {navigate('/allJobs')})
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
                Select your Qualification
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={qualification}
                required
                label="Select your Qualification"
                onChange={(e) => setQualification(e.target.value)}
              >
                {qualifications?.map((q) => (
                  <MenuItem value={q}>{q}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br />

          <Box sx={{ width: `100%` }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Select your Experience
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={experience}
                required
                label="Select your Experience"
                onChange={(e) => setExperience(e.target.value)}
              >
                <MenuItem value={`Less than 1 year`}>{`Less than 1 year`}</MenuItem>
                {Nums?.map((n) => (
                  <MenuItem value={`${n} years`}>{`${n} years`}</MenuItem>
                ))}
                <MenuItem value={`50 years+`}>{`50 years+`}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          <Box sx={{ width: `100%` }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Select your Preferred Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={preferredLocation}
                required
                label="Select your Preferred Location"
                onChange={(e) => setPreferredLocation(e.target.value)}
              >
                {preferredLocations?.map((Pl) => (
                  <MenuItem value={Pl}>{Pl}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br/>
          <Box sx={{ width: `100%` }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Expected Salary
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={expectedSalary}
                required
                label="Select your Experience"
                onChange={(e) => setExpectedSalary(e.target.value)}
              >
                {Nums?.map((n) => (
                  <MenuItem value={`${n} LPA`}>{`${n} LPA`}</MenuItem>
                ))}
                <MenuItem value={`50 LPA+`}>50 LPA+</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
        </div>
        <ErrorAlert
          alertMsg={AlertMsg}
          buttonName={`Apply`}
          buttonVariant={`contained`}
          buttonClass={`mt-3`}
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
