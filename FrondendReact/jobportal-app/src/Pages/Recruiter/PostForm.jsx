import { useEffect, useState } from "react";
import api from "../../api/axios";
import { showAlert } from "../../Scripts/Alert";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import CloudinaryInital from "../../Components/CloudinaryInitial";
import {
  IsImageUrlSuccess,
  IsImagePublicIdSuccess,
  IsCloudinaryFailure,
} from "../../Redux/cloudinarySlice";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ErrorAlert from "../../Components/ErrorAlert";
import ProgressLoad from "../../Components/ProgressLoad";
import MainNav from "../../Navbar/MainNav";


function PostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobPlatform,setJobPlatform] = useState("")
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [storeSkills, setStoreSkills] = useState([]);
  const [load, setLoad] = useState(false);
  const [savebtnError, setSavebtnError] = useState(null);
  const [addSkillbtnError, setAddSkillbtnError] = useState(null);
  const [submitbtnError, setSubmitbtnError] = useState(null);

  // cloudinary
  const ImageUrl = useSelector((state) => state.cloudinary.ImageUrl);
  const ImagePublicId = useSelector((state) => state.cloudinary.ImagePublicId);
  const FileError = useSelector((state) => state.cloudinary.error)


  useEffect(() => {
    if(FileError){
        setLoad(false)
    }
  },[FileError])

  const ProfileImageObj = {
    url: ImageUrl,
    public_id: ImagePublicId,
  };

  // handle Add Skill
  const handleAddSkills = (e) => {
    e.preventDefault();
    if (skills.trim() === "") {
      setLoad(false);
      setAddSkillbtnError({
        msg: "Invalid Skill Add!",
        id: Date.now(),
      });
      return;
    }
    setStoreSkills([...storeSkills, skills]);
    setSkills("");
  };

  // handle Delete Skill
  const handleDeleteSkill = (index) => {
    const newStoreSkills = storeSkills.filter((_, i) => i !== index);
    setStoreSkills(newStoreSkills);
  };

  // Save btn
  const handleSave = (e) => {
    e.preventDefault();

    if (
      jobTitle.trim() === "" ||
      companyName.trim() === "" ||
      jobLocation.trim() === "" ||
      jobType.trim() === "" ||
      jobPlatform.trim() === "" ||
      experience.trim() === "" ||
      salary.trim() === "" ||
      storeSkills?.length === 0 ||
      jobDescription.trim() === ""
    ) {
      setLoad(false);
      setSavebtnError({
        msg: "Invalid Form Save!",
        id: Date.now(),
      });
      return;
    }

    if(!profileImage){
        setLoad(false)
        setSavebtnError({
            msg : 'Company Image Required',
            id : Date.now()
        })
        return
    }

    setLoad(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/Jobs/recruiter/Post",
        {
          profileImage: ProfileImageObj,
          postId: "post_" + crypto.randomUUID(),
          jobTitle: jobTitle,
          companyName: companyName,
          jobLocation: jobLocation,
          jobType: jobType,
          jobPlatform : jobPlatform,
          experience:experience,
          salary: salary,
          skills: storeSkills,
          jobDescription: jobDescription,
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
        setJobTitle("");
        setCompanyName("");
        setJobLocation("");
        setJobType("");
        setJobPlatform("")
        setExperience("");
        setSalary("");
        setStoreSkills(null);
        setJobDescription("");
        setSubmitbtnError(null);
        return navigate("/viewPosts");
      }
    } catch (err) {
      setLoad(false);
      setSubmitbtnError({
        msg: err.response?.data?.msg,
        id: Date.now(),
      });
    }
  };

    const jobFields = [
  "Information Technology",
  "Software Development",
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cyber Security",
  "Cloud Computing",
  "DevOps",
  "Networking",
  "Embedded Systems",
  "Electronics",
  "Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Automobile Engineering",
  "Aerospace Engineering",
  "Robotics",
  "Manufacturing",
  "Quality Assurance",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Content Writing",
  "Human Resources",
  "Recruitment",
  "Sales",
  "Marketing",
  "Customer Support",
  "Technical Support",
  "Business Development",
  "Finance",
  "Accounting",
  "Banking",
  "Insurance",
  "Healthcare",
  "Pharmacy",
  "Biotechnology",
  "Education",
  "Teaching",
  "Research",
  "Logistics",
  "Supply Chain Management",
  "Operations",
  "Administration",
  "Hospitality",
  "Construction",
  "Government Services"
];

  const Nums = [];

  for (let i = 1; i < 50; i++) {
    Nums.push(i);
  }

  return (
<>
  {load && profileImage ? (
    <CloudinaryInital file={profileImage} fileType={"image"} load={load} />
  ) : null}

  <MainNav />

  <div className="post-wrapper">
    <div className="post-card">

      <div className="post-header">
        <h2>Post Job</h2>
        <p>Enter job details clearly</p>
      </div>

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

      {/* Form Grid */}
      <div className="form-grid">

        <TextField required fullWidth label="Job Title" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} />

        <TextField required fullWidth label="Company Name" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} />

        <TextField required fullWidth label="Job Location" value={jobLocation} onChange={(e)=>setJobLocation(e.target.value)} />

        <FormControl fullWidth required>
          <InputLabel>Job Type</InputLabel>
          <Select value={jobType} label="Job Type" onChange={(e)=>setJobType(e.target.value)}>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Job Field</InputLabel>
          <Select value={jobPlatform} label="Job Field" onChange={(e)=>setJobPlatform(e.target.value)}>
            {jobFields.map((f)=>(
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Experience</InputLabel>
          <Select value={experience} label="Experience" onChange={(e)=>setExperience(e.target.value)}>
            <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
            {Nums.map((n)=>(
              <MenuItem key={n} value={`${n} years`}>{`${n} years`}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Salary (LPA)</InputLabel>
          <Select value={salary} label="Salary" onChange={(e)=>setSalary(e.target.value)}>
            {Nums.map((n)=>(
              <MenuItem key={n} value={`${n} LPA`}>{`${n} LPA`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Skills Section */}
      <div className="skills-section card p-3">
        <TextField
          fullWidth
          required
          label="Add Skill"
          value={skills}
          onChange={(e)=>setSkills(e.target.value)}
        />

        <div className="add-btn">
          <ErrorAlert
            buttonVariant="contained"
            buttonName="Add"
            buttonClass={`mt-3`}
            handlefn={handleAddSkills}
            alertMsg={addSkillbtnError}
          />
        </div>

        <div className="skills-list ">
          {storeSkills?.length === 0 && <p>No skills added</p>}

          {storeSkills?.map((skill,index)=>(
            <span key={index} className="skill-chip">
              {skill}
              <FontAwesomeIcon
                icon={faDeleteLeft}
                onClick={()=>handleDeleteSkill(index)}
              />
            </span>
          ))}
        </div>

      </div>

      {/* Description */}
      <div className="description-section">
        <TextField
        required
          fullWidth
          multiline
          minRows={4}
          label="Job Description"
          value={jobDescription}
          onChange={(e)=>setJobDescription(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="action-section">

        {load && !ImageUrl && (
          <div className="d-flex justify-content-center">
            <ProgressLoad trigger={1} msg="Uploading..." setSize="20px" />
          </div>
        )}

        {!load && !ImageUrl && (
          <ErrorAlert
            alertMsg={savebtnError}
            buttonName="Save"
            buttonClass={`mt-3`}
            buttonVariant="outlined"
            handlefn={handleSave}
          />
        )}

        {load && ImageUrl && (
          <ErrorAlert
            alertMsg={submitbtnError}
            buttonName="Submit"
            buttonVariant="contained"
            handlefn={handleSubmit}
          />
        )}

      </div>

    </div>
  </div>
  <style>{`

.post-wrapper {
  padding: 120px 20px 40px;
  display: flex;
  justify-content: center;
  background: #f4f6fb;
  min-height: 100vh;
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
.post-card {
  width: 100%;
  max-width: 1000px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.post-header {
  text-align: center;
  margin-bottom: 30px;
}

.image-section {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.image-preview {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.upload-btn {
  position: absolute;
  bottom: 8px;
  right: 42%;
  background: #2c5364;
  color: #fff;
  padding: 8px 10px;
  border-radius: 50%;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 24px;
}

.skills-section {
  margin-top: 30px;
}

.skills-list {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-chip {
  background: #e3f2fd;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.description-section {
  margin-top: 30px;
}


.profile-preview {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.action-section {
  margin-top: 40px;
  text-align: center;
}

@media (max-width: 768px) {

  .form-grid {
    grid-template-columns: 1fr;
  }

  .post-card {
    padding: 25px;
  }

  .upload-btn {
    right: 38%;
  }

}

`}</style>
</>
  );
}
export default PostForm;
