import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import {
  jobseekerProfileEduAddThunk,
  jobseekerProfileThunk,
} from "../../Thunks/jobseekerProfileThunk";
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
function DialogboxEducationNew() {
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
  const [institute, setInstitute] = useState("");
  const [qualification, setQualification] = useState("");
  const [yearStart, setYearStart] = useState(null);
  const [yearEnd, setYearEnd] = useState(null);

  const UpdateDatas = {
    institute: institute,
    qualification: qualification,
    yearStart: yearStart,
    yearEnd: yearEnd,
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
    if (
      !institute ||
      institute.trim() === "" ||
      !qualification ||
      qualification.trim() === "" ||
      !yearStart ||
      !yearEnd
    ) {
      return setAlertMsg({
        msg: "Invalid Update",
        id: Date.now(),
      });
    }
    dispatch(jobseekerProfileEduAddThunk(UpdateDatas, JobseekerProfile));
    setAlertMsg(null);
    setInstitute("");
    setQualification("");
    setYearStart(null);
    setYearEnd(null);
    setVisible(false);
  };

  return (
    <>
      <button
        className="add-btn mt-3"
        label="Show"
        style={{background : `linear-gradient(90deg,#2563eb,#7c3aed)`}}
        icon={`pi pi-external-link`}
        onClick={() => setVisible(true)}
      >
        Add Education
      </button>
      <Dialog
        header={`Find Dreams`}
        visible={visible}
        breakpoints={{
          "1400px": "50vw",
          "1024px": "60vw",
          "768px": "80vw",
          "560px": "95vw",
          "480px": "98vw",
        }}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setInstitute("");
          setQualification("");
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
            value={institute}
            label={"Add your Institute"}
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
              Add your Qualification
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qualification}
              required
              label={"Add your Qualification"}
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
            className="mb-3 mb-lg-0"
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
        <ErrorAlert
          alertMsg={AlertMsg}
          buttonName={`Add Education`}
          buttonVariant={`contained`}
          colorbg={`teal`}
          handlefn={handleSubmit}
        />
      </Dialog>
      <style>{`
    .add-btn{
border:none;
color:white;
padding:6px 16px;
font-size:14px;
border-radius:8px;
transition:.2s;
}

.add-btn:hover{
opacity:.9;
}
    `}</style>
    </>
  );
}

export default DialogboxEducationNew;
