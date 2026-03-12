import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import {jobseekerProfileExpFieldUpdateThunk, jobseekerProfileThunk,} from "../../Thunks/jobseekerProfileThunk";
import ErrorAlert from "../../Components/ErrorAlert";
import ImageAvatar from "../../Components/ImageAvatar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ProgressLoad from "../../Components/ProgressLoad";

function DialogboxExperienceOld({ index,ExId,JsId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(jobseekerProfileThunk());
  }, [user, dispatch]);

  const JobseekerProfile = useSelector( (state) => state.jobseekerProfile.profile,);

  const ExperienceIndex = JobseekerProfile?.experience.find((_, i) => i === index);


  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [company, setCompany] = useState(ExperienceIndex?.company);
  const [field, setField] = useState( ExperienceIndex?.field,);
  const [yearStart, setYearStart] = useState(ExperienceIndex?.yearStart);
  const [yearEnd, setYearEnd] = useState(ExperienceIndex?.yearEnd);
  const [workExperience,setWorkExperience] = useState(ExperienceIndex?.workExperience)
  const [CTC,setCTC] = useState(ExperienceIndex?.CTC)
  const [loading,setLoading] = useState(false)

  const UpdateData = { 
        company:company ? company : ExperienceIndex?.company,
         field : field ? field : ExperienceIndex?.field,
        yearStart: yearStart ? yearStart : ExperienceIndex?.yearStart,
        yearEnd: yearEnd ? yearEnd : ExperienceIndex?.yearEnd,
     workExperience : workExperience ? workExperience : ExperienceIndex?.workExperience,
     CTC :  CTC ? CTC : ExperienceIndex?.CTC

  };

    console.log(UpdateData);
    console.log("Jsid",JsId);
    console.log("exid",ExId);
    
  const Fields = ["Full Stack Development","Front-End Development","Back-End Development","Software Engineering","Computer Science",
    "Information Technology","Artificial Intelligence","Data Science","Cyber Security","Cloud Computing","DevOps Engineering","Networking",
    "Embedded Systems","Electronics & Communication","Electrical Engineering","Mechanical Engineering","Civil Engineering","Automobile Engineering",
    "Biomedical Engineering","Pharmacy","Nursing","Medical Laboratory Technology","Physiotherapy","Business Administration","Finance & Accounting",
    "Marketing","Human Resources","Logistics & Supply Chain","Graphic Design","UI/UX Design","Animation & Multimedia","Journalism & Mass Communication",
    "Law","Education / Teaching","Hotel Management","Agriculture","Biotechnology","Chemistry","Physics","Mathematics","Commerce",
    "Economics", "Psychology", "Sociology",
    "Other",
  ];

  const handleSubmit = async () => {
    try{
      setLoading(true)
    if (
      !company ||
      company.trim() === "" ||
      !field ||
      field.trim() === "" ||
      !yearStart ||
      !yearEnd ||
      !workExperience ||
      workExperience.trim() === "" ||
      !CTC ||
      CTC.trim() === ""
    ) {
      setLoading(false)
       setAlertMsg({
        msg: "Invalid Update",
        id: Date.now(),
      });
      return
    }

    
    dispatch(jobseekerProfileExpFieldUpdateThunk(JsId,ExId,UpdateData))
    .then(() => setLoading(false))
    .then(() => setAlertMsg(null))
    .then(() => setCompany(UpdateData?.company))
    .then(() => setField(UpdateData?.field))
    .then(() => setYearStart(UpdateData?.yearStart))
    .then(() => setYearEnd(UpdateData?.yearEnd))
    .then(() => setWorkExperience(UpdateData?.workExperience))
    .then(() => setCTC(UpdateData?.CTC))
    .then(() => setVisible(false))
  }catch(err){
    setLoading(false)
    console.log("JobseekerProfile/DialogboxExperienceOld/handlesubmit-Err",err?.message)
  }
  };

  const Nums = [];

  for (let i = 1; i < 50; i++) {
    Nums.push(i);
  }

  return (
    <>
    <button
    className="add-btn"
    style={{background : `linear-gradient(90deg, #8b5cf6, #7c3aed)`}}
    onClick={() => setVisible(true)}
    icon={faPenToSquare} 
    >Edit <FontAwesomeIcon icon={faPenToSquare}/></button>

      <Dialog
        header={`Find Dreams`}
        visible={visible}
          breakpoints={{
    "1400px": "50vw",
    "1024px": "60vw",
    "768px": "80vw",
    "560px": "95vw",
    "480px": "98vw"
  }}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setLoading(false)
    setCompany(ExperienceIndex?.company);
    setField(ExperienceIndex?.field);
    setYearStart(ExperienceIndex?.yearStart);
    setYearEnd(ExperienceIndex?.yearEnd);
    setWorkExperience(ExperienceIndex?.workExperience);
    setCTC(ExperienceIndex?.CTC);
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

        <Box
          component="form"
          sx={{ "& > :not(style)": { width: `100%` } }}
          noValidate
          autoComplete="off"
          className="mt-3"
        >
          <TextField
            type="text"
            value={company}
            required
            label={"Update your Company Name"}
            onChange={(e) => setCompany(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <br />

        <Box sx={{ width: `100%` }}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">
              Update your Field
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={field}
              required
              label={"Update your Field"}
              onChange={(e) => setField(e.target.value)}
            >
              {Fields?.map((F) => (
                <MenuItem value={F}>{F}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <br />

<textarea 
className="form-control" 
placeholder="Add your Work Experience"
value={workExperience}
onChange={(e) => setWorkExperience(e.target.value)}
></textarea>
<br />

        <FormControl fullWidth required>
          <InputLabel>Add your CTC in (LPA)</InputLabel>
          <Select value={CTC} label="Add your CTC" onChange={(e)=>setCTC(e.target.value)}>
            {Nums.map((n)=>(
              <MenuItem key={n} value={`${n} LPA`}>{`${n} LPA`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br /><br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            label="Start Year"
            className="mb-4 mb-lg-0"
            value={yearStart ? dayjs(yearStart) : null}
            onChange={(newValue) => setYearStart(newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            label="End Year"
            value={yearEnd ? dayjs(yearEnd) : null}
            onChange={(newValue) => setYearEnd(newValue)}
            className="mx-lg-2 "
          />
        </LocalizationProvider>

        <br />
        <br />
                        {loading ? 
                        <div className="mt-4">
                          <ProgressLoad trigger={1} msg={`Loading..`} setSize={`20px`}/>
                        </div> : null
                        }
        <ErrorAlert
          alertMsg={AlertMsg}
          buttonName={`Update`}
          buttonVariant={`contained`}
          colorbg={`teal`}
          handlefn={handleSubmit}
        />
      </Dialog>
    </>
  );
}

export default DialogboxExperienceOld;