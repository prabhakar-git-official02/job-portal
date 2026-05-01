import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import { jobseekerProfileExpAddThunk } from "../../Thunks/jobseekerProfileThunk";
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
import { jobseekerProfileThunk } from "../../Thunks/jobseekerProfileThunk";
import ProgressLoad from "../../Components/ProgressLoad";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function DialogboxExperienceNew({ btnName, btnType }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(jobseekerProfileThunk());
  }, [user, dispatch]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );

  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [company, setCompany] = useState();
  const [field, setField] = useState();
  const [yearStart, setYearStart] = useState(null);
  const [yearEnd, setYearEnd] = useState(null);
  const [workExperience, setWorkExperience] = useState();
  const [CTC, setCTC] = useState();
  const [loading,setLoadig] = useState(false)
   const [updated,setUpdated] = useState(false)

  const UpdateDatas = {
    company: company,
    field: field,
    yearStart: yearStart,
    yearEnd: yearEnd,
    workExperience: workExperience,
    CTC: CTC,
  };

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
      setLoadig(true)
    if (
      !company ||
      company.trim() === "" ||
      !field ||
      field.trim() === "" ||
      !CTC ||
      CTC.trim() === ""
    ) {
      setLoadig(false)
      setUpdated(false)
      setAlertMsg({
        msg: "Invalid Update",
        id: Date.now(),
      });
      return
    }

    if(
      !yearStart ||
      !yearEnd
    ){
      setLoadig(false)
      setUpdated(false)
      setAlertMsg({
        msg : "Years Required",
        id : Date.now()
      })
      return
    }
   await dispatch(jobseekerProfileExpAddThunk(UpdateDatas, JobseekerProfile));
    setLoadig(false)
    setUpdated(true)
    setAlertMsg(null);
    setCompany("");
    setField("");
    setYearStart(null);
    setYearEnd(null);
    setWorkExperience("");
    setCTC("");
  }catch(err){
    setLoadig(false)
    setUpdated(false)
    console.log("JobseekerProfile/DialogboxExperienceNew/handlesubmit-Err",err?.message)
  }
  };
  
  const Nums = [];

  for (let i = 1; i < 50; i++) {
    Nums.push(i);
  }
  return (
    <>
    <button 
    className="add-btn mt-3"
    style={{background : `linear-gradient(90deg, #16a34a, #10b981)`}}
            label="Show"
        icon={`pi pi-external-link`}
        onClick={() => setVisible(true)}
    >
      Add Experience
    </button>

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
          setLoadig(false)
          setUpdated(false)
          setCompany("");
          setField("");
          setWorkExperience("");
          setCTC("");
          setYearStart("");
          setYearEnd("");
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
            label={"Enter your Company Name"}
            onChange={(e) => setCompany(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <br />

        <Box sx={{ width: `100%` }}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">
              Enter your Field
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={field}
              required
              label={"Enter your Field"}
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
placeholder="About your Work Experience"
value={workExperience}
onChange={(e) => setWorkExperience(e.target.value)}
></textarea>
<br />
          <TextField
            type="number"
            fullWidth
            value={CTC}
             required
            label={"Enter your CTC (In LPA)"}
            onChange={(e) => setCTC(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        <br /><br />
        <LocalizationProvider required dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            label="Start Year"
            className="mb-4 mb-lg-0"
            value={yearStart ? dayjs(yearStart) : null}
            onChange={(newValue) => setYearStart(newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider required dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            label="End Year"
            value={yearEnd ? dayjs(yearEnd) : null}
            onChange={(newValue) => setYearEnd(newValue)}
            className="mx-lg-2"
          />
        </LocalizationProvider>

        <br />
        <br />
         {updated && !loading?<p className="text-success mt-3 d-flex"><span>Experience Added Successfully</span> <span className="mx-1"><ThumbUpAltIcon/></span></p>:null}
                        {loading ? 
                        <div className="mt-4">
                          <ProgressLoad trigger={1} msg={`Adding Experience..`} setSize={`20px`}/>
                        </div> : null
                        }
        <ErrorAlert
          alertMsg={AlertMsg}
          buttonName={`Add Experience`}
           buttonClass={`mt-4`}
          buttonVariant={`contained`}
          colorbg={`teal`}
          handlefn={handleSubmit}
        />
      </Dialog>
    </>
  );
}

export default DialogboxExperienceNew;
