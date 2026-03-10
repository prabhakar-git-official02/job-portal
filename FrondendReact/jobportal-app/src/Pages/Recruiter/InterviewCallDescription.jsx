import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { authThunk } from "../../Thunks/authThunk";
import { useSelector } from "react-redux";
import { InterviewsGet_Thunk } from "../../Thunks/InterviewThunk";
import {  useParams } from "react-router-dom";
import MainNav from "../../Navbar/MainNav";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function InterviewCallDescription() {

  const { applicantId, jobId } = useParams();

  const [seeApplicantDeatils, setSeeApplicantDetails] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(InterviewsGet_Thunk());
  }, [dispatch, user]);

  const Interviews = useSelector((state) => state.Interviews.interviews);

  const Recruiter_Interviews = Interviews?.filter(
    (i) => i?.recruiterId === user?._id
  );

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

  const FindJob = FindJobs?.map((Job) =>
    Job?.find(
      (Job) =>
        applicantId === Job?.jobseekerId &&
        jobId === Job?.jobId?._id
    )
  )?.filter(Boolean);

  const Info = ({ label, value }) => (
  <div>
    <span className="meta-label">{label}</span>
    <span className="meta-value">{value || "N/A"}</span>
  </div>
);

const Status = ({ label, value, type }) => (
  <span>
    {label} :
    <span className={`status-chip ${type}`}>
      {value}
    </span>
  </span>
);

 return (
  <div className="container-fluid vh-100">
  <MainNav/>
  <div className="row  d-flex align-items-center page-bg justify-content-center">
\

      {Recruiter_Interviews
        ?.filter(
          (i) =>
            applicantId === i?.applicantId &&
            jobId === i?.jobId
        )
        .map((i) => (

          <div className="interview-card" key={i?._id}>

            {/* Header */}
            <div className="header-section">
              <h2 className="gradient-text interview-title">
                {i?.jobDetails?.jobTitle}
              </h2>
              <p className="company-name">{i?.companyName}</p>
            </div>

            <hr className="divider" />

            {/* Company Info */}
            <div className="info-grid">
              <Info label="Company Address" value={i?.companyAddress} />
              <Info label="Company Website" value={i?.companyWebsite} />
              <Info label="Recruiter Email" value={i?.recruiterEmail} />
              <Info label="Recruiter Phone" value={i?.recruiterPhone} />
              <Info label="Applicant Email" value={i?.applicantEmail} />
            </div>

            <hr className="divider" />

            {/* Applicant Toggle */}
            {FindJob?.map((job) => (
              <div key={job?._id}>
                <div
                  className="toggle-btn"
                  onClick={() =>
                    setSeeApplicantDetails(!seeApplicantDeatils)
                  }
                >
                  {seeApplicantDeatils
                    ? "Hide Applicant Details"
                    : "See Applicant Details"}
                  {seeApplicantDeatils
                    ? <KeyboardArrowUpIcon />
                    : <KeyboardArrowDownIcon />}
                </div>

                {seeApplicantDeatils && (
                  <div className="applicant-card">
                    <h5 className="section-title">
                      Applicant Details
                    </h5>

                    <div className="info-grid">
                      <Info label="Name" value={`${job?.userDatas?.firstName} ${job?.userDatas?.lastName}`} />
                      <Info label="Phone" value={job?.userDatas?.phone} />
                      <Info label="Location" value={job?.userDatas?.location} />
                      <Info label="Qualification" value={job?.userDatas?.qualification} />
                      <Info label="Experience" value={job?.userDatas?.experience} />
                      <Info label="Expected Salary" value={job?.userDatas?.expectedSalary} />
                    </div>

                    <p className="status-text">
                      Status :
                      <span className={`status-chip ${
                        job?.status === "shortlisted"
                          ? "success"
                          : job?.status === "rejected"
                          ? "danger"
                          : "warning"
                      }`}>
                        {job?.status}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}

            <hr className="divider" />

            {/* Interview Info */}
            <div className="info-grid">
              <Info label="Interview Location" value={i?.interviewLocation} />
              <Info
                label="Interview Time"
                value={new Date(i?.interviewDateAndTime).toLocaleString()}
              />
            </div>

            {user?.roleData === "user"?
            <div className="message-box">
              {i?.interviewMessage}
            </div>
            : null}

            <div className="status-row">
              <Status
                label="Applicant Intrest"
                value={i?.applicantResult}
                type={
                  i?.applicantResult === "accepted"
                    ? "success"
                    : i?.applicantResult === "rejected"
                    ? "danger"
                    : "warning"
                }
              />
              <Status
                label="Interview Status"
                value={i?.interviewStatus}
                type={
                  i?.interviewStatus === "scheduled"
                    ? "warning"
                    : i?.interviewStatus === "canceled"
                    ? "danger"
                    : "success"
                }
              />
            </div>

          </div>
        ))}
    </div>

    

    <style>{`

.page-bg{
  background: linear-gradient(135deg,#f1f5f9,#e2e8f0);
  min-height: 100vh;
  padding: 100px 20px 40px 20px;
}

.interview-card{
  width:100%;
  max-width:1100px;
  margin:0 auto;
  background:rgba(255,255,255,0.9);
  backdrop-filter:blur(10px);
  border-radius:18px;
  padding:35px;
  box-shadow:0 10px 40px rgba(0,0,0,0.08);
  transition:all 0.3s ease;
}

.interview-card:hover{
  transform:translateY(-3px);
  box-shadow:0 15px 50px rgba(0,0,0,0.12);
}

.header-section{
  margin-bottom:10px;
}

.gradient-text{
  background: linear-gradient(90deg,#2563eb,#06b6d4);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.interview-title{
  font-size:28px;
  font-weight:700;
}

.company-name{
  color:#64748b;
  font-size:16px;
}

.info-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:18px;
  margin-bottom:20px;
}

.meta-label{
  font-size:13px;
  color:#94a3b8;
  display:block;
  margin-bottom:4px;
}

.meta-value{
  font-size:15px;
  font-weight:600;
  color:#1e293b;
}

.toggle-btn{
  cursor:pointer;
  color:#2563eb;
  font-weight:600;
  display:flex;
  align-items:center;
  gap:6px;
  margin-bottom:15px;
}

.applicant-card{
  background:#f8fafc;
  padding:20px;
  border-radius:12px;
  margin-bottom:20px;
}

.section-title{
  margin-bottom:15px;
  font-weight:600;
}

.status-chip{
  margin-left:10px;
  padding:6px 14px;
  border-radius:25px;
  color:#fff;
  font-size:12px;
  font-weight:600;
  letter-spacing:0.5px;
  text-transform:capitalize;
}

.success{ background:#22c55e; }
.danger{ background:#ef4444; }
.warning{ background:#facc15; color:#000; }

.message-box{
  background:#f8fafc;
  padding:18px;
  border-left:5px solid #2563eb;
  border-radius:10px;
  margin-top:20px;
}

.status-row{
  display:flex;
  gap:25px;
  flex-wrap:wrap;
  margin-top:25px;
}

.divider{
  border:none;
  border-top:1px solid #e5e7eb;
  margin:25px 0;
}

@media(max-width:768px){
  .interview-card{
    padding:25px;
  }
  .interview-title{
    font-size:22px;
  }
}

`}</style>
</div>
);
}

export default InterviewCallDescription;
