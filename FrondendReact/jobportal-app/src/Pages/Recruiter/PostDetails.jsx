import { recruiterPostsThunk } from "../../Thunks/recruiterPostsThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainNav from "../../Navbar/MainNav";
import { timeAgo } from "../../Components/timeago";
import DialogboxRecruiterPost from "../../DialogBoxes/RecruiterPost/DialogboxRecruiterPost";
function PostDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recruiterPostsThunk());
  }, [dispatch]);

  const Posts = useSelector((state) => state.recruiterPosts.Posts);

  const Post = Posts?.find((post) => post._id === id);

  return (
    <div>
      <MainNav />
      <br /><br /><br />

      <div className="job-desc-container page-bg">

        <div className="job-desc-card">

          {/* Image */}
          <div className="job-desc-image-box">
            <img
              src={Post?.profileImage?.url}
              alt="job"
              className="job-desc-image"
            />
          </div>

          {/* Details */}
          <div className="job-desc-details">

            <h2 className="job-title gradient-text pb-2">
              {Post?.jobTitle}
            </h2>

            <p className="job-company">
              {Post?.companyName}
            </p>

            {/* Meta grid */}
            <div className="job-meta-grid">

              <div>
                <span className="meta-label">Location</span>
                <span className="meta-value">
                  {Post?.jobLocation}
                </span>
              </div>

              <div>
                <span className="meta-label">Type</span>
                <span className="meta-value">
                  {Post?.jobType}
                </span>
              </div>

              <div>
                <span className="meta-label">Experience</span>
                <span className="meta-value">
                  {Post?.experience}
                </span>
              </div>

              <div>
                <span className="meta-label">Salary</span>
                <span className="meta-value salary">
                  {Post?.salary}
                </span>
              </div>

              <div>
                <span className="meta-label">Posted</span>
                <span className="meta-value">
                  {timeAgo(Post?.updatedAt)}
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
              <p 
              >{Post?.jobDescription}</p>
            </div>

            <div>   
              <h5>Post Status:
                 <span 
                 className={`text-light rounded-5 px-3 p-1 mx-2 text-center align-items-center ${Post?.status === "approved" ? "bg-success" : Post?.status === "rejected" ? "bg-danger" : "bg-warning"}`}
              >{Post?.status}</span></h5>     
            </div>

            {/* Actions */}
            <div className="job-actions mt-4">

              <DialogboxRecruiterPost postId={Post?._id} />

            </div>

          </div>

        </div>

      </div>

      {/* SAME CSS */}
      <style>{`
    
.page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
}

.job-desc-container{
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 15px;
}

.job-desc-card{
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 30px;
  transition: 0.3s;
}

.job-desc-card:hover{
  box-shadow: 0 8px 30px rgba(0,0,0,0.10);
}

.gradient-text{
  background: linear-gradient(90deg,#00c6ff,#0072ff);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.job-desc-image-box{
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.job-desc-image{
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid #eee;
}

.job-title{
  font-weight: 700;
  font-size: 26px;
}

.job-company{
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.job-meta-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
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

.skills-section{
  margin-bottom: 25px;
}

.skills-container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-chip{
  background: linear-gradient(135deg,#007bff,#00c6ff);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
}

.job-description{
  margin-bottom: 25px;
}

.job-description p{
  color: #555;
  line-height: 1.6;
}

.job-actions{
  display: flex;
  justify-content: flex-end;
}

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

export default PostDetails;