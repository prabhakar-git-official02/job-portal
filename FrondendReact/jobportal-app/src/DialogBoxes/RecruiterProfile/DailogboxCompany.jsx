import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { authThunk } from "../../Thunks/authThunk";
import ErrorAlert from "../../Components/ErrorAlert";
import ImageAvatar from "../../Components/ImageAvatar";
import {
  recruiterProfileThunk,
  recruiterProfileUpdateThunk,
} from "../../Thunks/recruiterProfileThunk";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function DialogboxAbout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(recruiterProfileThunk());
  }, [user, dispatch]);

  const RecruiterProfile = useSelector(
    (state) => state.recruiterProfile.profile,
  );

  const [visible, setVisible] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(null);
  const [company, setCompany] = useState(RecruiterProfile?.companyName);
  const [companyWebsite, setCompanyWebsite] = useState(
    RecruiterProfile?.companyWebsite,
  );
  const [companyAddress, setCompanyAddress] = useState(
    RecruiterProfile?.companyAddress,
  );
  const [industry, setIndustry] = useState(RecruiterProfile?.industry);
  const [companySize, setCompanySize] = useState(RecruiterProfile?.companySize);
  const [designation, setDesignation] = useState(RecruiterProfile?.designation);

  const UpdateDatas = {
    companyName: company || RecruiterProfile?.companyName,
    companyWebsite: companyWebsite || RecruiterProfile?.companyWebsite,
    companyAddress: companyAddress || RecruiterProfile?.companyAddress,
    industry: industry || RecruiterProfile?.industry,
    companySize: companySize || RecruiterProfile?.companySize,
    designation: designation || RecruiterProfile?.designation,
  };

  const handleSubmit = async () => {
    if (
      company.trim() === "" ||
      !company ||
      companyWebsite.trim() === "" ||
      !companyWebsite ||
      companyAddress.trim() === "" ||
      !companyAddress ||
      industry === "" ||
      !industry ||
      companySize === "" ||
      !companySize ||
      designation === "" ||
      !designation
    ) {
      return setAlertMsg({
        msg: "Invalid Update",
        id: Date.now(),
      });
    }
    dispatch(recruiterProfileUpdateThunk(UpdateDatas)).then(
      dispatch(recruiterProfileThunk()),
    );
    setCompany(UpdateDatas?.companyName);
    setCompanyWebsite(UpdateDatas?.companyWebsite);
    setCompanyAddress(UpdateDatas?.companyAddress);
    setIndustry(UpdateDatas?.industry);
    setCompanySize(UpdateDatas?.companySize);
    setDesignation(UpdateDatas?.designation);
    setAlertMsg(null);
    setVisible(false);
  };

  const industries = [
    "Information Technology",
    "Software Development",
    "Artificial Intelligence",
    "Cybersecurity",
    "Data Science",
    "Telecommunications",
    "Electronics Manufacturing",
    "Embedded Systems",
    "Automobile",
    "Aerospace",
    "Mechanical Engineering",
    "Construction",
    "Real Estate",
    "Banking",
    "Finance",
    "Insurance",
    "FinTech",
    "E-commerce",
    "Retail",
    "Wholesale",
    "Digital Marketing",
    "Advertising",
    "Media & Entertainment",
    "Film Production",
    "Music Industry",
    "Graphic Design",
    "UI/UX Design",
    "Gaming",
    "Animation",
    "Education",
    "EdTech",
    "Healthcare",
    "Pharmaceuticals",
    "Biotechnology",
    "Medical Devices",
    "Hospitality",
    "Tourism",
    "Food & Beverage",
    "Agriculture",
    "AgriTech",
    "Logistics",
    "Supply Chain",
    "Transportation",
    "Shipping",
    "Energy",
    "Renewable Energy",
    "Oil & Gas",
    "Mining",
    "Legal Services",
    "Human Resources",
  ];

  const companySizes = [
    "1-10 Employees",
    "11-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "501-1000 Employees",
    "1001-5000 Employees",
    "5001-10000 Employees",
    "10001+ Employees",
    "Startup (1-50 Employees)",
    "Small Business (51-200 Employees)",
    "Mid-Sized Company (201-1000 Employees)",
    "Large Company (1001-5000 Employees)",
    "Enterprise (5001-10000 Employees)",
    "Large Enterprise (10000+ Employees)",
    "Multinational Corporation (10000+ Employees)",
  ];

  const recruiterDesignations = [
    "HR Intern",
    "HR Trainee",
    "HR Executive",
    "HR Recruiter",
    "Technical Recruiter",
    "IT Recruiter",
    "Non-IT Recruiter",
    "Senior Recruiter",
    "Lead Recruiter",
    "Talent Acquisition Executive",
    "Talent Acquisition Specialist",
    "Talent Acquisition Partner",
    "Talent Acquisition Lead",
    "Talent Acquisition Manager",
    "Recruitment Consultant",
    "Recruitment Specialist",
    "Recruitment Coordinator",
    "Staffing Specialist",
    "Staffing Consultant",
    "Sourcing Specialist",
    "Candidate Sourcing Executive",
    "Headhunter",
    "Campus Recruiter",
    "Corporate Recruiter",
    "Executive Recruiter",
    "Global Recruiter",
    "Recruitment Manager",
    "HR Business Partner (HRBP)",
    "HR Manager",
    "Senior HR Manager",
  ];

  return (
    <>
      <button
        className="add-btn mt-2"
        style={{ background: `linear-gradient(90deg, #8b5cf6, #7c3aed)` }}
        onClick={() => setVisible(true)}
        icon={faPenToSquare}
      >
        Edit <FontAwesomeIcon icon={faPenToSquare} />
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
          setCompany(RecruiterProfile?.companyName);
          setCompanyWebsite(RecruiterProfile?.companyWebsite);
          setCompanyAddress(RecruiterProfile?.companyAddress);
          setIndustry(RecruiterProfile?.industry);
          setCompanySize(RecruiterProfile?.companySize);
          setDesignation(RecruiterProfile?.designation);
          setAlertMsg(null);
        }}
      >
        <div>
          <ImageAvatar
            avatarSizeH={`70px`}
            avatarSizeW={`70px`}
            nameClass={`h4 mt-4`}
            nameMsg={
              RecruiterProfile?.firstName + " " + RecruiterProfile?.lastName
            }
            srcLink={RecruiterProfile?.profileImage?.url}
          />
        </div>

        <Box
          component="form"
          sx={{ "& > :not(style)": { width: `100%` } }}
          noValidate
          autoComplete="off"
          className="mt-5"
        >
          <TextField
            type="text"
            value={company}
            label={"Update your Company Name"}
            onChange={(e) => setCompany(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>

        <Box
          component="form"
          sx={{ "& > :not(style)": { width: `100%` } }}
          noValidate
          autoComplete="off"
          className="mt-5"
        >
          <TextField
            type="text"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            id="outlined-basic"
            variant="outlined"
            label={"Update your Company Website"}
          />
        </Box>

        <Box
          component="form"
          sx={{ "& > :not(style)": { width: `100%` } }}
          noValidate
          autoComplete="off"
          className="mt-5"
        >
          <TextField
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            id="outlined-basic"
            variant="outlined"
            label={"Update your Company Address"}
          />
        </Box>

        <Box sx={{ width: `100%` }}>
          <FormControl fullWidth className="mt-5">
            <InputLabel id="demo-simple-select-label" required>
              Select Industry
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={industry}
              required
              label="Select Industry"
              onChange={(e) => setIndustry(e.target.value)}
            >
              {industries?.map((ind) => (
                <MenuItem value={ind}>{ind}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: { lg: `100%` } }}>
          <FormControl fullWidth className="mt-5">
            <InputLabel id="demo-simple-select-label" required>
              Select Company Size
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={companySize}
              required
              label="Select Company Size"
              onChange={(e) => setCompanySize(e.target.value)}
            >
              {companySizes?.map((com) => (
                <MenuItem value={com}>{com}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: { lg: `100%` } }}>
          <FormControl fullWidth className="mt-5">
            <InputLabel id="demo-simple-select-label" required>
              Select Designation
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={designation}
              required
              label="Select Designation"
              onChange={(e) => setDesignation(e.target.value)}
            >
              {recruiterDesignations?.map((des) => (
                <MenuItem value={des}>{des}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <ErrorAlert
          alertMsg={AlertMsg}
          buttonName={`Update`}
          buttonVariant={`contained`}
          buttonClass={`mt-4`}
          handlefn={handleSubmit}
        />
      </Dialog>
      <style>
        {`
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
        `}
      </style>
    </>
  );
}

export default DialogboxAbout;
