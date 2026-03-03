import { useEffect, useState } from "react";
import { authThunk } from "../../Thunks/authThunk";
import {
  SavedJobsRemoveThunk,
  savedJobsThunk,
} from "../../Thunks/savedJobsThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainNav from "../../Navbar/MainNav";
import { timeAgo } from "../../Components/timeago";
import { allPostsThunk } from "../../Thunks/allPostsThunk";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { applicantThunk } from "../../Thunks/applicantThunk";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";

function SavedJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

    const [jobTypeKey, setJobTypekey] = useState("");
  const [jobPlatformKey, setJobPlatformKey] = useState("");
  const [locationKey, setLocationKey] = useState("");

  useEffect(() => {
    dispatch(authThunk());
    dispatch(savedJobsThunk());
    dispatch(allPostsThunk());
    dispatch(applicantThunk());
  }, [dispatch]);


  const SavedJobs = useSelector((state) => state.savedJobs.SavedJobs);
  const Applied = useSelector((state) => state.applicantMemory.applicant);

  console.log(SavedJobs)

  const handleDeleteSave = (JobId) => {
    dispatch(SavedJobsRemoveThunk(JobId));
  };

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
  const filteredPosts = SavedJobs?.SavedList?.filter((p) => {
    const jobTypeMatch =
      jobTypeKey && jobTypeKey !== "All Posts"
        ? p?.jobType.trim().toLowerCase() === jobTypeKey.trim().toLowerCase()
        : true;

    const platformMatch =
      jobPlatformKey && jobPlatformKey !== "All Posts"
        ? p?.jobPlatform.trim().toLowerCase() === jobPlatformKey.trim().toLowerCase()
        : true;

    const locationMatch =
    locationKey && locationKey!==""
    ? p?.jobLocation.trim().toLowerCase().includes(locationKey.trim().toLowerCase())
     : true

    return jobTypeMatch && platformMatch && locationMatch;
  });

  return (
    <div className="saved-page">
          <div className="row m-0">
            <MainNav />
          </div>
      <br /><br /><br />
      {/* Content */}
      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">
        {/* Title */}

        <div className="modern-title-container mb-3 text-center text-md-start">
          <h3 className="modern-title">Saved Jobs</h3>

          <p className="modern-subtitle">Access and manage jobs you've saved</p>
        </div>

        {/* Search */}

        <div className="d-flex justify-content-center justify-content-md-start mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Search your saved jobs here..."
          />
        </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">


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

        {/* No Data */}

        {!SavedJobs?.SavedList?.length ? (
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
          <div className="row g-3 g-md-4">
            {filteredPosts?.filter((post) =>
              post?.jobTitle?.toLowerCase().includes(search.toLowerCase()),
            ).map((post) => {
              const isApplied = Applied?.populateData?.some(
                (a) => post?.jobId === a?.jobId?._id,
              );

              return (
                <div
                  key={post._id}
                  className="col-12 col-sm-6 col-lg-4 col-xl-3"
                >
                  <div className="card card-saas border-0 shadow-sm h-100 p-3 p-md-4">
                    {/* Top */}

                    <div className="d-flex flex-column flex-sm-row gap-3">
                      <img
                        src={post?.profileImage?.url}
                        alt="job"
                        className="profile-img"
                      />

                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-1 job-title">
                          {post?.jobTitle}
                        </h6>

                        <p className="text-muted small mb-1">
                          {post?.companyName}
                        </p>

                        <div className="small text-dark mb-2">
                          📍 {post?.jobLocation}
                        </div>
                      </div>
                    </div>

                    {/* Info */}

                    <div className="job-info mt-3">
                      <div>
                        <small>Experience</small>
                        <p>{post?.experience}</p>
                      </div>

                      <div>
                        <small>Type</small>
                        <p>{post?.jobType}</p>
                      </div>

                      <div>
                        <small>Salary</small>
                        <p>{post?.salary}</p>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      {isApplied ? (
                        <span className="applied-text">Applied</span>
                      ) : (
                        <button
                          className="btn apply-btn"
                          onClick={() =>
                            navigate(`/jobDescription/${post?.jobId}`)
                          }
                        >
                          Apply
                        </button>
                      )}

                      <span
                        className="bookmark-btn"
                        onClick={() => handleDeleteSave(post?.jobId)}
                      >
                        <BookmarkRemoveIcon className="bookmark-remove" />
                      </span>
                    </div>

                    {/* Footer */}

                    <div className="mt-auto pt-2">
                      <small className="text-muted">
                        {timeAgo(post?.updatedAt)}
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
        
 .bookmark-remove{

color:#ef4444;

cursor:pointer;

transition:.2s;

}

.bookmark-remove:hover{

transform:scale(1.15);

}


/* No data */

.no-data-img{

width:250px;
max-width:90%;

}

/* Page */

.saved-page{

background:#f8fafc;

min-height:100vh;

}



/* Title */

.modern-title{

font-weight:700;

font-size:28px;

background:linear-gradient(90deg,#2563eb,#7c3aed);

-webkit-background-clip:text;

-webkit-text-fill-color:transparent;

}

.modern-subtitle{

color:#64748b;

font-size:14px;

}



/* Card */

.card-saas{

border-radius:14px;

background:white;

transition:.25s;

display:flex;

flex-direction:column;

}

.card-saas:hover{

transform:translateY(-6px);

box-shadow:0 15px 35px rgba(0,0,0,.08);

}



/* Image */

.profile-img{

width:60px;

height:60px;

object-fit:cover;

border-radius:10px;

border:1px solid #e2e8f0;

}



/* Job title */

.job-title{

font-size:16px;

font-weight:600;

color:#0f172a;

}



/* Job info row */

.job-info{

display:flex;

justify-content:space-between;

gap:10px;

}

.job-info div{

flex:1;

}

.job-info small{

color:#64748b;

font-size:12px;

}

.job-info p{

margin:0;

font-weight:500;

font-size:14px;

}



/* Apply button */

.apply-btn{

background:linear-gradient(90deg,#2563eb,#7c3aed);

border:none;

color:white;

padding:6px 16px;

font-size:14px;

border-radius:8px;

transition:.2s;

}

.apply-btn:hover{

opacity:.9;

}



/* Applied text */

.applied-text{

color:#ef4444;

font-weight:500;

font-size:14px;

}



/* Bookmark */

.bookmark-btn{

cursor:pointer;

}

.bookmark-remove{

color:#ef4444;

font-size:22px;

transition:.2s;

}

.bookmark-remove:hover{

transform:scale(1.15);

}



/* No data image */

.no-data-img{

width:250px;

max-width:90%;

}



/* Responsive */

@media(max-width:768px){

.job-info{

flex-direction:column;

gap:5px;

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

export default SavedJobs;
