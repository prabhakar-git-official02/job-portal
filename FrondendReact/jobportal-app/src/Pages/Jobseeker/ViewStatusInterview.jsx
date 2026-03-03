import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../Thunks/authThunk";
import { InterviewsGet_Thunk, Interview_ApplicantResult_Update_Thunk } from "../../Thunks/InterviewThunk";
import MainNav from "../../Navbar/MainNav";
import ButtonUI from "../../Components/ButttonUI";
import { timeAgo } from "../../Components/timeago";
import { useState } from "react";
import SearchInput from "../../Components/SearchInput";
import { useLocation } from "react-router-dom";


function ViewStatusInterview() {

    const location = useLocation();
  const query = new URLSearchParams(location.search);

  const StatusInterviews = query.get("interviewStatus");

  const dispatch = useDispatch();
const [search,setSearch] = useState("");
  useEffect(() => { dispatch(authThunk()); }, [dispatch]);
  useEffect(() => { dispatch(InterviewsGet_Thunk()); }, [dispatch]);

  const user = useSelector(state => state.auth.user);
  const Interviews = useSelector(state => 
    state.Interviews.interviews?.filter(i => i.applicantId === user?._id)
  );

  const Applicant_Status_Interviews = Interviews?.filter((i) => i?.applicantResult?.trim().toLowerCase() === StatusInterviews?.trim().toLowerCase())

  const handleApplicantResult = (applicantId,jobId,result,recruiterId) => {
    if(applicantId && jobId && result && recruiterId){
      dispatch(Interview_ApplicantResult_Update_Thunk(applicantId,jobId,result,recruiterId));
    }
  }

  return (
    <div className="page-bg ">

  {/* Navbar */}
  <div className="row m-0">
    <MainNav />
  </div>

  <br /><br /><br /><br />

  <div className="container py-4 px-3 px-md-4 px-lg-5">

    {/* Title */}

    <div className="modern-title-container mb-3 text-center text-md-start">

<h3 className={`modern-title ${StatusInterviews === "accepted"? "premium-green" : StatusInterviews === "rejected" ? "premium-red" : "premium-yellow"}`}>{StatusInterviews?.toUpperCase()} INTERVIEWS</h3>

      <p className="modern-subtitle">
        Manage your interview invitations
      </p>

    </div>


    {/* Search */}

    <div className="d-flex justify-content-center justify-content-md-start mb-4">

      <SearchInput
        search={search}
        setSearch={setSearch}
        placeholder="Search interview calls..."
      />

    </div>


    {/* No data */}

    {!Interviews?.length ? (

      <div className="text-center mt-5">

        <img
          src="nodata-image.avif"
          alt="no-data"
          className="no-data-img"
        />

        <p className="text-muted mt-3">
          No interview calls found
        </p>

      </div>

    ) : (

      <div className="row g-3 g-md-4">

        {Applicant_Status_Interviews
          ?.filter(i =>
            i?.jobDetails?.jobTitle
              ?.toLowerCase()
              .includes(search?.toLowerCase())
          )
          .map((i) => {

            const applicantStatusColor =
              i?.applicantResult === "accepted"
                ? "status-success"
                : i?.applicantResult === "rejected"
                ? "status-danger"
                : "status-warning";

            const interviewStatusColor =
              i?.interviewStatus === "scheduled"
                ? "status-warning"
                : i?.interviewStatus === "cancelled"
                ? "status-danger"
                : "status-success";


            return (

              <div
                key={i._id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >

                <div className="card card-saas border-0 shadow-sm h-100 p-3 p-md-4">


                  {/* Top */}

                  <div>

                    <h6 className="job-title mb-1">
                      {i?.jobDetails?.jobTitle}
                    </h6>

                    <p className="text-muted small mb-2">
                      {i?.companyName}
                    </p>

                  </div>


                  {/* Interview Info */}

                  <div className="job-info mt-3">

                    <div>
                      <small>Location</small>
                      <p>{i?.interviewLocation}</p>
                    </div>

                    <div>
                      <small>Date</small>
                      <p>
                        {new Date(
                          i?.interviewDateAndTime
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <small>Time</small>
                      <p>
                        {new Date(
                          i?.interviewDateAndTime
                        ).toLocaleTimeString()}
                      </p>
                    </div>

                  </div>


                  {/* Recruiter Info */}

                  <div className="mt-3 small text-muted">

                    <div>Email: {i?.recruiterEmail}</div>

                    <div>Phone: {i?.recruiterPhone}</div>

                    <div>Interview Message: {i?.interviewMessage}</div>

                  </div>


                  {/* Status */}
                  
                  <div className="mt-3">
                    <div className="small mt-3">
                      <strong>Interview Status: </strong>
                      <span className={`status-pill  ${interviewStatusColor}`}>
                        {i?.interviewStatus}
                      </span>

                    </div>

                    <div className="small mt-3">
                      <strong>Applicant Intrest: </strong>
                      <span className={`status-pill ${applicantStatusColor}`}>
                        {i?.applicantResult}
                      </span>
                    </div>
                  </div> 

                  {/* Cancel reason */}

                  {i?.interviewCancelledReason && (

                    <div className="small text-danger mt-2">

                      Reason: {i?.interviewCancelledReason}

                    </div>

                  )}


                  {/* Actions */}
                  {i?.applicantResult === "pending" ?
                  <div>
                  {i?.interviewStatus !== "cancelled" &&
                   i?.interviewStatus !== "completed" && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn p-2 apply-btn"
                        onClick={() =>
                          handleApplicantResult(
                            i?.applicantId,
                            i?.jobId,
                            "accepted",
                            i?.recruiterId
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn reject-btn"
                        onClick={() =>
                          handleApplicantResult(
                            i?.applicantId,
                            i?.jobId,
                            "rejected",
                            i?.recruiterId
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  </div> : null
          }

                  {/* Footer */}

                  <div className="mt-auto pt-2">

                    <small className="text-muted">
                      {timeAgo(i?.createdAt)}
                    </small>

                  </div>


                </div>

              </div>

            );

          })}

      </div>

    )}

  </div>
  <style>
    {`
   /* Page background */

.page-bg{

background: linear-gradient(135deg,#f1f5f9,#e2e8f0);

min-height:100vh;

}



/* Title */

.modern-title{

font-size:26px;

font-weight:700;

background: linear-gradient(135deg,#4f46e5,#6366f1);

-webkit-background-clip:text;

-webkit-text-fill-color:transparent;

}

.modern-subtitle{

font-size:14px;

color:#64748b;

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

background:#ffffff;

border-radius:16px;

box-shadow:
0 4px 12px rgba(0,0,0,0.05),
0 12px 24px rgba(0,0,0,0.06);

transition: all .25s ease;

border:1px solid rgba(0,0,0,0.04);

display:flex;

flex-direction:column;

}

.card-saas:hover{

transform: translateY(-6px);

box-shadow:
0 12px 25px rgba(0,0,0,0.10),
0 20px 40px rgba(0,0,0,0.12);

}



/* Job title */

.job-title{

font-size:16px;

font-weight:600;

color:#0f172a;

}



/* Interview info box */

.job-info{

display:flex;

justify-content:space-between;

gap:10px;

background:#f8fafc;

padding:10px;

border-radius:10px;

border:1px solid #eef2f7;

}

.job-info div{

flex:1;

}

.job-info small{

font-size:11px;

color:#64748b;

}

.job-info p{

margin:0;

font-size:13px;

font-weight:500;

color:#0f172a;

}



/* Apply button */

.apply-btn{

background: linear-gradient(135deg,#6366f1,#4f46e5);

color:white;

border:none;

padding:6px 14px;

border-radius:8px;

font-size:13px;

transition:.2s;

}

.apply-btn:hover{

opacity:.9;

}



/* Reject button */

.reject-btn{

background:#ef4444;

border:none;

color:white;

border-radius:8px;

padding:6px 14px;

font-size:13px;

transition:.2s;

}

.reject-btn:hover{

opacity:.9;

}



/* Status pills */

.status-pill{

margin-left:6px;

padding:3px 10px;

border-radius:20px;

font-size:12px;

font-weight:500;

}

.status-success{

background:#dcfce7;

color:#166534;

}

.status-danger{

background:#fee2e2;

color:#991b1b;

}

.status-warning{

background:#fef3c7;

color:#92400e;

}



/* No data image */

.no-data-img{

width:250px;

max-width:90%;

opacity:.9;

}



/* Responsive */

@media(max-width:768px){

.job-info{

flex-direction:column;

}

}
    `}
  </style>
  </div>
  )
}

export default ViewStatusInterview;