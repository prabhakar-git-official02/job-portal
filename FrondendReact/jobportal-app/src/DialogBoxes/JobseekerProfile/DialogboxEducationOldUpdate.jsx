import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import {
  jobseekerProfileThunk,
} from "../../Thunks/jobseekerProfileThunk";
import ErrorAlert from "../../Components/ErrorAlert";
import { jobseekerProfileEduFieldUpdateThunk } from "../../Thunks/jobseekerProfileThunk";
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

function DialogboxEducationOld({ index,EdId,JsId }) {
  const dispatch = useDispatch();

  const [loading,setLoading] = useState(false)

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

  const EducationIndex = JobseekerProfile?.education.find(
    (_, i) => i === index,
  );
  console.log(EducationIndex);
  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [institute, setInstitute] = useState(EducationIndex?.institute);
  const [qualification, setQualification] = useState(
    EducationIndex?.qualification,
  );
  const [yearStart, setYearStart] = useState(EducationIndex?.yearStart);
  const [yearEnd, setYearEnd] = useState(EducationIndex?.yearEnd);

  const UpdateDatas = { 
        institute: institute || EducationIndex?.institute,
        qualification: qualification || EducationIndex?.qualification,
        yearStart: yearStart || EducationIndex?.yearStart,
        yearEnd: yearEnd || EducationIndex?.yearEnd,
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

  const handleSubmit = async () => {
    try{
      setLoading(true)
    if (
      !institute ||
      institute.trim() === "" ||
      !qualification ||
      qualification.trim() === "" ||
      !yearStart ||
      !yearEnd
    ) {
      setLoading(false)
      setAlertMsg({
        msg: "Invalid Update",
        id: Date.now(),
      });
      return
    }
    dispatch(jobseekerProfileEduFieldUpdateThunk(JsId,EdId,UpdateDatas))
    .then((res) => dispatch(jobseekerProfileThunk()))
    .then(() => setLoading(false))
    setAlertMsg(null);
    setInstitute(UpdateDatas?.institute);
    setQualification(UpdateDatas?.qualification);
    setYearStart(UpdateDatas?.yearStart);
    setYearEnd(UpdateDatas?.yearEnd);
    setVisible(false);
  }catch(err){
    setLoading(false)
    console.log("JobseekerProfile/DialogboxEducationOld/handlesubmit-Err",err?.message)
  }
  };

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
          setInstitute(EducationIndex?.institute);
          setQualification(EducationIndex?.qualification);
          setYearStart(EducationIndex?.yearStart);
          setYearEnd(EducationIndex?.yearEnd);
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
            value={institute}
            label={"Update your Institute"}
            multiline
            onChange={(e) => setInstitute(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <br />

        <Box sx={{ width: `100%` }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Update your Qualification
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qualification}
              required
              label={"Update your Qualification"}
              onChange={(e) => setQualification(e.target.value)}
            >
              {qualifications?.map((q) => (
                <MenuItem value={q}>{q}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <br />
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
            className="mx-lg-2"
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
           buttonClass={`mt-4`}
          buttonVariant={`contained`}
          colorbg={`teal`}
          handlefn={handleSubmit}
        />
      </Dialog>
      
    </>
  );
}

export default DialogboxEducationOld;
