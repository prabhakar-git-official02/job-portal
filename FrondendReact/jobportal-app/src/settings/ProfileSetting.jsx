import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showAlert } from "../Scripts/Alert";
import { useNavigate } from "react-router-dom";
import { jobseekerProfileUpdateThunk } from "../Thunks/jobseekerProfileThunk";
import {
  IsImageUrlSuccess,
  IsImagePublicIdSuccess,
  IsResumeUrlSuccess,
  IsResumePublicIdSuccess,
  IsCloudinaryFailure,
} from "../Redux/cloudinarySlice";
import { authThunk } from "../Thunks/authThunk";
import { jobseekerProfileThunk } from "../Thunks/jobseekerProfileThunk";
import {
  recruiterProfileThunk,
  recruiterProfileUpdateThunk,
} from "../Thunks/recruiterProfileThunk";
import {
  adminProfileThunk,
  adminProfileUpdateThunk,
} from "../Thunks/adminProfileThunk";
import TextField from "@mui/material/TextField";
import InputFileUpload from "../Components/InputFileUpload";
import ProgressLoad from "../Components/ProgressLoad";
import { isValidEmail } from "../Scripts/emailValidation";
import ErrorAlert from "../Components/ErrorAlert";
import { MuiTelInput } from "mui-tel-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import LocationInput from "../Components/LocationInput";
import Cloudinary from "../Components/Cloudinary";

function ProfileSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  useEffect(() => {
    if (user?.roleData === "admin") {
      dispatch(adminProfileThunk());
    } else if (user?.roleData === "recruiter") {
      dispatch(recruiterProfileThunk());
    } else if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
    }
  }, [user, dispatch, navigate]);

  const JobseekerProfile = useSelector(
    (state) => state.jobseekerProfile.profile,
  );

  const RecruiterProfile = useSelector(
    (state) => state.recruiterProfile.profile,
  );

  const AdminProfile = useSelector((state) => state.adminProfile.profile);

  const Profile =
    user?.roleData === "admin"
      ? AdminProfile
      : user?.roleData === "recruiter"
        ? RecruiterProfile
        : user?.roleData === "user"
          ? JobseekerProfile
          : null;

  console.log(Profile);

  const ImageUrl = useSelector((state) => state.cloudinary.ImageUrl);
  const ImagePublicId = useSelector((state) => state.cloudinary.ImagePublicId);
  const ResumeUrl = useSelector((state) => state.cloudinary.ResumeUrl);
  const ResumePublicId = useSelector(
    (state) => state.cloudinary.ResumePublicId,
  );

  const UploadError = useSelector((state) => state.cloudinary.error);

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(
    Profile?.profileImage?.url,
  );
  const [firstName, setFirstName] = useState(Profile?.firstName);
  const [lastName, setLastName] = useState(Profile?.lastName);
  const [email, setEmail] = useState(Profile?.email);
  const [phone, setPhone] = useState(Profile?.phone);
  const [gender, setGender] = useState(Profile?.gender);
  const [age, setAge] = useState(Profile?.age);
  const [location, setLocation] = useState(Profile?.location);
  const [state, setState] = useState(Profile?.state);
  const [country, setCountry] = useState(Profile?.country);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(Profile?.resume?.url);
  const [load, setLoad] = useState(false);
  const [savebtnError, setSavebtnError] = useState(null);
  const [updateLoading,setUpdateLoading] = useState(false)


  const UpdateDatas =
    user?.roleData === "user"
      ? {
          profileImage: {
            url: ImageUrl || Profile?.profileImage?.url,
            public_id: ImagePublicId || Profile?.profileImage?.public_id,
          },
          firstName: firstName || Profile?.firstName,
          lastName: lastName || Profile?.lastName,
          email: email || Profile?.email,
          phone: phone || Profile?.phone,
          age: age || Profile?.age,
          gender: gender || Profile?.gender,
          location: location || Profile?.location,
          state: state || Profile?.state,
          country: country || Profile?.country,
          resume: {
            url: ResumeUrl || Profile?.resume?.url,
            public_id: ResumePublicId || Profile?.resume?.public_id,
          },
        }
      : {
          profileImage: {
            url: ImageUrl || Profile?.profileImage?.url,
            public_id: ImagePublicId || Profile?.profileImage?.public_id,
          },
          firstName: firstName || Profile?.firstName,
          lastName: lastName || Profile?.lastName,
          email: email || Profile?.email,
          phone: phone || Profile?.phone,
          age: age || Profile?.age,
          gender: gender || Profile?.gender,
          location: location || Profile?.location,
          state: state || Profile?.state,
          country: country || Profile?.country,
        };

  useEffect(() => {
    if (UploadError) {
      setLoad(false);
    }
  }, [UploadError]);

  const handleSave = () => {
    try{
    if (
      !firstName ||
      firstName.trim() === "" ||
      !lastName ||
      lastName.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !phone ||
      phone.trim() === "" ||
      phone <= 0 ||
      !age ||
      age.trim() === "" ||
      age <= 0 ||
      !gender ||
      gender.trim() === "" ||
      !location ||
      location.trim() === "" ||
      !state ||
      state.trim() === "" ||
      !country ||
      country.trim() === ""
    ) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Form Update!",
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

    setLoad(true);
  }catch(err){
    console.log("Settings/ProfileSetting-handleSave-Err",err?.message)
  }
  };

  const handleSubmit = async () => {
    try{
    setUpdateLoading(true)
    if (
      !firstName ||
      firstName.trim() === "" ||
      !lastName ||
      lastName.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !phone ||
      phone.trim() === "" ||
      phone <= 0 ||
      !age ||
      age === "" ||
      age <= 0 ||
      !gender ||
      gender.trim() === "" ||
      !location ||
      location.trim() === "" ||
      !state ||
      state.trim() === "" ||
      !country ||
      country.trim() === ""
    ) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Form Update!",
        id: Date.now(),
      });
      setUpdateLoading(false)
      return;
    }

    if (!isValidEmail(email)) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Email!",
        id: Date.now(),
      });
      setUpdateLoading(false)
      return;
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Phone Number!",
        id: Date.now(),
      });
      setUpdateLoading(false)
      return;
    }

    user?.roleData === "user"
      ? dispatch(jobseekerProfileUpdateThunk(UpdateDatas))
          .then(() => {
            showAlert("Success", "Profile Updated", "success");
          })
          .then(() => setUpdateLoading(false))
          .then(() => {
            setLoad(false);
          })
          .then(() => {
            setProfileImage(null);
          })
          .then(() => {
            dispatch(IsImageUrlSuccess(null));
          })
          .then(() => {
            dispatch(IsImagePublicIdSuccess(null));
          })
          .then(() => {
            dispatch(IsCloudinaryFailure(null));
          })
          .then(() => {
            setProfileImage(Profile?.profileImage?.url);
          })
          .then(() => {
            setFirstName(Profile?.firstName);
          })
          .then(() => {
            setLastName(Profile?.lastName);
          })
          .then(() => {
            setEmail(Profile?.email);
          })
          .then(() => {
            setPhone(Profile?.phone);
          })
          .then(() => {
            setAge(Profile?.age);
          })
          .then(() => {
            setGender(Profile?.gender);
          })
          .then(() => {
            setLocation(Profile?.location);
          })
          .then(() => {
            setState(Profile?.state);
          })
          .then(() => {
            setCountry(Profile?.country);
          })
          .then(() => {
            dispatch(IsResumeUrlSuccess(null));
          })
          .then(() => {
            dispatch(IsResumePublicIdSuccess(null));
          })
          .then(() => {
            setResume(Profile?.resume?.url);
          })
          .then(() => {
            navigate("/jobseekerProfile");
          })
      : user?.roleData === "recruiter"
        ? dispatch(recruiterProfileUpdateThunk(UpdateDatas))
            .then(() => {
              showAlert("Success", "Profile Updated", "success");
            })
            .then(() => {
              setLoad(false);
            })
            .then(() => setUpdateLoading(false))
            .then(() => {
              setProfileImage(null);
            })
            .then(() => {
              dispatch(IsImageUrlSuccess(null));
            })
            .then(() => {
              dispatch(IsImagePublicIdSuccess(null));
            })
            .then(() => {
              dispatch(IsCloudinaryFailure(null));
            })
            .then(() => {
              setProfileImage(Profile?.profileImage?.url);
            })
            .then(() => {
              setFirstName(Profile?.firstName);
            })
            .then(() => {
              setLastName(Profile?.lastName);
            })
            .then(() => {
              setEmail(Profile?.email);
            })
            .then(() => {
              setPhone(Profile?.phone);
            })
            .then(() => {
              setAge(Profile?.age);
            })
            .then(() => {
              setGender(Profile?.gender);
            })
            .then(() => {
              setLocation(Profile?.location);
            })
            .then(() => {
              setState(Profile?.state);
            })
            .then(() => {
              setCountry(Profile?.country);
            })
            .then(() => {
              navigate("/recruiterProfile");
            })
        : user?.roleData === "admin"
          ? dispatch(adminProfileUpdateThunk(UpdateDatas))
              .then(() => {
                showAlert("Success", "Profile Updated", "success");
              })
              .then(() => {
                setLoad(false);
              })
              .then(() => setUpdateLoading(false))
              .then(() => {
                setProfileImage(null);
              })
              .then(() => {
                dispatch(IsImageUrlSuccess(null));
              })
              .then(() => {
                dispatch(IsImagePublicIdSuccess(null));
              })
              .then(() => {
                dispatch(IsCloudinaryFailure(null));
              })
              .then(() => {
                setProfileImage(Profile?.profileImage?.url);
              })
              .then(() => {
                setFirstName(Profile?.firstName);
              })
              .then(() => {
                setLastName(Profile?.lastName);
              })
              .then(() => {
                setEmail(Profile?.email);
              })
              .then(() => {
                setPhone(Profile?.phone);
              })
              .then(() => {
                setAge(Profile?.age);
              })
              .then(() => {
                setGender(Profile?.gender);
              })
              .then(() => {
                setLocation(Profile?.location);
              })
              .then(() => {
                setState(Profile?.state);
              })
              .then(() => {
                setCountry(Profile?.country);
              })
              .then(() => {
                navigate("/adminProfile");
              })
          : navigate("/pageNotFound");
            }catch(err){
              console.log("Settings/ProfileSetting-handlesubmit-Err",err?.message)
            }
  };

  useEffect(() => {
    if (UploadError) {
      return setLoad(false);
    }
  }, [UploadError]);

  return (
    <>
    {load ?                       <Cloudinary
                        file={profileImage}
                        fileType="image"
                        model={
                          user?.roleData === "user" ? "jobseekerProfile" :
                          user?.roleData === "recruiter" ? "recruiterProfile" :
                          user?.roleData === "admin" ? "adminProfile" : null
                        }
                        id={Profile?._id}
                        field="image"
                        existingFile={Profile?.profileImage}
                      /> : null}
      <div className="">
        <div className="profile-header">
          <h2>Profile Settings</h2>
          <p>Update your personal information</p>
        </div>

        <div className="profile-body">
          {/* Profile Image Section */}
          <div className="image-section">
            <img
              src={
                profileImagePreview
                  ? profileImagePreview
                  : Profile?.profileImage?.url
                    ? Profile?.profileImage?.url
                    : "default-profile.jpg"
              }
              alt="Preview"
              className="profile-preview"
            />

            {!load && !ImageUrl && (
              <>
                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProfileImage(file);
                    setProfileImagePreview(URL.createObjectURL(file));
                  }}
                />
                <div>
                  <label className="change-btn" htmlFor="profileUpload">
                    Change Profile
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Form Grid */}
          <div className="form-grid p-3">
            <TextField
              sx={{ m: 1 }}
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MuiTelInput
              sx={{ m: 1 }}
              value={phone}
              fullWidth
              defaultCountry="IN"
              onChange={(newValue) => setPhone(newValue)}
              error={phone ? !isValidPhoneNumber(phone) : false}
              helperText={
                phone && !isValidPhoneNumber(phone)
                  ? "Invalid phone number"
                  : ""
              }
            />
            <TextField
              sx={{ m: 1 }}
              fullWidth
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              fullWidth
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <LocationInput
              country={country}
              setCountry={setCountry}
              state={state}
              setState={setState}
              location={location}
              setLocation={setLocation}
            />
          </div>

          {/* Resume Section */}
          {user?.roleData === "user" && (
            <div className="resume-section">
              <InputFileUpload
                name={resume ? "Change Resume" : "Upload Resume"}
                setdata={setResume}
                setPreview={setResumePreview}
              />

              {resumePreview ? (
                <Button
                  variant="outlined"
                  onClick={() => window.open(resumePreview, "_blank")}
                >
                  View Resume
                </Button>
              ) : (
                <span className="no-resume">Resume Not Uploaded</span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="action-section">
            {load && profileImage && !ImageUrl  ? (
              <div className="d-flex justify-content-center">
                {" "}
                <ProgressLoad trigger={1} setSize={`20px`} msg={`Loading`} />
              </div>
            ) : null}
            {!load  ? (
              <ErrorAlert
                buttonName={`Save`}
                buttonVariant={`outlined`}
                buttonClass={`mt-2`}
                handlefn={handleSave}
                alertMsg={savebtnError}
              />
            ) : (
              <div>
                {updateLoading ?                 <div className="d-flex justify-content-center">
                <ProgressLoad trigger={1} setSize={`20px`} msg={`Loading`} />
              </div> : null}
              <Button
               variant="contained"
                onClick={handleSubmit}
                className="mt-2"
                >
                Update
              </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
      .profile-setting-wrapper {
        padding: 40px 20px;
        display: flex;
        justify-content: center;
      }

      .profile-card {
        width: 100%;
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
        margin-bottom: 5px;
        font-weight: 600;
      }

      .profile-header p {
        color: #777;
        font-size: 14px;
      }

      .image-section {
        text-align: center;
        margin-bottom: 30px;
      }

      .profile-preview {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #2c5364;
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
        opacity: 0.8;
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 20px;
      }

      .resume-section {
        margin-top: 30px;
        display: flex;
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

      /* Responsive */
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

export default ProfileSetting;
