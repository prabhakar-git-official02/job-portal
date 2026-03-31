import {
  Interview_ApplicantResult_Update_Thunk,
  InterviewsGet_Thunk,
} from "../../Thunks/InterviewThunk";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authThunk } from "../../Thunks/authThunk";
import MainNav from "../../Navbar/MainNav";
import { timeAgo } from "../../Components/timeago";
import ButtonUI from "../../Components/ButttonUI";
import { useParams } from "react-router-dom";

function InterviewCall() {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(InterviewsGet_Thunk());
  }, [dispatch, user]);

  const Interviews = useSelector(
    state => state.Interviews.interviews
  );

  const Interview = Interviews?.find(
    i => i?.jobId === id
  );

  const handleApplicantResult = (
    applicantId,
    jobId,
    result,
    recruiterId
  ) => {

    dispatch(
      Interview_ApplicantResult_Update_Thunk(
        applicantId,
        jobId,
        result,
        recruiterId
      )
    );

  };

  return (

<div>

  <MainNav />

  <br /><br /><br />

  <div className="interview-container">

    <div className="interview-card m-3">

      {/* Title */}
      <h2 className="interview-title">
        Interview Call
      </h2>

      {/* Job Title */}
      <h4 className="job-title gradient-text">
        {Interview?.jobDetails?.jobTitle}
      </h4>

      {/* Company Details */}
      <div className="interview-grid">

        <div>
          <span className="meta-label">Company</span>
          <span className="meta-value">
            {Interview?.companyName}
          </span>
        </div>

        <div>
          <span className="meta-label">Address</span>
          <span className="meta-value">
            {Interview?.companyAddress}
          </span>
        </div>

        <div>
          <span className="meta-label">Website</span>
          <span className="meta-value">
            {Interview?.companyWebsite}
          </span>
        </div>

        <div>
          <span className="meta-label">Recruiter Email</span>
          <span className="meta-value">
            {Interview?.recruiterEmail}
          </span>
        </div>

        <div>
          <span className="meta-label">Recruiter Phone</span>
          <span className="meta-value">
            {Interview?.recruiterPhone}
          </span>
        </div>

      </div>

      <hr />

      {/* Interview Info */}
      <div className="interview-grid">

        <div>
          <span className="meta-label">Location</span>
          <span className="meta-value">
            {Interview?.interviewLocation}
          </span>
        </div>

        <div>
          <span className="meta-label">Time</span>
          <span className="meta-value">
            {new Date(
              Interview?.interviewDateAndTime
            ).toLocaleString()}
          </span>
        </div>

      </div>

      {/* Message */}
      <div className="interview-message">

        <h5>Description</h5>

        <p>
          {Interview?.interviewMessage}
        </p>

      </div>

      {/* Status */}
      <div className="status-box">

        <span className={`status-chip ${
          Interview?.applicantResult === "accepted"
          ? "success"
          : Interview?.applicantResult === "rejected"
          ? "danger"
          : "warning"
        }`}>
          Applicant Intrest : {Interview?.applicantResult}
        </span>

        <span className={`status-chip ${
          Interview?.interviewStatus === "completed"
          ? "success"
          : Interview?.interviewStatus === "cancelled"
          ? "danger"
          : "warning"
        }`}>
          Interview Status : {Interview?.interviewStatus}
        </span>
      </div>
      <div><p><span className="text-danger">Cancelled Reason:</span> <span>{Interview?.interviewCancelledReason}</span></p></div>


     {Interview?.applicantResult === "pending" ?
<div>
      {(Interview?.interviewStatus !== "cancelled" &&
        Interview?.interviewStatus !== "completed") && (
        <div className="interview-actions">
          <ButtonUI
            buttonName="Accept"
            buttonVariant="contained"
            handlefn={() =>
              handleApplicantResult(
                Interview?.applicantId,
                Interview?.jobId,
                "accepted",
                Interview?.recruiterId
              )
            }
          />
          <ButtonUI
            buttonName="Reject"
            buttonVariant="contained"
            buttonClass="reject-btn"
            handlefn={() =>
              handleApplicantResult(
                Interview?.applicantId,
                Interview?.jobId,
                "rejected",
                Interview?.recruiterId
              )
            }
          />
        </div>
      )}
      </div> : null
}

      {/* Footer */}
      <div className="interview-footer">
        {timeAgo(Interview?.createdAt)}
      </div>

    </div>

  </div>


<style>{`

.interview-container{

  width:100%;

  min-height:100vh;

  display:flex;

  justify-content:center;

  align-items:center;

  background:#f4f7fb;

}

.gradient-text{
background: linear-gradient(90deg,#00c6ff,#0072ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}


.interview-card{

  width:100%;

  max-width:900px;

  background:#fff;

  border-radius:16px;

  box-shadow:0 4px 20px rgba(0,0,0,0.06);

  padding:30px;

}


.interview-card:hover{

  box-shadow:0 8px 30px rgba(0,0,0,0.10);

}



.interview-title{

  text-align:center;

  font-weight:700;

  margin-bottom:20px;

}



.job-title{

  font-weight:700;

  margin-bottom:20px;

}



.interview-grid{

  display:grid;

  grid-template-columns:
  repeat(auto-fit,minmax(200px,1fr));

  gap:15px;

  margin-bottom:20px;

}



.meta-label{

  display:block;

  font-size:13px;

  color:#888;

}



.meta-value{

  font-size:16px;

  font-weight:600;

}



.interview-message{

  margin-top:20px;

  margin-bottom:20px;

}



.interview-message p{

  color:#555;

  line-height:1.6;

}



.status-box{

  display:flex;

  gap:10px;

  flex-wrap:wrap;

  margin-bottom:20px;

}



.status-chip{

  padding:6px 14px;

  border-radius:20px;

  font-size:13px;

  color:white;

}



.success{

  background:#00a65a;

}



.danger{

  background:#dc3545;

}



.warning{

  background:#ffc107;

  color:black;

}



.interview-actions{

  display:flex;

  gap:15px;

  margin-bottom:20px;

}



.reject-btn{

  background:red !important;

}



.interview-footer{

  border-top:1px solid #eee;

  padding-top:15px;

  color:#888;

}



@media(max-width:768px){

  .interview-card{

    padding:20px;

  }

}

`}</style>


</div>

  );

}

export default InterviewCall;
