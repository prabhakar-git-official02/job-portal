import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { recruiterPostsThunk } from "../../Thunks/recruiterPostsThunk";
import { authThunk } from "../../Thunks/authThunk";
import { timeAgo } from "../../Components/timeago";
import MainNav from "../../Navbar/MainNav";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";

function ViewPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

    const [jobTypeKey, setJobTypekey] = useState("");
    const [jobPlatformKey, setJobPlatformKey] = useState("");
    const [locationKey, setLocationKey] = useState("");

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.roleData === "recruiter") {
      dispatch(recruiterPostsThunk());
    }
  }, [user, dispatch]);

  const Posts = useSelector((state) => state.recruiterPosts.Posts);

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
  const filteredPosts = Posts?.filter((p) => {
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

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-4">
        {/* Title */}

        <div className="modern-title-container mb-3 text-center text-md-start">
          <h3 className="modern-title">Your Job Posts</h3>

          <p className="modern-subtitle">
            Manage and track all your posted jobs
          </p>
        </div>

        {/* Search */}

        <div className="d-flex justify-content-center justify-content-md-start mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Search your job posts..."
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

        {/* Empty */}

        {!Posts?.length ? (
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
            {filteredPosts?.filter((post) =>
              post?.jobTitle?.toLowerCase().includes(search.toLowerCase()),
            ).map((post) => (
              <div key={post._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div
                  className="card card-saas border-0 shadow-sm h-100 p-3 p-md-4"
                  onClick={() => navigate(`/postDetails/${post._id}`)}
                  style={{ cursor: "pointer" }}
                >
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
                  <div>
                    <p
                    className="mt-3"
                    ><strong>Post Status: </strong><span className={`fw-bold  ${post?.status === "approved" ? "text-success" : post?.status === "rejected" ? "text-danger" : "text-warning"}`}>{post?.status}</span></p>
                  </div>
                  {/* Footer */}

                  <div className="mt-auto pt-2">
                    <small className="text-muted">
                      {timeAgo(post?.createdAt)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Styles */}

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

export default ViewPosts;
