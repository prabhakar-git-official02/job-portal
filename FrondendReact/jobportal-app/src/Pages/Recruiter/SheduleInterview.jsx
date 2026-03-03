import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicantGetAllThunk } from "../../Thunks/applicantThunk";
import { authThunk } from "../../Thunks/authThunk";
import { InterviewsGet_Thunk } from "../../Thunks/InterviewThunk";
import MainNav from "../../Navbar/MainNav";
import DialogboxSheduleInterview from "../../DialogBoxes/RecruiterPost/DialogboxSheduleInterview";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SearchInput from "../../Components/SearchInput";

function SheduleInterview() {
  const dispatch = useDispatch();


  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(authThunk());
    dispatch(applicantGetAllThunk());
    dispatch(InterviewsGet_Thunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const applicants = useSelector((state) => state.allApplicants.All_Applicants);
  const interviews = useSelector((state) => state.Interviews.interviews);

  const userJobs = applicants?.flatMap((applicant) =>
    applicant?.appliedJobs?.filter(
      (job) => job?.jobId?.recruiterId?._id === user?._id
    )
  );

  const shortlisted = userJobs?.filter(
    (job) => job?.status === "shortlisted"
  );

  const filtered = shortlisted?.filter((sl) =>
    sl?.jobId?.jobTitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid page-bg min-vh-100 px-0">

      {/* Navbar */}
      <div className="row m-0">
        <MainNav />
      </div>

      <br /><br /><br />

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-4">

        {/* Title */}
        <div className="modern-title-container mb-3 text-center text-md-start">
          <h3 className="modern-title">Shortlisted Candidates</h3>
          <p className="modern-subtitle">
            Manage and schedule interviews for shortlisted applicants
          </p>
        </div>

        {/* Search */}
        <div className="d-flex justify-content-center justify-content-md-start mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Search by job title..."
          />
        </div>

        {/* Empty */}
        {!shortlisted?.length ? (
<div className="no-data-wrapper">
  <img
    src="nodata-image.avif"
    alt="No applied jobs"
    className="no-data-img"
  />
  <h5 className="no-data-title">No records found</h5>
  <p className="no-data-text">
   Currently, there are no records available.
  </p>
</div>
        ) : (

          /* Cards */
          <div className="row g-3 g-md-4">
            {filtered?.map((sl) => {

              const alreadyScheduled = interviews?.some(
                (interview) =>
                  interview?.jobId?.toString() === sl?.jobId?._id?.toString() &&
                  interview?.applicantId?.toString() === sl?.jobseekerId?.toString()
              );

              return (
                <div key={sl?._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">

                  <div className="card card-saas border-0 shadow-sm h-100 p-3 p-md-4">

                    {/* Top */}
                    <div className="d-flex flex-column flex-sm-row gap-3">

                      <img
                        src={sl?.jobId?.profileImage?.url}
                        alt="company"
                        className="profile-img"
                      />

                      <div className="flex-grow-1">

                        <h6 className="fw-bold mb-1 job-title">
                          {sl?.jobId?.jobTitle}
                        </h6>

                        <p className="text-muted small mb-1">
                          {sl?.jobId?.companyName}
                        </p>

                        <div className="small text-dark mb-2">
                          👤 {sl?.userDatas?.firstName} {sl?.userDatas?.lastName}
                        </div>

                      </div>

                    </div>

                    {/* Info */}
                    <div className="job-info mt-3">

                      <div>
                        <small>Email</small>
                        <p>{sl?.userDatas?.email}</p>
                      </div>

                      <div>
                        <small>Phone</small>
                        <p>{sl?.userDatas?.phone}</p>
                      </div>

                      <div>
                        <small>Status</small>
                        <p className="text-success">{sl?.status}</p>
                      </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-3">

                      {alreadyScheduled ? (
                        <p className="fw-bold text-danger mb-0">
                          Already Scheduled <EventAvailableIcon fontSize="small"/>
                        </p>
                      ) : (
                        <DialogboxSheduleInterview
                          ApplicantId={sl?.jobseekerId}
                          ApplicantEmail={sl?.userDatas?.email}
                          JobDetails={sl?.jobId}
                          JobId={sl?.jobId?._id}
                        />
                      )}

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        )}

      </div>

      {/* Premium Styles (Same as ViewPosts) */}
      <style>{`

                  .no-data-wrapper {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.no-data-img {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius : 20px;
  object-fit: contain;
  opacity: 0.9;
  margin-bottom: 25px;
}

.no-data-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
}

.no-data-text {
  font-size: 14px;
  color: #888;
}


.page-bg{
background:
linear-gradient(135deg,#f8fafc,#eef2f7);
}

/* Card */
.card-saas{
border-radius:16px;
transition:0.3s;
}

.card-saas:hover{
transform:translateY(-6px);
box-shadow:
0 20px 40px rgba(0,0,0,0.08);
}

/* Image */
.profile-img{
width:70px;
height:70px;
object-fit:cover;
border-radius:12px;
}

/* Job info */
.job-info{
display:flex;
justify-content:space-between;
gap:10px;
background:#f8fafc;
padding:10px;
border-radius:10px;
}

.job-info small{
font-size:11px;
color:#6b7280;
}

.job-info p{
margin:0;
font-size:13px;
font-weight:500;
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
font-size:14px;
color:#6b7280;
}

/* Mobile */
@media(max-width:768px){

.profile-img{
width:55px;
height:55px;
}

.job-info{
flex-direction:column;
}

}

      `}</style>

    </div>
  );
}

export default SheduleInterview;