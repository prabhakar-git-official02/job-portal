import { useState} from "react";
import api from "../../api/axios";
import { showAlert } from "../../Scripts/Alert";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../Scripts/emailValidation";
import CloudinaryInital from "../../Components/CloudinaryInitial";
import {
  IsImageUrlSuccess,
  IsImagePublicIdSuccess,
  IsCloudinaryFailure
} from "../../Redux/cloudinarySlice";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ErrorAlert from "../../Components/ErrorAlert";
import ProgressLoad from "../../Components/ProgressLoad";
import MainNav from "../../Navbar/MainNav";
import { IsAdminProfileFailure } from "../../Redux/adminProfileSlice";
import LocationInput from "../../Components/LocationInput";
import { MuiTelInput } from "mui-tel-input";
import { isValidPhoneNumber } from "libphonenumber-js";

function AdminProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [load, setLoad] = useState(false);
  const [savebtnError, setSavebtnError] = useState(null);
  const [submitbtnError, setSubmitbtnError] = useState(null);


  // cloudinary
  const ImageUrl = useSelector((state) => state.cloudinary.ImageUrl);
  const ImagePublicId = useSelector((state) => state.cloudinary.ImagePublicId);

  const ProfileImageObj = {
    url: ImageUrl,
    public_id: ImagePublicId,
  };

  // Save btn
  const handleSave = (e) => {
    e.preventDefault();

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
      country.trim() === ""
    ) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Form Save!",
        id: Date.now(),
      });
      return;
    }

    if (!isValidEmail(email)) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Email!",
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

    if (!profileImage) {
      setLoad(false);
      setSavebtnError({
        msg: "Profile Photo Required!",
        id: Date.now(),
      });
      return;
    }
    setLoad(true);
  };

  // Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/admin/profilePost",
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
        },
        {
          withCredentials: true,
        },
      );
      if (response) {
        showAlert("Success", response.data.msg, "success");
        setLoad(false);
        dispatch(IsImageUrlSuccess(null));
        dispatch(IsImagePublicIdSuccess(null));
        dispatch(IsCloudinaryFailure(null));
        dispatch(IsAdminProfileFailure(null));
        return navigate("/adminProfile");
      }
    } catch (err) {
      setLoad(false);
      setSubmitbtnError({
        msg: err.status === 409 ? "Profile Already Exist" : err.message,
        id: Date.now(),
      });
    }
  };


  return (
   <>
  {load && profileImage ? (
    <CloudinaryInital file={profileImage} fileType={"image"} load={load} />
  ) : null}

  <MainNav />

  <div className="profile-setting-wrapper">
    <div className="profile-card">

      <div className="profile-header">
        <h2>Admin Profile</h2>
        <p>Manage your professional information</p>
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

          <TextField required fullWidth label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />

          <TextField required fullWidth label="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />

          <TextField fullWidth label="Bio" value={bio} onChange={(e)=>setBio(e.target.value)} />

          <TextField fullWidth multiline label="About" value={about} onChange={(e)=>setAbout(e.target.value)} />

          <TextField required fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <MuiTelInput
            fullWidth
              label="Phone Number"
  required
            defaultCountry="IN"
            value={phone}
            onChange={(val)=>setPhone(val)}
            error={phone ? !isValidPhoneNumber(phone) : false}
            helperText={phone && !isValidPhoneNumber(phone) ? "Invalid phone" : ""}
          />

          <TextField
            fullWidth
              required
            type="number"
            label="Age"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
          />

          <FormControl   required fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              onChange={(e)=>setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
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

        </div>


        <div className="action-section">

          {load && !ImageUrl ? (
            <div className="mt-4 d-flex justify-content-center">
              <ProgressLoad setSize={`20px`} trigger={1} msg={`Loading`} />
            </div>
          ) : null}

          {!load && !ImageUrl ? (
            <ErrorAlert
              alertMsg={savebtnError}
              buttonName="Save"
              buttonClass={`mt-3`}
              buttonVariant="outlined"
              handlefn={handleSave}
            />
          ) : 
          load && ImageUrl ?
          (
            <ErrorAlert
              alertMsg={submitbtnError}
              buttonName="Submit"
              buttonVariant="contained"
              handlefn={handleSubmit}
            />
          ) : null}

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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.location-section {
  margin-top: 20px;
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
export default AdminProfileForm;
