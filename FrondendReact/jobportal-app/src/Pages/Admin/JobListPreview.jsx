import MainNav from "../../Navbar/MainNav";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allPostsThunk } from "../../Thunks/allPostsThunk";
import { timeAgo } from "../../Components/timeago";
import ButtonUI from "../../Components/ButttonUI";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useNavigate } from "react-router-dom";
import { authThunk } from "../../Thunks/authThunk";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import {
  allRecruiters_Get,
  Post_Status_Update,
} from "../../Thunks/adminGetReqThunk";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchInput from "../../Components/SearchInput";
import DropDown from "../../Components/DropDown";
import { useLocation } from "react-router-dom";

function JobListPreview() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const PostStatus = query.get("postStatus");
  console.log(PostStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [statusKey, setStatusKey] = useState("");
  const [jobTypeKey, setJobTypekey] = useState("");
  const [jobPlatformKey, setJobPlatformKey] = useState("");
  const [locationKey, setLocationKey] = useState("");

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch, user]);

  const Posts = useSelector((state) => state.allPosts.Posts);

  console.log(Posts);
  
const StatusPosts = Posts?.filter((post) => {
  if (!PostStatus) return true; 

  return (
    post?.status?.trim().toLowerCase() === PostStatus.trim().toLowerCase()
  );
});

  console.log("Status Posts", StatusPosts);

  useEffect(() => {
    dispatch(allRecruiters_Get());
  }, [dispatch]);

  const AllRecruiters = useSelector(
    (state) => state.allRecruiters.AllRecruiters,
  );

  const handlePostUpdate = (status, id, recruiterId) => {
    if (status && id && recruiterId) {
      console.log("status", status);
      console.log("id", id);
      console.log("recruiterid", recruiterId);
      dispatch(Post_Status_Update(status, id, recruiterId));
    }
  };

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

  const Cities = [
    "All Posts",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Tirunelveli",
    "Vellore",
    "Erode",
    "Thoothukudi",
    "Thanjavur",
    "Bangalore",
    "Mysore",
    "Mangalore",
    "Hubli",
    "Belgaum",
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
    "Kochi",
    "Trivandrum",
    "Kozhikode",
    "Thrissur",
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Faridabad",
    "Ghaziabad",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Kota",
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Agra",
    "Prayagraj",
    "Bhopal",
    "Indore",
    "Gwalior",
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Chandigarh",
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Bhubaneswar",
    "Cuttack",
    "Patna",
    "Gaya",
    "Ranchi",
    "Jamshedpur",
    "Raipur",
    "Bilaspur",
    "Guwahati",
    "Silchar",
    "Panaji",
    "Margao",
    "Shimla",
    "Dehradun",
    "Haridwar",
    "Srinagar",
    "Jammu",
    "Puducherry",
    "Port Blair",
    "Imphal",
    "Aizawl",
    "Shillong",
    "Gangtok",
    "Itanagar",
    "Agartala",
    "Kohima",
    "Aligarh",
    "Bareilly",
    "Moradabad",
    "Meerut",
    "Jabalpur",
    "Ujjain",
    "Solapur",
    "Kolhapur",
    "Vadodara",
    "Tiruppur",
    "Dhanbad",
    "Asansol",
  ];

  const filteredPosts = StatusPosts?.filter((p) => {
    const jobTypeMatch =
      jobTypeKey && jobTypeKey !== "All Posts"
        ? p?.jobType === jobTypeKey
        : true;

    const platformMatch =
      jobPlatformKey && jobPlatformKey !== "All Posts"
        ? p?.jobPlatform === jobPlatformKey
        : true;

    const locationMatch =
      locationKey && locationKey !== "All Posts"
        ? p?.jobLocation
            ?.trim()
            .toLowerCase()
            .includes(locationKey.trim().toLowerCase())
        : true;
    return jobTypeMatch && platformMatch && locationMatch;
  });

  const FilteredJobTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "All Posts",
  ];

  return (
    <div className="container-fluid page-bg min-vh-100 px-0">
      {/* Navbar */}
      <div className="row m-0">
        <MainNav />
      </div>

      <br />
      <br />
      <br />

      <div className="container py-4 px-3 px-md-4 px-lg-5 mt-5">
        {/* Title */}
        <div className="modern-title-container mb-4 text-center text-md-start">
          <h3 className={`modern-title ${PostStatus === "approved" ? "premium-green" : PostStatus === "rejected" ? "premium-red" : "premium-yellow"}`}>{PostStatus.toUpperCase()} POSTS</h3>
          <p className="modern-subtitle">
            Manage and review all recruiter job postings
          </p>
        </div>
        <div className="d-flex justify-content-center justify-content-md-start mb-3">

          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Search recruiters..."
          />

        </div>

<div className="d-flex flex-wrap gap-2 align-items-center mb-4">
  <DropDown
    datas={FilteredJobTypes}
    dataName={jobTypeKey}
    dropDirection={"down"}
    setDatas={setJobTypekey}
    classname={`premium-dropdown`}
    initialName={`Filter Job Type`}
  />

  <DropDown
    datas={FilteredJobFields}
    dataName={jobPlatformKey}
    dropDirection={"down"}
    setDatas={setJobPlatformKey}
    classname={`premium-dropdown`}
    initialName={`Filter Job Platform`}
  />

  <input
    type="text"
    placeholder="🔍 Filter Job Location..."
    className="premium-input location-input"
    value={locationKey}
    onChange={(e) => setLocationKey(e.target.value)}
  />
</div>

        {/* Cards */}
        <div className="row g-4">
          {filteredPosts
            ?.filter((p) =>
              p?.jobTitle?.toLowerCase().includes(search.toLowerCase()),
            )
            .map((p) => (
              <div key={p?._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div className="card card-saas border-0 shadow-sm h-100 p-3 p-md-4">
                  {/* Top */}
                  <div className="d-flex gap-3">
                    <img
                      src={p?.profileImage?.url}
                      alt="profile"
                      className="profile-img"
                    />

                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{p?.jobTitle}</h6>
                      <p className="text-muted small mb-1">{p?.companyName}</p>

                      <small>
                        Status:{" "}
                        <span
                          className={`fw-bold ${
                            p?.status === "approved"
                              ? "premium-green"
                              : p?.status === "rejected"
                                ? "premium-red"
                                : "premium-yellow"
                          }`}
                        >
                          {p?.status}
                        </span>
                      </small>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="job-info mt-3">
                    <div>
                      <small>Type</small>
                      <p>{p?.jobType}</p>
                    </div>

                    <div>
                      <small>Platform</small>
                      <p>{p?.jobPlatform}</p>
                    </div>

                    <div>
                      <small>Location</small>
                      <p>{p?.jobLocation}</p>
                    </div>
                  </div>

                  {/* Toggle Details */}
                  <div className="mt-3">
                    <Button
                      className="apply-btn"
                      onClick={() =>
                        setActiveId(activeId === p?._id ? null : p?._id)
                      }
                    >
                      {activeId === p?._id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>

                  {/* Details */}
                  {activeId === p?._id && (
                    <div className="details-section mt-3 p-3">
                      <p>
                        <strong>Description:</strong> {p?.jobDescription}
                      </p>
                      <p>
                        <strong>Experience:</strong> {p?.experience}
                      </p>
                      <p>
                        <strong>Salary:</strong> {p?.salary}
                      </p>

                      <div className="skills-box mt-2">
                        {p?.skills?.map((s, i) => (
                          <span key={i} className="skill-chip">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Recruiter */}
                      {AllRecruiters?.filter(
                        (r) => r?.recruiterId === p?.recruiterId,
                      ).map((r) => (
                        <div key={r?._id} className="recruiter-card mt-3">
                          <img
                            src={r?.profileImage?.url}
                            alt="rec"
                            className="recruiter-img"
                          />
                          <div>
                            <p className="mb-1 fw-bold">
                              {r?.firstName} {r?.lastName}
                            </p>
                            <small>{r?.email}</small>
                            <br />
                            <small>{r?.phone}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-3 d-flex gap-2">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handlePostUpdate("approved", p?._id, p?.recruiterId)
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handlePostUpdate("rejected", p?._id, p?.recruiterId)
                      }
                    >
                      Reject
                    </Button>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3">
                    <small className="text-muted">
                      {timeAgo(p?.createdAt)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <style>
        {`
.page-bg{
  background: linear-gradient(135deg,#f8fafc,#eef2f7);
}

.card-saas{
  border-radius:16px;
  transition:0.3s;
}

.card-saas:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 40px rgba(0,0,0,0.08);
}

.profile-img{
  width:70px;
  height:70px;
  border-radius:12px;
  object-fit:cover;
}

.premium-red {
  background: linear-gradient(90deg, #b91c1c, #ef4444) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-green {
  background: linear-gradient(90deg, #16a34a, #22c55e) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.premium-yellow {
  background: linear-gradient(90deg, #b45309, #f59e0b) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
  
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

.modern-title{
  font-size:26px;
  font-weight:700;
  -webkit-background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
}

.modern-subtitle{
  font-size:14px;
  color:#6b7280;
}

.apply-btn{
  background: linear-gradient(135deg,#6366f1,#4f46e5);
  color:white;
  border:none;
  padding:6px 14px;
  border-radius:8px;
  font-size:13px;
}

.details-section{
  background:#f8fafc;
  border-radius:12px;
}

.skills-box{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}

.skill-chip{
  background:#e0e7ff;
  color:#3730a3;
  padding:4px 10px;
  border-radius:20px;
  font-size:12px;
}

.recruiter-card{
  display:flex;
  gap:12px;
  align-items:center;
  background:white;
  padding:10px;
  border-radius:12px;
  box-shadow:0 5px 15px rgba(0,0,0,0.05);
}

.recruiter-img{
  width:60px;
  height:60px;
  border-radius:50%;
  object-fit:cover;
}

.premium-dropdown{
  height:42px;
  display:flex;
  align-items:center;
}

@media(max-width:768px){
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

export default JobListPreview;
