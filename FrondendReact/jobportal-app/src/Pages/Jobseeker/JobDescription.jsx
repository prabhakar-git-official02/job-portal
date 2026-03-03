import { allPostsThunk } from "../../Thunks/allPostsThunk";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainNav from "../../Navbar/MainNav";
import { savedJobsThunk } from "../../Thunks/savedJobsThunk";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { SavedJobsPostThunk } from "../../Thunks/savedJobsThunk";
import DialogboxApplyJob from "../../DialogBoxes/JobseekerProfile/DialogboxApplyJob";
import { applicantThunk } from "../../Thunks/applicantThunk";
import { authThunk } from "../../Thunks/authThunk";

function JobDescription() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk())
  },[dispatch])

  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch]);

  const Posts = useSelector((state) => state.allPosts.Posts);



  useEffect(() => {
    dispatch(savedJobsThunk());
  }, [dispatch, Posts]);

  useEffect(() => {
    dispatch(applicantThunk());
  }, [dispatch]);

  const Applied = useSelector((state) => state.applicantMemory.applicant);

   const Post = Posts.find((post) =>  post?._id=== id);

    console.log("Post", Post);
  console.log("Applied", Applied);

  const SavedJobs = useSelector((state) => state.savedJobs.SavedJobs);

  console.log(SavedJobs);

  const handleSave = (
    JobId,
    RecruiterId,
    PostId,
    JobTitle,
    CompanyName,
    JobLocation,
    JobType,
    Experiece,
    Salary,
    Skills,
    JobDescription,
    ProfileImage,
    UpdatedAt,
  ) => {
    const savedJob = {
      jobId: JobId,
      recruiterId: RecruiterId,
      postId: PostId,
      profileImage: ProfileImage,
      jobTitle: JobTitle,
      companyName: CompanyName,
      jobLocation: JobLocation,
      jobType: JobType,
      experience: Experiece,
      salary: Salary,
      skills: Skills,
      jobDescription: JobDescription,
      updatedAt: UpdatedAt,
    };

    if (savedJob) {
      dispatch(SavedJobsPostThunk(savedJob));
    }
  };

const MatchedJob = Applied?.populateData?.find((job) => job?.jobId?._id === Post?._id)

console.log("matched",MatchedJob)

  return (
<div>
  <MainNav/>
  <br /><br /><br />
  <div className="job-desc-container page-bg">

    <div className="job-desc-card d-flex align-items-center" >
<div>
      {/* Image */}
      <div className="job-desc-image-box " >
        <img
          alt="job"
          src={Post?.profileImage?.url}
          className="job-desc-image"
        />
      </div>

      {/* Details */}
      <div className="job-desc-details">

        <h2  className="job-title gradient-text pb-2">{Post?.jobTitle}</h2>

        <p className="job-company">{Post?.companyName}</p>

        <div className="job-meta-grid">

          <div>
            <span className="meta-label">Location</span>
            <span className="meta-value">{Post?.jobLocation}</span>
          </div>

          <div>
            <span className="meta-label">Type</span>
            <span className="meta-value">{Post?.jobType}</span>
          </div>

          <div>
            <span className="meta-label">Experience</span>
            <span className="meta-value">{Post?.experience}</span>
          </div>

          <div>
            <span className="meta-label">Salary</span>
            <span className="meta-value salary">
              {Post?.salary}
            </span>
          </div>

        </div>

        {/* Skills */}
        <div className="skills-section">

          <h5>Skills</h5>

          <div className="skills-container">
            {Post?.skills?.map((skill, index) => (
              <span key={index} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>

        </div>

        {/* Description */}
        <div className="job-description">
          <h5>Description</h5>
          <p>{Post?.jobDescription}</p>
          {MatchedJob ? 
          <p><strong>Application Status: <span
          className={`px-3 p-1 rounded-5 text-light fw-bold ${MatchedJob?.status === "shortlisted" ? "bg-success" : MatchedJob?.status === "rejected" ? "bg-danger" : "bg-warning"}`}
             >{MatchedJob?.status }</span></strong>
         <span
         className={`fw-bold text-light px-3 p-1 rounded-5 ${Post?.status === "shortlisted" ? "bg-success" : Post?.status === "rejected" ? "bg-danger" : "text-warning"}`}
         > {Post?.status}</span>
          </p> : null}
        </div>

        {/* Actions */}
        {user?.roleData === "user" &&
        <div className="job-actions">

          {Applied?.populateData?.some(
            (a) => Post?._id.includes(a?.jobId?._id)
          ) ? (
            <div>
            <span className="applied-text">
              Already Applied
            </span>
           
            </div>
          ) : (
            <DialogboxApplyJob btnName="Apply Now" JobId={Post?._id} />
          )}

          <span
            className="bookmark-btn"
            onClick={() =>
              handleSave(
                Post?._id,
                Post.recruiterId,
                Post?.postId,
                Post?.jobTitle,
                Post?.companyName,
                Post?.jobLocation,
                Post?.jobType,
                Post?.experience,
                Post?.salary,
                Post?.skills,
                Post?.jobDescription,
                Post?.profileImage,
                Post?.updatedAt,
              )
            }
          >

            {SavedJobs?.SavedList?.some(
              (job) => job?.jobId === Post?._id
            ) ? (
              <BookmarkAddedIcon className="saved-icon"/>
            ) : (
              <BookmarkSharpIcon className="save-icon"/>
            )}

          </span>
        </div>

        }
      </div>
    </div>
</div>
  </div>
  <style>{`

  .page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
}

  /* Page background */
.job-desc-page{
  min-height: 100vh;
}

.gradient-text{
background: linear-gradient(90deg,#00c6ff,#0072ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

/* Container */
.job-desc-container{

  width: 100%;

  min-height: calc(100vh - 80px);

  display: flex;

  justify-content: center;   /* horizontal center */

  align-items: flex-start;   /* top aligned (LinkedIn style) */

  padding: 40px 15px;

}


.job-desc-card{

  width: 100%;

  max-width: 900px;   /* IMPORTANT for center look */

  background: #fff;

  border-radius: 16px;

  box-shadow: 0 4px 20px rgba(0,0,0,0.06);

  padding: 30px;

}
  .job-desc-page .row{

  margin: 0;

}

.job-desc-card:hover{

  box-shadow:
  0 8px 30px rgba(0,0,0,0.10);

}


/* Image box */
.job-desc-image-box{

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 25px;

}


/* Image */
.job-desc-image{

  width: 140px;
  height: 140px;

  object-fit: cover;

  border-radius: 14px;

  border: 1px solid #eee;

}


/* Title */
.job-title{

  font-weight: 700;

  font-size: 26px;

  margin-bottom: 6px;

}


/* Company */
.job-company{

  font-size: 18px;

  color: #555;

  margin-bottom: 20px;

}


/* Meta grid */
.job-meta-grid{

  display: grid;

  grid-template-columns:
  repeat(auto-fit,minmax(180px,1fr));

  gap: 15px;

  margin-bottom: 25px;

}


.meta-label{

  display: block;

  font-size: 13px;

  color: #888;

}


.meta-value{

  font-size: 16px;

  font-weight: 600;

}


.salary{

  color: #00a65a;

}


/* Skills */
.skills-section{

  margin-bottom: 25px;

}


.skills-container{

  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: 10px;

}


/* Skill chip */
.skill-chip{

  background:
  linear-gradient(135deg,#007bff,#00c6ff);

  color: white;

  padding:
  6px 14px;

  border-radius: 20px;

  font-size: 13px;

}


/* Description */
.job-description{

  margin-bottom: 25px;

}


.job-description p{

  color: #555;

  line-height: 1.6;

}


/* Actions */
.job-actions{

  display: flex;

  align-items: center;

  gap: 20px;

  flex-wrap: wrap;

}


/* Applied text */
.applied-text{

  color: #00a65a;

  font-weight: 600;

}


/* Save icon */
.save-icon{

  font-size: 32px;

  color: #007bff;

  cursor: pointer;

  transition: 0.3s;

}


.save-icon:hover{

  transform: scale(1.15);

}


/* Saved icon */
.saved-icon{

  font-size: 32px;

  color: #ffc107;

  cursor: pointer;

}


/* Responsive */
@media(max-width:768px){

  .job-desc-card{

    padding: 20px;

  }

  .job-title{

    font-size: 22px;

  }

}


@media(max-width:480px){

  .job-desc-image{

    width: 100px;
    height: 100px;

  }

  .job-title{

    font-size: 20px;

  }

}
  
  `}</style>
</div>
  );
}

export default JobDescription;
