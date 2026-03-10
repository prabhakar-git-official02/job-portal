import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { showAlert } from "../../Scripts/Alert";
import { authThunk } from "../../Thunks/authThunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../Scripts/emailValidation";
import { jobseekerProfileThunk } from "../../Thunks/jobseekerProfileThunk";
import CloudinaryInital from "../../Components/CloudinaryInitial";
import Button from "@mui/material/Button";
import {
  IsImageUrlSuccess,
  IsResumeUrlSuccess,
  IsImagePublicIdSuccess,
  IsResumePublicIdSuccess,
} from "../../Redux/cloudinarySlice";

import TextField from "@mui/material/TextField";
// Select imput
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ErrorAlert from "../../Components/ErrorAlert";
import InputFileUpload from "../../Components/InputFileUpload";
import ProgressLoad from "../../Components/ProgressLoad";
import MainNav from "../../Navbar/MainNav";
import { IsJobseekerProfileFailure } from "../../Redux/jobseekerProfileSlice";
import LocationInput from "../../Components/LocationInput";
import { MuiTelInput } from "mui-tel-input";
import { isValidPhoneNumber } from "libphonenumber-js";

function JobseekerProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [load, setLoad] = useState(false);
  const [savebtnError, setSavebtnError] = useState(null);


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

  console.log(user);
  console.log(JobseekerProfile);

  const ImageUrl = useSelector((state) => state.cloudinary.ImageUrl);
  const ImagePublicId = useSelector((state) => state.cloudinary.ImagePublicId);
  const ResumeUrl = useSelector((state) => state.cloudinary.ResumeUrl);
  const ResumePublicId = useSelector(
    (state) => state.cloudinary.ResumePublicId,
  );

  const ErrorMsg = useSelector((state) => state.cloudinary.error);

  useEffect(() => {
    if (ErrorMsg) {
      setLoad(false);
    }
  }, [ErrorMsg]);




  // Save btn
  const handleSave = () => {
    setLoad(true);

    if (!isValidEmail(email)) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Email!",
        id: Date.now(),
      });

      return;
    }

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      phone <= 0 ||
      gender === "" ||
      age.trim() === "" ||
      location.trim() === "" ||
      state.trim() === "" ||
      country.trim() === "" ||
      jobType === ""
    ) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Form Save!",
        id: Date.now(),
      });
      return;
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Phone Number!",
        id: Date.now(),
      });
      return;
    }

if(!profileImage && !resume){
 handleSubmit()
}

  };


  const handleSubmit = useCallback(async () => {
    try {

    const ProfileImageObj =  {
    url: ImageUrl ? ImageUrl : null,
    public_id: ImagePublicId ? ImagePublicId : null,
  }

  const ResumeObj = {
    url: ResumeUrl ? ResumeUrl : null,
    public_id: ResumePublicId ? ResumePublicId : null,
  };

  
      if (expectedSalary < 0) {
        setLoad(false);
        setSavebtnError({
          msg: "Invalid Expected Salary",
          id: Date.now(),
        });
        return;
      }

      const response = await api.post(
        "/profile/jobseeker-Profile/Post",
        {
          profileImage: ProfileImageObj,
          bio: bio,
          about: about,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          gender: gender,
          age: age,
          location: location,
          state: state,
          country: country,
          resume: ResumeObj,
          expectedSalary:
            expectedSalary.trim() === ""
              ? expectedSalary
              : `${expectedSalary}LPA`,
          jobType: jobType,
          preferredLocation: preferredLocation,
        },
        {
          withCredentials: true,
        },
      );
      if (response) {
        showAlert("Success", response.data.msg, "success");
        setLoad(false);
        dispatch(IsImageUrlSuccess(null));
        dispatch(IsResumeUrlSuccess(null));
        dispatch(IsImagePublicIdSuccess(null));
        dispatch(IsResumePublicIdSuccess(null));
        dispatch(IsJobseekerProfileFailure(null));
        setSavebtnError(null);
        return navigate("/jobseekerProfile");
      }
    } catch (err) {
      setLoad(false);
      setSavebtnError({
        msg: err.status === 409 ? "Profile Already Exist" : err.message,
        id: Date.now(),
      });
    }
  },[ImageUrl,ImagePublicId,ResumeUrl,ResumePublicId,about,age,bio,country,dispatch,email,expectedSalary,firstName,jobType,gender,lastName,location,navigate,phone,preferredLocation,state])



  
  useEffect(() => {
    if (load) {
      if (profileImage && resume && ImageUrl && ResumeUrl) {
        handleSubmit();
      }

      if (profileImage && !resume && ImageUrl) {
        handleSubmit();
      }

      if (!profileImage && resume && ResumeUrl) {
        handleSubmit();
      }

      if (!profileImage && !resume) {
        handleSubmit();
      }
    }
  }, [ImageUrl, ResumeUrl,load,profileImage,resume,handleSubmit]);

  const Nums = [];

  for (let i = 1; i < 50; i++) {
    Nums.push(i);
  }

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

  return (
    <>
      {load && profileImage ? (
        <CloudinaryInital file={profileImage} fileType={"image"} load={load} />
      ) : null}

      {load && resume ? (
        <CloudinaryInital file={resume} fileType={"resume"} load={load} />
      ) : null}

      <MainNav />

      <div className="profile-setting-wrapper">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Jobseeker Profile</h2>
            <p>Create your professional profile</p>
          </div>

          <div className="profile-body">
            <div className="image-section">
              <img
                src={
                  profileImagePreview
                    ? profileImagePreview
                    : "default-profile.jpg"
                }
                alt="Preview"
                className="profile-preview"
              />

              {!load && (
                <>
                  <input
                    id="profileUpload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setProfileImage(file);
                      setProfileImagePreview(URL.createObjectURL(file));
                    }}
                  />
                  <div>
                    <label className="change-btn" htmlFor="profileUpload">
                      Upload Profile
                    </label>
                  </div>
                </>
              )}
            </div>

            <div className="form-grid">
              <TextField
                required
                sx={{ m: 1 }}
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                required
                sx={{ m: 1 }}
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <TextField
                sx={{ m: 1 }}
                fullWidth
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                sx={{ m: 1 }}
                fullWidth
                multiline
                label="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <TextField
                required
                sx={{ m: 1 }}
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MuiTelInput
                sx={{ m: 1 }}
                label="Phone Number"
                required
                fullWidth
                defaultCountry="IN"
                value={phone}
                onChange={(val) => setPhone(val)}
                error={phone ? !isValidPhoneNumber(phone) : false}
                helperText={
                  phone && !isValidPhoneNumber(phone) ? "Invalid phone" : ""
                }
              />

              <TextField
                required
                sx={{ m: 1 }}
                fullWidth
                type="number"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <FormControl required sx={{ m: 1 }} fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="number"
                sx={{ m: 1 }}
                fullWidth
                label="Expected Salary (In LPA)"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
              />

              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel>Preferred Location</InputLabel>
                <Select
                  value={preferredLocation}
                  label="Preferred Location"
                  onChange={(e) => setPreferredLocation(e.target.value)}
                >
                  {preferredLocations.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocationInput
                country={country}
                setCountry={setCountry}
                state={state}
                setState={setState}
                location={location}
                setLocation={setLocation}
              />

              <FormControl sx={{ m: 1 }} required fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={jobType}
                  label="Job Type"
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mt-3">
              {!load && (
                <span>
                  <InputFileUpload
                    name={resume ? "Change Resume" : "Upload Resume"}
                    setdata={setResume}
                    setPreview={setResumePreview}
                  />
                </span>
              )}

              {resumePreview ? (
                <p className="mt-3">
                  <Button
                    variant="outlined"
                    onClick={() => window.open(resumePreview, "_blank")}
                  >
                    View Resume
                  </Button>
                </p>
              ) : (
                <p className="no-resume mt-3">Resume Not Uploaded!</p>
              )}
            </div>

            <div className="action-section">
              {load ? (
                <div className="mt-4 d-flex justify-content-center">
                  <ProgressLoad setSize={`20px`} trigger={1} msg={`Loading`} />
                </div>
              ) : null}
              <ErrorAlert
                alertMsg={savebtnError}
                buttonName="Save"
                buttonClass={`mt-3`}
                buttonVariant="outlined"
                handlefn={handleSave}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
.profile-setting-wrapper {
  padding: 120px 20px 40px;
  display: flex;
  justify-content: center;
  background: #f4f6fb;
  min-height: 100vh;
}

.profile-card {
  width: 100%;
  max-width: 950px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  padding: 40px;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-header h2 {
  font-weight: 600;
  margin-bottom: 5px;
}

.profile-header p {
  font-size: 14px;
  color: #777;
}

.image-section {
  text-align: center;
  margin-bottom: 30px;
}

.profile-preview {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.change-btn {
  background: #2c5364;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

.change-btn:hover {
  opacity: 0.85;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
  margin-top: 20px;
}

.resume-section {
  margin-top: 30px;
  align-items: center;
  gap: 20px;
}

.no-resume {
  color: #888;
  font-size: 14px;
}

.action-section {
  margin-top: 40px;
  text-align: center;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    padding: 25px;
  }
}
`}</style>
    </>
  );
}

export default JobseekerProfileForm;
