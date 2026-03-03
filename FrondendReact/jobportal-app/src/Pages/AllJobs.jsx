import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPostsThunk } from "../Thunks/allPostsThunk";
import MainNav from "../Navbar/MainNav";
import { timeAgo } from "../Components/timeago";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { SavedJobsPostThunk, savedJobsThunk } from "../Thunks/savedJobsThunk";
import { useNavigate } from "react-router-dom";
import { applicantThunk } from "../Thunks/applicantThunk";
import { authThunk } from "../Thunks/authThunk";
import SearchInput from "../Components/SearchInput";
import DropDown from "../Components/DropDown";
import Button from "@mui/material/Button";
function AllJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(authThunk());
    dispatch(allPostsThunk());
    dispatch(applicantThunk());
    dispatch(savedJobsThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const Posts = useSelector((state) => state.allPosts.Posts);
  const Applied = useSelector((state) => state.applicantMemory.applicant);
  const SavedJobs = useSelector((state) => state.savedJobs.SavedJobs);

  const [jobTypeKey, setJobTypekey] = useState("");
  const [jobPlatformKey, setJobPlatformKey] = useState("");
  const [locationKey, setLocationKey] = useState("");


  const handleSave = (post) => {
    const savedJob = {
      jobId: post?._id,
      recruiterId: post?.recruiterId,
      postId: post?.postId,
      profileImage: post?.profileImage,
      jobTitle: post?.jobTitle,
      jobPlatform : post?.jobPlatform,
      companyName: post?.companyName,
      jobLocation: post?.jobLocation,
      jobType: post?.jobType,
      experience: post?.experience,
      salary: post?.salary,
      skills: post?.skills,
      jobDescription: post?.jobDescription,
      updatedAt: post?.updatedAt,
    };

    dispatch(SavedJobsPostThunk(savedJob));
  };

  const ApprovedPosts = Posts?.filter((p) => p?.status === "approved");

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
  const filteredPosts = ApprovedPosts?.filter((p) => {
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
    <div className="container-fluid page-bg min-vh-100 px-0">
      {/* Navbar */}
      <div className="row m-0">
        <MainNav />
      </div>
      <br />
      <br />
      <br />
      {/* Content */}
      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">
        {/* Title */}
        <div className="modern-title-container mb-3 text-center text-md-start">
          <h3 className="modern-title">Discover Opportunities</h3>

          <p className="modern-subtitle">
            Find the perfect job that matches your skills and passion
          </p>
        </div>

        {/* Search */}
        <div className="d-flex justify-content-center justify-content-md-start mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder={`Search your dream jobs here..`}
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
{!Posts ? 
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
</div>: 
<div>

        {/* Job Cards */}
        <div className="row g-3 g-md-4">
          {filteredPosts
            ?.filter((post) =>
              post?.jobTitle?.toLowerCase().includes(search.toLowerCase()),
            )
            .map((post) => (
              <div key={post._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
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

                  


            {user?.roleData === "user" ? 
               <div>
                  {user?.roleData === "user" && (
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      {Applied?.populateData?.some((a) =>
                        post?._id.includes(a?.jobId?._id),
                      ) ? (
                        <span className="applied-text">Applied</span>
                      ) : (
                        <Button
                          className="btn apply-btn"
                          onClick={() =>
                            navigate(`/jobDescription/${post?._id}`)
                          }
                        >
                          Apply
                        </Button>
                      )}

                      <span
                        className="bookmark-btn"
                        onClick={() => handleSave(post)}
                      >
                        {SavedJobs?.SavedList?.some(
                          (job) => job?.jobId === post?._id,
                        ) ? (
                          <BookmarkAddedIcon className="bookmark-active" />
                        ) : (
                          <BookmarkSharpIcon className="bookmark-inactive" />
                        )}
                      </span>
                    </div>
                  )}
                  </div> : 
                    <span
                      className="details-link mt-3"
                      onClick={() => navigate(`/jobDescription/${post._id}`)}
                    >
                      View Details
                    </span>
}

                  {/* Footer */}
                  <div className="mt-auto pt-2">
                    <small className="text-muted">
                      {timeAgo(post?.updatedAt)}
                    </small>
                  </div>
          
                </div>
          
              </div>

            ))}
        
        </div>
</div>
}
      </div>
          

      {/* Styles */}
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
.page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
}

/* Card */

.card-saas{
  border-radius:16px;
  transition:0.3s;
}

.card-saas:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 40px rgba(0,0,0,0.08);
}

.apply-btn{
border-radius:20px !important;
}

.details-link{
color:#6366f1;
cursor:pointer;
font-weight:600;
}

/* Image */

.profile-img{

  width:70px;
  height:70px;
  object-fit:cover;
  border-radius:12px;

}

/* Job Info */

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

/* Button */

.apply-btn{

  background: linear-gradient(135deg,#6366f1,#4f46e5);
  color:white;
  border:none;
  padding:5px 14px;
  border-radius:8px;
  font-size:13px;

}

/* Bookmark */

.bookmark-btn{
  cursor:pointer;
}

.bookmark-active{
  color:#f59e0b;
}

.bookmark-inactive{
  color:#6366f1;
}

/* Applied */

.applied-text{
  color:#10b981;
  font-weight:500;
  font-size:13px;
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

export default AllJobs;
