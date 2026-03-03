import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authThunk } from "../../Thunks/authThunk";
import { jobseekerProfileThunk } from "../../Thunks/jobseekerProfileThunk";
import { showAlert } from "../../Scripts/Alert";
import { jobseekerProfileExpDeleteIndexThunk } from "../../Thunks/jobseekerProfileThunk";
import { jobseekerProfileEduDeleteIndexThunk } from "../../Thunks/jobseekerProfileThunk";
import { useNavigate } from "react-router-dom";
import MainNav from "../../Navbar/MainNav";
import DialogboxEducationNew from "../../DialogBoxes/JobseekerProfile/DialogboxEducationNew";
import DialogboxEducationOld from "../../DialogBoxes/JobseekerProfile/DialogboxEducationOldUpdate";
import DialogboxExperienceNew from "../../DialogBoxes/JobseekerProfile/DialogboxExperienceNew";
import DialogboxExperienceOld from "../../DialogBoxes/JobseekerProfile/DialogboxExperienceOld";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogboxSkill from '../../DialogBoxes/JobseekerProfile/DialogboxSkill'
import DialogboxAbout from "../../DialogBoxes/JobseekerProfile/DialogboxAbout";


function JobseekerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.jobseekerProfile.profile);
  const error = useSelector((state) => state.jobseekerProfile.error);

  useEffect(() => {
    if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.roleData === "user" && error === "Profile Not Found") {
      showAlert("Error", "Profile not Found!", "error");
      navigate("/jobseekerProfileForm");
    }
  }, [error, navigate, user]);

  const handleExpDelete = (index) => {
    dispatch(jobseekerProfileExpDeleteIndexThunk(index));
  };

  const handleEduDelete = (index) => {
    dispatch(jobseekerProfileEduDeleteIndexThunk(index));
  };

  return (
    <>
      <MainNav />
      <br /><br /><br />
      <div className="profile-wrapper">

        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={
                profile?.profileImage?.url
                  ? profile?.profileImage?.url
                  : "default-profile.jpg"
              }
              alt="profile"
              className="profile-image"
            />
          </div>

          <div className="profile-top-info">
            <h3>{profile?.firstName} {profile?.lastName}</h3>
            <p>{profile?.bio || "Professional Job Seeker"}</p>
            <h5>{user?.roleData.toUpperCase()}</h5>
          </div>
        </div>

        <div className="profile-content">

          {/* BASIC INFO */}
          <div className="section-card">
            <div className="section-title">Basic Information</div>
            <div className="basic-grid">
              <div className="basic-item"><span>Email</span>{profile?.email}</div>
              <div className="basic-item"><span>Phone</span>{profile?.phone}</div>
              <div className="basic-item"><span>Age</span>{profile?.age}</div>
              <div className="basic-item"><span>Gender</span>{profile?.gender}</div>
              <div className="basic-item"><span>Country</span>{profile?.country}</div>
              <div className="basic-item"><span>State</span>{profile?.state}</div>
              <div className="basic-item"><span>City</span>{profile?.location}</div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="section-card">
            <div className="section-title">About</div>
            <p>{profile?.about || "No About Added"}</p>
            <div>
             <DialogboxAbout/>
            </div>
          </div>

          {/* SKILLS */}
          <div className="section-card">
            <div className="section-title">Skills</div>
            <div className="skill-container">
              {profile?.skills?.map((s, i) => (
                <span className="skill" key={i}>{s}</span>
              ))}
            </div>
            <div className="mt-4">
              <DialogboxSkill/>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="section-card">
            <div className="section-title">Education</div>
            {profile?.education?.map((ed, index) => (
              <div className="inner-card" key={ed?._id}>
                <h6>{ed?.qualification}</h6>
                <p><strong>Institute:</strong> {ed?.institute}</p>
                <p>
                  <strong>Years:</strong>{" "}
                  {new Date(ed?.yearStart).getFullYear()} -
                  {ed?.yearEnd
                    ? new Date(ed.yearEnd).getFullYear()
                    : "Present"}
                </p>
                <div className="d-flex mt-3">
                  <span className="flex-grow-1">
                  <DialogboxEducationOld
                    index={index}
                    EdId={ed?._id}
                    JsId={profile?._id}
                  />
                  </span>
                  <span style={{cursor : `pointer`}} onClick={() => handleEduDelete(index)}>
                    <DeleteIcon/>
                  </span>
                </div>
              </div>
            ))}
            <DialogboxEducationNew />
          </div>

          {/* EXPERIENCE */}
          <div className="section-card">
            <div className="section-title">Experience</div>
            {profile?.experience?.map((ex, index) => (
              <div className="inner-card" key={ex?._id}>
                <h6>{ex?.company}</h6>
                <p><strong>Field:</strong> {ex?.field}</p>
                <p>
                  <strong>Years:</strong>{" "}
                  {new Date(ex?.yearStart).getFullYear()} -
                  {ex?.yearEnd
                    ? new Date(ex.yearEnd).getFullYear()
                    : "Present"}
                </p>
                <p><strong>CTC:</strong> {ex?.CTC}</p>
                <p><strong>Work:</strong> {ex?.workExperience}</p>
                <div className="d-flex mt-3">
                  <span className="flex-grow-1">
                    <DialogboxExperienceOld
                    index={index}
                    ExId={ex?._id}
                    JsId={profile?._id}
                    />
                  </span>
                  <span style={{cursor : `pointer`}} onClick={() => handleExpDelete(index)}>
                    <DeleteIcon/>
                  </span>
                </div>
              </div>
            ))}
            <DialogboxExperienceNew />
          </div>

        </div>
      </div>

     <style>{`

*{
  box-sizing:border-box;
}

body{
  margin:0;
  padding:0;
  background:#f4f6f9;
  font-family: 'Segoe UI', sans-serif;
}

.profile-wrapper{
  width:100%;
  padding:20px;
}

/* ================= HEADER ================= */

.profile-header{
  background:linear-gradient(135deg,#1e3c72,#2a5298);
  border-radius:20px;
  padding:30px 20px 80px 20px;
  position:relative;
  text-align:center;
  color:white;
}

/* Profile Image */
.profile-image-container{
  position:absolute;
  left:50%;
  bottom:-60px;
  transform:translateX(-50%);
}

.profile-image{
  width:120px;
  height:120px;
  border-radius:50%;
  border:5px solid white;
  object-fit:cover;
  box-shadow:0 8px 25px rgba(0,0,0,0.2);
}

.profile-top-info{
  margin-top:10px;
}

.profile-top-info h3{
  margin:0;
  font-weight:600;
}

.profile-top-info p{
  margin:5px 0 0 0;
  font-size:14px;
  opacity:0.9;
}

/* ================= CONTENT ================= */

.profile-content{
  margin-top:80px;
}

/* Card */
.section-card{
  background:white;
  padding:20px;
  border-radius:16px;
  margin-bottom:20px;
  box-shadow:0 8px 25px rgba(0,0,0,0.05);
}

.section-title{
  font-size:17px;
  font-weight:600;
  margin-bottom:15px;
  color:#1e3c72;
}

/* ================= BASIC GRID ================= */

.basic-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
}

.basic-item{
  background:#f9fafc;
  padding:12px;
  border-radius:10px;
  font-size:14px;
}

.basic-item span{
  display:block;
  font-weight:600;
  color:#2a5298;
}

/* ================= SKILLS ================= */

.skill-container{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}

.skill{
  background:linear-gradient(90deg,#00c6ff,#0072ff);
  color:white;
  padding:5px 12px;
  border-radius:20px;
  font-size:12px;
}

/* ================= INNER CARD ================= */

.inner-card{
  background:#f9fafc;
  padding:14px;
  border-radius:12px;
  margin-bottom:12px;
  border:1px solid #eee;
}

.inner-card h6{
  margin-bottom:6px;
  font-weight:600;
}

.inner-card p{
  font-size:13px;
  margin:3px 0;
  color:#555;
}

/* Buttons */
.delete-btn{
  margin-top:8px;
  background:linear-gradient(90deg,#f43f5e,#dc2626);
  color:white;
  border:none;
  padding:5px 10px;
  border-radius:6px;
  font-size:12px;
}

/* ================= DESKTOP BREAKPOINT ================= */

@media(min-width:768px){

  .profile-wrapper{
    padding:40px 60px;
  }

  .profile-header{
    text-align:left;
    padding:40px 60px 100px 60px;
  }

  .profile-image-container{
    left:60px;
    transform:none;
  }

  .profile-image{
    width:150px;
    height:150px;
  }

  .profile-top-info{
    margin-left:220px;
    margin-top:0;
  }

  .profile-content{
    margin-top:100px;
  }

  .basic-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(min-width:1024px){
  .basic-grid{
    grid-template-columns:repeat(3,1fr);
  }
}

`}</style>
     
    </>
  );
}

export default JobseekerProfile;