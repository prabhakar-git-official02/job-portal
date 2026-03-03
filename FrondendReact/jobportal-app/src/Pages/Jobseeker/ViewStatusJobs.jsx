import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authThunk } from "../../Thunks/authThunk";
import { applicantThunk } from "../../Thunks/applicantThunk";
import MainNav from "../../Navbar/MainNav";
import { timeAgo } from "../../Components/timeago";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";
import { useLocation } from "react-router-dom";


function ViewStatusJobs() {

const location = useLocation();
  const query = new URLSearchParams(location.search);

  const StatusJobs = query.get("jobStatus");

  const dispatch = useDispatch();

  const [search,setSearch] = useState("")

  const [statusKey,setStatusKey] = useState("")
  const [jobTypeKey, setJobTypekey] = useState("");
  const [jobPlatformKey, setJobPlatformKey] = useState("");
  const [locationKey, setLocationKey] = useState("");

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);



  useEffect(() => {
    if (user?.roleData === "user") {
      dispatch(applicantThunk());
    }
  }, [user, dispatch]);

  const Applicant = useSelector((state) => state.applicantMemory.applicant);

  const StatusApplicant = Applicant?.populateData?.filter((job) => job?.status?.trim().toLowerCase() === StatusJobs?.trim().toLowerCase())

  const FilteredJobTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "All Posts",
  ];

  const FilteredJobFields = [
    "All Posts",
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
    "Government Services",
  ];

 const FilterJobStatus = [
  "Shortlisted","Rejected","Pending","All Posts"
  ]

  const filteredPosts = StatusApplicant?.filter((p) => {

    const statusMatch = 
    statusKey && statusKey!=="All Posts"
    ? p?.status.trim().toLowerCase() === statusKey.trim().toLowerCase() : true

    const jobTypeMatch =
      jobTypeKey && jobTypeKey !== "All Posts"
        ? p?.jobId.jobType.trim().toLowerCase() === jobTypeKey.trim().toLowerCase()
        : true;

    const platformMatch =
      jobPlatformKey && jobPlatformKey !== "All Posts"
        ? p?.jobId.jobPlatform.trim().toLowerCase() === jobPlatformKey.trim().toLowerCase()
        : true;

    const locationMatch =
    locationKey && locationKey!==""
    ? p?.jobId.jobLocation.trim().toLowerCase().includes(locationKey.trim().toLowerCase())
     : true

    return jobTypeMatch && platformMatch && locationMatch && statusMatch;
  });
  

  return (
  <div className="container-fluid page-bg min-vh-100 px-0">


    <div className="row m-0">
      <MainNav />
    </div>
<br /><br /><br />

    <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">

    
      <div className="modern-title-container mb-3 text-center text-md-start">

        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">

          <div>
 <h3 className={`modern-title ${StatusJobs === "shortlisted" ? "premium-green" : StatusJobs === "rejected" ? "premium-red" : "premium-yellow"}`}>{StatusJobs?.toUpperCase()} JOBS</h3>

            <p className="modern-subtitle m-0">
              Track and manage jobs you've applied for
            </p>
          </div>

        </div>

      </div>

   
      <div className="d-flex justify-content-center justify-content-md-start mb-4">
        <SearchInput
          search={search}
          setSearch={setSearch}
          placeholder={`Search your applied jobs here..`}
        />
      </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">

        <DropDown
            datas={FilterJobStatus}
            dataName={statusKey}
            dropDirection={"down"}
            setDatas={setStatusKey}
            classname={`premium-dropdown`}
            initialName={`Filter Job Status`}
          />
          <DropDown
            datas={FilteredJobFields}
            dataName={jobPlatformKey}
            dropDirection={"down"}
            setDatas={setJobPlatformKey}
            classname={`premium-dropdown`}
            initialName={`Filter Job Platform`}
          />
          <DropDown
            datas={FilteredJobTypes}
            dataName={jobTypeKey}
            dropDirection={"down"}
            setDatas={setJobTypekey}
            classname={`premium-dropdown`}
            initialName={`Filter Job Type`}
          />
                    <input
            type="text"
            placeholder="🔍 Filter Job Location..."
            className="premium-input"
            value={locationKey}
            onChange={(e) => setLocationKey(e.target.value)}
          /> 
        </div>

   
      {!Applicant?.populateData?.length ? (

        <div className="text-center mt-5">
          <img
            src="nodata-image.avif"
            alt="no-data"
            className="no-data-img"
          />
          <p className="text-muted mt-3">
            No applied jobs found
          </p>
        </div>

      ) : (

        <div className="row g-3 g-md-4">

          {filteredPosts
            ?.filter((app) =>
              app?.jobId?.jobTitle
                ?.toLowerCase()
                .includes(search?.toLowerCase())
            )
            .map((app) => (

              <div
                key={app?._id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >

                <div className="card premium-card border-0 h-100">

             
                  <div className="d-flex gap-3">

                    <img
                      src={app?.jobId?.profileImage?.url}
                      alt="job"
                      className="profile-img"
                    />

                    <div className="flex-grow-1">

                      <h6 className="fw-bold job-title">
                        {app?.jobId?.jobTitle}
                      </h6>

                      <p className="text-muted small mb-1">
                        {app?.jobId?.companyName}
                      </p>

                      <p className="small mb-1">
                        📍 {app?.jobId?.jobLocation}
                      </p>

                    </div>

                  </div>

            
                  <div className="job-info mt-3">

                    <div>
                      <small>Type</small>
                      <p>{app?.jobId?.jobType}</p>
                    </div>

                    <div>
                      <small>Salary</small>
                      <p>{app?.jobId?.salary}</p>
                    </div>

                  </div>

             
                  <div className="mt-2 small text-muted">
                    Recruiter: {app?.jobId?.recruiterId?.email}
                  </div>

                
                  <div
                    className="small text-muted mt-2 text-truncate"
                    title={app?.jobId?.jobDescription}
                  >
                    {app?.jobId?.jobDescription}
                  </div>

             
                  <div className="mt-auto pt-3 d-flex justify-content-between align-items-center">

                    <small className="text-muted">
                      {timeAgo(app?.appliedAt)}
                    </small>

                    <span
                      className={`status-badge ${
                        app?.status === "shortlisted"
                          ? "status-success"
                          : app?.status === "rejected"
                          ? "status-danger"
                          : "status-pending"
                      }`}
                    >
                      {app?.status}
                    </span>

                  </div>

                </div>

              </div>

            ))}

        </div>

      )}

    </div>

   
    <style>
      {`

/* Background */

.page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
}

/* Premium Card */

.premium-card{

  padding:18px;
  border-radius:16px;

  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);

  transition:0.3s;

  box-shadow:0 4px 20px rgba(0,0,0,0.05);

  display:flex;
  flex-direction:column;

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

.premium-card:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 40px rgba(0,0,0,0.1);
}

/* Profile */

.profile-img{

  width:60px;
  height:60px;
  object-fit:cover;
  border-radius:12px;

}

/* Job Info */

.job-info{

  display:flex;
  justify-content:space-between;

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

/* Status */

.status-badge{

  padding:4px 10px;
  border-radius:8px;
  font-size:12px;
  font-weight:600;

}

.status-success{
  background:#ecfdf5;
  color:#059669;
}

.status-danger{
  background:#fef2f2;
  color:#dc2626;
}

.status-pending{
  background:#fffbeb;
  color:#d97706;
}

/* Title */

.title-icon-applied{

  width:45px;
  height:45px;

  border-radius:12px;

  background: linear-gradient(135deg,#10b981,#059669);

  display:flex;
  align-items:center;
  justify-content:center;

  color:white;
  font-weight:bold;

}

.modern-title-gradient{

  font-size:26px;
  font-weight:700;

  background: linear-gradient(135deg,#059669,#10b981);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;

}

.modern-subtitle{
  font-size:14px;
  color:#6b7280;
}

/* No Data */

.no-data-img{
  width:250px;
  max-width:90%;
}

/* Mobile */

@media(max-width:768px){

  .profile-img{
    width:50px;
    height:50px;
  }

  .job-info{
    flex-direction:column;
    gap:5px;
  }

  .modern-title-gradient{
    font-size:20px;
  }

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

`}
    </style>

  </div>
);
}

export default ViewStatusJobs;