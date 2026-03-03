import { useParams } from "react-router-dom";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../Thunks/authThunk";
import { useEffect, useState } from "react";
import MainNav from "../../Navbar/MainNav";
import { timeAgo } from "../../Components/timeago";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ButtonUI from "../../Components/ButttonUI";
import { AppliedJobStatusUpdateThunk } from "../../Thunks/AppliedJobStatusUpdateThunk";

function Candidate() {
  const dispatch = useDispatch();

  const [seeJobDetails, setSeeJobDetails] = useState(false);
  const [caughtId, setCaughtId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(applicantGetAllThunk());
  }, [dispatch]);

  const Applicants = useSelector(
    (state) => state.allApplicants.All_Applicants
  );

  const FindJobs = Applicants?.map((applicant) =>
    applicant?.appliedJobs?.filter(
      (applied) =>
        applied?.jobId?.recruiterId?._id === user?._id
    )
  );

  const CandidateList = FindJobs?.map((jobArr) =>
    jobArr?.find((Job) => Job?._id === id)
  );

  const handleUpdateJobStatus = (
    JobId,
    PostEmail,
    Poststatus
  ) => {
    if (JobId && PostEmail && Poststatus) {
      dispatch(
        AppliedJobStatusUpdateThunk(
          JobId,
          PostEmail,
          Poststatus
        )
      );
    }
  };

  return (
    <div>
      <MainNav />
      <br /><br /><br />

      <div className="job-desc-container page-bg">

        {CandidateList?.filter(
          (job) => job?._id === id
        ).map((job) => (

          <div
            key={job?._id}
            className="job-desc-card"
          >

            {/* Job Image */}
            <div className="job-desc-image-box">
              <img
                src={
                  job?.jobId?.profileImage?.url
                }
                alt="job"
                className="job-desc-image"
              />
            </div>

            {/* Job Title */}
            <h2 className="job-title gradient-text">
              {job?.jobId?.jobTitle}
            </h2>

            <p className="job-company">
              {job?.jobId?.companyName}
            </p>

            {/* Toggle */}
            <div
              className="toggle-btn"
              onClick={() => {
                setSeeJobDetails(
                  !(seeJobDetails &&
                    caughtId === job?._id)
                );
                setCaughtId(job?._id);
              }}
            >
              {seeJobDetails &&
              caughtId === job?._id ? (
                <>
                  Hide Job Details
                  <KeyboardArrowUpIcon />
                </>
              ) : (
                <>
                  See Job Details
                  <KeyboardArrowDownIcon />
                </>
              )}
            </div>

            {/* Job Details */}
            {seeJobDetails &&
              caughtId === job?._id && (

                <div className="job-meta-grid">

                  <div>
                    <span className="meta-label">
                      Location
                    </span>
                    <span className="meta-value">
                      {
                        job?.jobId
                          ?.jobLocation
                      }
                    </span>
                  </div>

                  <div>
                    <span className="meta-label">
                      Type
                    </span>
                    <span className="meta-value">
                      {
                        job?.jobId
                          ?.jobType
                      }
                    </span>
                  </div>

                  <div>
                    <span className="meta-label">
                      Experience
                    </span>
                    <span className="meta-value">
                      {
                        job?.jobId
                          ?.experience
                      }
                    </span>
                  </div>

                  <div>
                    <span className="meta-label">
                      Salary
                    </span>
                    <span className="meta-value salary">
                      {job?.jobId?.salary}
                    </span>
                  </div>

                  <div>
                    <span className="meta-label">
                      Posted
                    </span>
                    <span className="meta-value">
                      {timeAgo(
                        job?.jobId
                          ?.updatedAt
                      )}
                    </span>
                  </div>

                </div>
              )}

            {/* Skills */}
            {seeJobDetails &&
              caughtId === job?._id && (

                <div className="skills-section">
                  <h5>Skills</h5>

                  <div className="skills-container">
                    {job?.jobId?.skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="skill-chip mt-2"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  <div className="job-description mt-3">
                    <h5>Description</h5>
                    <p>
                      {
                        job?.jobId
                          ?.jobDescription
                      }
                    </p>
                  </div>

                </div>
              )}

            {/* Applicant Details */}
            <div className="applicant-card">

              <h4>
                Applicant Details
              </h4>

              <div className="applicant-grid">

                <div>
                  <span className="meta-label">
                    Name
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.firstName
                    }{" "}
                    {
                      job?.userDatas
                        ?.lastName
                    }
                  </span>
                </div>

                <div>
                  <span className="meta-label">
                    Email
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.email
                    }
                  </span>
                </div>

                <div>
                  <span className="meta-label">
                    Phone
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.phone
                    }
                  </span>
                </div>

                <div>
                  <span className="meta-label">
                    Location
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.location
                    }
                  </span>
                </div>

                <div>
                  <span className="meta-label">
                    Qualification
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.qualification
                    }
                  </span>
                </div>

                <div>
                  <span className="meta-label">
                    Experience
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.experience
                    }
                  </span>
                </div>

                <div>
                  <span className="meta-label">
                    Expected Salary
                  </span>
                  <span className="meta-value">
                    {
                      job?.userDatas
                        ?.expectedSalary
                    }
                  </span>
                </div>

              </div>

              {/* Status */}
              <div className="status">
                Status :
                <span
                  className={
                    job?.status ===
                    "shortlisted"
                      ? "status-shortlisted"
                      : job?.status ===
                        "rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }
                >
                  {job?.status}
                </span>
              </div>

       {job?.status === "pending" ?
              <div className="job-actions">
                <ButtonUI
                  buttonName="Shortlist"
                  buttonVariant="contained"
                  colorbg="teal"
                  handlefn={() =>
                    handleUpdateJobStatus(
                      job?.jobId?._id,
                      job?.userDatas?.email,
                      "shortlisted"
                    )
                  }
                />
                <ButtonUI
                  buttonName="Reject"
                  buttonVariant="contained"
                  colorbg="red"
                  handlefn={() =>
                    handleUpdateJobStatus(
                      job?.jobId?._id,
                      job?.userDatas?.email,
                      "rejected"
                    )
                  }
                />
              </div> : null
}
            </div>

          </div>
        ))}

      </div>

<style>{`


.job-desc-container{
  display:flex;
  justify-content:center;
  padding:40px 15px;
}

.job-desc-card{
  width:100%;
  max-width:900px;
  background:#fff;
  border-radius:16px;
  padding:30px;
  box-shadow:0 4px 20px rgba(0,0,0,0.08);
}

.gradient-text{
background:linear-gradient(90deg,#00c6ff,#0072ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.job-desc-image-box{
display:flex;
justify-content:center;
margin-bottom:20px;
}

.job-desc-image{
width:120px;
height:120px;
border-radius:12px;
}

.job-title{
font-size:26px;
font-weight:700;
}

.job-company{
color:#666;
margin-bottom:15px;
}

.toggle-btn{
color:#007bff;
cursor:pointer;
font-weight:600;
margin-bottom:15px;
}

.job-meta-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:15px;
margin-bottom:20px;
}

.meta-label{
display:block;
font-size:13px;
color:#888;
}

.meta-value{
font-weight:600;
}

.salary{
color:#00a65a;
}

.skills-container{
display:flex;
flex-wrap:wrap;
gap:10px;
}

.skill-chip{
background:linear-gradient(135deg,#007bff,#00c6ff);
color:white;
padding:6px 14px;
border-radius:20px;
font-size:13px;
}

.applicant-card{
margin-top:25px;
padding-top:20px;
border-top:1px solid #eee;
}

.applicant-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:15px;
margin-top:15px;
}

.status{
margin-top:20px;
font-weight:600;
}

.status-shortlisted{
color:green;
margin-left:10px;
}

.status-rejected{
color:red;
margin-left:10px;
}

.status-pending{
color:orange;
margin-left:10px;
}

.job-actions{
display:flex;
gap:15px;
margin-top:20px;
flex-wrap:wrap;
}

@media(max-width:768px){
.job-title{font-size:22px;}
}

`}</style>

    </div>
  );
}

export default Candidate;