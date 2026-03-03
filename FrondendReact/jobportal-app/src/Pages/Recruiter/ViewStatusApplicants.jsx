import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../Thunks/authThunk";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import { AppliedJobStatusUpdateThunk } from "../../Thunks/AppliedJobStatusUpdateThunk";
import MainNav from "../../Navbar/MainNav";
import ButtonUI from "../../Components/ButttonUI";
import SearchInput from "../../Components/SearchInput";
import { timeAgo } from "../../Components/timeago";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import DropDown from "../../Components/DropDown";
import { useLocation } from "react-router-dom";

const ApplicantCard = memo(({ job }) => (
  <div className="applicant-card mt-3">
    <div className="applicant-header">Applicant Details</div>

    <div className="applicant-body">
      <div className="row g-2">
        <div className="col-md-6">
          <p>
            <strong>Name</strong>
            <br />
            {job?.userDatas?.firstName} {job?.userDatas?.lastName}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Email</strong>
            <br />
            {job?.userDatas?.email}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Phone</strong>
            <br />
            {job?.userDatas?.phone}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Location</strong>
            <br />
            {job?.userDatas?.location}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Qualification</strong>
            <br />
            {job?.userDatas?.qualification}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Experience</strong>
            <br />
            {job?.userDatas?.experience}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Expected Salary</strong>
            <br />
            {job?.userDatas?.expectedSalary}
          </p>
        </div>

        <div className="col-md-6">
          <p>
            <strong>Status:             <span
              className={
                job?.status === "shortlisted"
                  ? "status-badge success"
                  : job?.status === "rejected"
                    ? "status-badge rejected"
                    : "status-badge pending"
              }
            >
              {job?.status}
            </span></strong>
            <br />
          </p>
        </div>
      </div>

      <Button
        variant="contained"
        className="resume-btn mt-2"
        onClick={() => window.open(job?.userDatas?.resume?.url, "_blank")}
      >
        Download Resume
      </Button>

      <div className="applied-time mt-3">Applied {timeAgo(job?.appliedAt)}</div>
    </div>
  </div>
));



function ViewStatusApplicants() {
  const dispatch = useDispatch();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
  
    const ApplicantStatus = query.get("applicantStatus");

  const [expandedJobId, setExpandedJobId] = useState(null);

  const [search, setSearch] = useState("");

    const [locationKey, setLocationKey] = useState("");
    const [qualificationsKey,setQualificationKey] = useState("")


  useEffect(() => {
    dispatch(authThunk());
    dispatch(applicantGetAllThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  const applicants = useSelector((state) => state.allApplicants.All_Applicants);

  const userJobs = applicants?.flatMap((applicant) =>
    applicant?.appliedJobs?.filter(
      (applied) => applied?.jobId?.recruiterId?._id === user?._id,
    ),
  );

  const StatusApplicants = userJobs?.filter((job) => job?.status.trim().toLowerCase() === ApplicantStatus.trim().toLowerCase())

  console.log(applicants)
  const handleUpdateJobStatus = (ApplicantId, JobId, PostEmail, Poststatus) => {
    dispatch(
      AppliedJobStatusUpdateThunk(ApplicantId, JobId, PostEmail, Poststatus),
    );
  };


    const qualifications = [
      "All Qualifications",
    "10th",
    "12th",
    "ITI",
    "Diploma / Polytechnic",
    "UG - Any Degree",
    "B.E",
    "B.Tech",
    "B.Sc",
    "B.Com",
    "BCA",
    "BA",
    "BBA",
    "B.Pharm",
    "LLB",
    "MBBS",
    "BDS",
    "PG - Any Degree",
    "M.E",
    "M.Tech",
    "M.Sc",
    "M.Com",
    "MCA",
    "MBA",
    "M.Pharm",
    "PhD",
    "CA",
    "CS",
    "ICWA",
    "Other",
  ];



  const filteredPosts = StatusApplicants?.filter((p) => {

    const qualificationMatch =
    qualificationsKey && qualificationsKey !=="All Qualifications"
    ? p?.userDatas?.qualification.trim().toLowerCase() === qualificationsKey.trim().toLowerCase() : true

    const locationMatch =
    locationKey && locationKey!==""
    ? p?.userDatas?.location.trim().toLowerCase().includes(locationKey.trim().toLowerCase())
     : true

    return locationMatch  && qualificationMatch;
  });
  

  return (
    <div className="container-fluid page-bg min-vh-100 px-0">
      {/* Navbar */}

      <div className="row m-0">
        <MainNav />
      </div>

      <br />
      <br />
      <br />

      {/* Content */}

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-4">
        {/* Title */}

        <div className="modern-title-container text-center mb-3">
           <h3 className={`modern-title ${ApplicantStatus === "shortlisted" ? "premium-green" : ApplicantStatus === "rejected" ? "premium-red" : "premium-yellow"}`}>{ApplicantStatus?.toUpperCase()} CANDIDATES</h3>

          <p className="modern-subtitle">
            Manage and review applicants for your job posts
          </p>
        </div>

        {/* Search */}

        <div className="mb-4 d-flex justify-content-center">
          <SearchInput search={search} setSearch={setSearch} placeholder={`Search your applicants here..`}/>
        </div>

        
        <div className="d-flex align-items-center gap-2 flex-wrap">

                    <DropDown
            datas={qualifications}
            dataName={qualificationsKey}
            dropDirection={"down"}
            setDatas={setQualificationKey}
            classname={`premium-dropdown`}
            initialName={`Filter Applicants Qualification`}
          />
                    <input
            type="text"
            placeholder="🔍 Filter Applicants Location..."
            className="premium-input"
            value={locationKey}
            onChange={(e) => setLocationKey(e.target.value)}
          /> 
        </div>


        {/* Empty */}

        {!userJobs?.length ? (
          <div className="text-center mt-5">
            <img
              src="nodata-image.avif"
              style={{ maxWidth: "400px", width: "100%" }}
              alt="post-img"
            />

            <p className="text-muted mt-3">No applicants yet</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPosts
              ?.filter((job) =>
                job?.jobId?.jobTitle
                  ?.toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((job) => (
                <div key={job._id} className="col-12 col-md-6 col-xl-4">
                  <div className="card card-saas h-100">
                    {/* Job Header */}

                    <div className="d-flex gap-3">
                      <img
                        src={job?.jobId?.profileImage?.url}
                        alt="post-img"
                        className="job-img"
                      />

                      <div className="flex-grow-1">
                        <h6 className="job-title">{job?.jobId?.jobTitle}</h6>

                        <p className="company-name">
                          {job?.jobId?.companyName}
                        </p>

                        <p className="job-location">
                          📍 {job?.jobId?.jobLocation}
                        </p>

                        <div
                          className="view-details"
                          onClick={() =>
                            setExpandedJobId(
                              expandedJobId === job._id ? null : job._id,
                            )
                          }
                        >
                          {expandedJobId === job._id
                            ? "Hide Job Details"
                            : "View Job Details"}

                          {expandedJobId === job._id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded */}

                    {expandedJobId === job._id && (
                      <div className="job-details">

                        <p>
                          <strong>Job Type: </strong> {job?.jobId?.jobType}
                        </p>

                        <p><strong>Skills: </strong>
                        <ul>
                          {job?.jobId?.skills?.map((s,index) => (
                            <li key={index}>{s}</li>
                          ))}
                        </ul>
                        </p>

                        <p>
                          <strong>Experience: </strong> {job?.jobId?.experience}
                        </p>

                        <p>
                          <strong>Salary: </strong> {job?.jobId?.salary}
                        </p>

                        <p><strong>Job Description: </strong>{job?.jobId?.jobDescription}</p>

                        <p>
                          <strong>Posted: </strong>{" "}
                          {timeAgo(job?.jobId?.updatedAt)}
                        </p>
                      </div>
                    )}

                    {/* Applicant */}

   
                  <ApplicantCard key={job._id} job={job}/>
               {/* Actions */}

                    <div className="d-flex gap-2 mt-3">
                      <ButtonUI
                        buttonName="Shortlist"
                        buttonVariant="contained"
                        colorbg="#0ea5a4"
                        handlefn={() =>
                          handleUpdateJobStatus(
                            job?.jobseekerId,
                            job?.jobId?._id,
                            job?.userDatas?.email,
                            "shortlisted",
                          )
                        }
                      />

                      <ButtonUI
                        buttonName="Reject"
                        buttonVariant="contained"
                        colorbg="#ef4444"
                        handlefn={() =>
                          handleUpdateJobStatus(
                            job?.jobseekerId,
                            job?.jobId?._id,
                            job?.userDatas?.email,
                            "rejected",
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

     

      <style>{`

.page-bg{

background:
linear-gradient(135deg,#f8fafc,#eef2f7);

}

.premium-green {
  background: linear-gradient(
    90deg,#16a34a,#22c55e
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-red {
  background: linear-gradient(
    90deg,#b91c1c,#ef4444
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-yellow {
  background: linear-gradient(
    90deg,#b45309,#f59e0b
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

/* Card */

.card-saas{

padding:20px;

border-radius:16px;

background:white;

border:none;

box-shadow:
0 4px 12px rgba(0,0,0,0.05);

transition:0.3s;

}

.card-saas:hover{

transform:translateY(-6px);

box-shadow:
0 20px 40px rgba(0,0,0,0.08);

}


/* Job */

.job-img{

width:70px;
height:70px;

border-radius:12px;

object-fit:cover;

}


.job-title{

font-weight:600;

margin:0;

}


.company-name{

color:#6b7280;

font-size:14px;

margin:0;

}


.job-location{

font-size:13px;

margin:0;

}


.view-details{

font-size:13px;

color:#4f46e5;

cursor:pointer;

display:flex;

align-items:center;

gap:4px;

}


/* Applicant */

.applicant-card{

background:#f9fafb;

border-radius:12px;

margin-top:15px;

}


.applicant-header{

padding:10px 15px;

font-weight:600;

border-bottom:1px solid #eee;

}


.applicant-body{

padding:15px;

font-size:14px;

}


/* Status */

.status-badge{

padding:3px 10px;

border-radius:20px;

font-size:12px;

}

.success{

background:#dcfce7;

color:#16a34a;

}

.rejected{

background:#fee2e2;

color:#dc2626;

}

.pending{

background:#fef3c7;

color:#d97706;

}


/* Resume */

.resume-btn{

background:#6366f1 !important;

}


/* Title */

.modern-title{

font-size:26px;

font-weight:700;

background:
linear-gradient(135deg,#4f46e5,#6366f1);

-webkit-background-clip:text;

-webkit-text-fill-color:transparent;

}

.modern-subtitle{

color:#6b7280;

font-size:14px;

}

 .premium-input{

  height:42px;
  min-width:220px;

  padding:0 14px;

  border-radius:10px;
  border:1px solid #e5e7eb;

  background: rgba(255,255,255,0.9);

  font-size:14px;

  outline:none;

  transition: all 0.25s ease;

}

/* Hover */

.premium-input:hover{

  border-color:#6366f1;

}

/* Focus */

.premium-input:focus{

  border-color:#4f46e5;

  box-shadow:
  0 0 0 3px rgba(79,70,229,0.15);

}

/* Match dropdown height */

.premium-dropdown{

  height:42px;

  display:flex;
  align-items:center;

}

/* Mobile responsive */

@media(max-width:768px){

  .premium-input{

    width:100%;
    min-width:unset;

  }

}
`}</style>
    </div>
  );
}

export default ViewStatusApplicants;