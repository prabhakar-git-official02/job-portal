import { useEffect, useState } from "react";
import MainNav from "../Navbar/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { authThunk } from "../Thunks/authThunk";
import { jobseekerProfileThunk } from "../Thunks/jobseekerProfileThunk";
import { recruiterProfileThunk } from "../Thunks/recruiterProfileThunk";
import { adminProfileThunk } from "../Thunks/adminProfileThunk";
import { applicantThunk } from "../Thunks/applicantThunk";
import { allPostsThunk } from "../Thunks/allPostsThunk";
import { useNavigate } from "react-router-dom";
import { ErraseLoginThunk } from "../Thunks/ErraseLoginThunk";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import ExploreIcon from '@mui/icons-material/Explore';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seePlatform, setSeePlatform] = useState(false);

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!sessionStorage.getItem("tabSession")) {
      dispatch(ErraseLoginThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const Posts = useSelector((state) => state.allPosts.Posts);

  useEffect(() => {
    if (user?.roleData === "admin") dispatch(adminProfileThunk());
    if (user?.roleData === "recruiter") dispatch(recruiterProfileThunk());
    if (user?.roleData === "user") {
      dispatch(jobseekerProfileThunk());
      dispatch(applicantThunk());
    }
  }, [user, dispatch]);

  const jobFields = [
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

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleCount = seePlatform ? jobFields.length : isXs ? 3 : 12;

  return (
    <div className="container-fluid p-0">
      <MainNav Iconbg={``} />

      <main>
        <div className="hero-section d-flex align-items-center justify-content-center text-center">
          <div>
            <h1 className="hero-title">
              Get The <span className="gradient-text">Right Job</span>
            </h1>

            <h1 className="hero-title">You Deserve</h1>

            <p className="hero-subtitle">
              Discover thousands of opportunities from top companies
            </p>

            <Button
              variant="contained"
              size="large"
              className="hero-btn mt-3"
              onClick={() => navigate("/allJobs")}
            >
              Explore Jobs
            </Button>
          </div>
        </div>

        {/* platform */}
        <div className="platform-section text-center">
          <h2 className="mb-2">One Platform</h2>

          <h2>
            Many <span className="gradient-text">Solutions</span>
          </h2>

          <div className="container mt-4">
            <div className="row g-3 justify-content-center">
              {jobFields.slice(0, visibleCount).map((item, index) => (
                <div key={index} className="col-xl-2 col-lg-3 col-md-4">
                  <div
                    className="platform-card"
                    onClick={() =>
                      navigate(`/platformJobs?jobPlatform=${item}`)
                    }
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="toggle-btn mt-4"
              onClick={() => setSeePlatform(!seePlatform)}
            >
              {seePlatform ? "See Less Platform" : "See All Platform"}
            </p>
          </div>
        </div>

        {/* trending job cards */}
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h4 className="section-title">
              <TrendingUpIcon sx={{ fontSize: 40, color: "green" }} /> Trending
              Jobs
            </h4>

            <span className="see-all" onClick={() => navigate("/allJobs")}>
              See All Jobs <KeyboardArrowRightIcon />
            </span>
          </div>

          <div className="row g-4">
            {Posts?.filter((post) => post?.status === "approved")?.slice(0, 8).map((post) => (
              <div key={post._id} className="col-lg-3 col-md-6">
                <div className="job-card h-100">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={post?.profileImage?.url}
                      alt=""
                      className="company-logo"
                    />

                    <div className="ms-3">
                      <h6 className="job-title">{post?.jobTitle}</h6>

                      <p className="company-name">{post?.companyName}</p>
                    </div>
                  </div>

                  <p className="job-detail">
                    <LocationOnIcon className="icon" /> {post?.jobLocation}
                  </p>

                  <p className="job-detail">
                    <WorkIcon className="icon" /> {post?.jobType}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h6 className="salary">
                      <CurrencyRupeeIcon /> {post?.salary}
                    </h6>

                    {user?.roleData === "user" ? (
                      <Button
                        variant="contained"
                        size="small"
                        className="apply-btn"
                        onClick={() => navigate(`/jobDescription/${post._id}`)}
                      >
                        Apply Now
                      </Button>
                    ) : (
                      <span
                        className="details-link"
                        onClick={() => navigate(`/jobDescription/${post._id}`)}
                      >
                        View Details
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
<div className="container-fluid bg-dark text-light p-5">
  <div className="row g-4 justify-content-lg-around">
    {/* About Us */}
    <div className="footer-about col-md-6 col-lg-3 text-start">
      <h5 style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}><InfoIcon/><span className="mx-2">About Us</span></h5>
      <br className="d-md-none"/><br className="d-md-none"/>
     <hr className="d-lg-block d-md-block d-none"/>
      <p>
        Our JobPortal connects talented professionals with top companies. We make job search simple, fast, and effective.
      </p>
      <p>
        <a href="/about" className="text-decoration-none text-light">Learn more</a> |{" "}
        <a href="/careers" className="text-decoration-none text-light">Careers</a> 
      </p>
    </div>

    <hr className="d-md-none"/>


    {/* Explore Links */}
    <div className="footer-links col-md-6 col-lg-3 text-lg-center">
      <h5 style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}><ExploreIcon/><span className="mx-2">Explore</span></h5>
       <br className="d-md-none"/><br className="d-md-none"/>
      <hr className="d-lg-block d-md-block d-none"/>
      {user?.roleData === "user" ? (
        <div className="mt-2 d-flex justify-content-lg-center">
          <div>
          <span  className="d-flex " onClick={() => navigate('/allJobs')} style={{cursor : `pointer`}} ><TravelExploreIcon/><span className="mx-2">Browse Jobs</span></span>
          <br />
          <span className="d-flex " onClick={() => navigate('/savedJobs')} style={{cursor : `pointer`}} ><BookmarkAddedIcon/><span className="mx-2">Saved Jobs</span></span>
          <br />
          <span className="d-flex " onClick={() => navigate('/appliedJobs')} style={{cursor : `pointer`}} ><CheckBoxIcon/><span className="mx-2">Applied Jobs</span></span>
       </div>
        </div>
      ) : 
      user?.roleData === "recruiter" ? (
        <div cclassName="mt-2 d-flex justify-content-lg-center">
          <div>
          <span className="d-flex " onClick={() => navigate('/allJobs')} style={{cursor : `pointer`}} ><TravelExploreIcon/><span className="mx-2">Browse Jobs</span></span>
          <br />
          <span className="d-flex " onClick={() => navigate('/viewPosts')} style={{cursor : `pointer`}} ><WorkIcon/><span className="mx-2">My Posts</span></span>
          <br />
          <span className="d-flex " onClick={() => navigate('/myApplicants')} style={{cursor : `pointer`}} ><PeopleIcon/><span className="mx-2">Applicants</span></span>
          </div>
        </div>
      ):
      user?.roleData === "admin" ? (
      <div  className="mt-2 d-flex justify-content-lg-center">
        <div>
          <span  className="d-flex " onClick={() => navigate('/allJobs')} style={{cursor : `pointer`}} ><TravelExploreIcon/><span className="mx-2">Browse Jobs</span></span>
          <br />
          <span  className="d-flex " onClick={() => navigate('/userLists')} style={{cursor : `pointer`}} ><PeopleIcon/><span className="mx-2">All Users</span></span>
          <br />
          <span className="d-flex "  onClick={() => navigate('/recruiterPosts')} style={{cursor : `pointer`}} ><WorkIcon/><span className="mx-2">Recruiter Posts</span></span>
          </div>
      </div>
      ) : 
      <div className="mt-2 d-flex justify-content-lg-center">
        <div>
           <span  className="d-flex " onClick={() => navigate('/allJobs')} style={{cursor : `pointer`}} ><TravelExploreIcon/><span className="mx-2">Browse Jobs</span></span>
           <br />
            <span  className="d-flex " onClick={() => navigate('/setting')} style={{cursor : `pointer`}} ><SettingsIcon/><span className="mx-2">Settings</span></span>
            <br />
             <span  className="d-flex " onClick={() => navigate('/login')} style={{cursor : `pointer`}} ><LoginIcon/><span className="mx-2">Login</span></span>
        </div>
      </div>}
    </div>

    <hr className="d-md-none"/>

    {/* Contact */}
    <div className="footer-contact col-md-6 col-lg-3 text-start">
      <h5 style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}><ContactEmergencyIcon/><span className="mx-2" >Contact</span></h5>
       <br className="d-md-none"/><br className="d-md-none"/>
     <hr className="d-lg-block d-md-block d-none"/>
      <p><EmailIcon/><strong className="mx-1">Email: </strong> <a href="mailto:prabhakaroffcl@gmail.com" className="text-light">prabhakaroffcl@gmail.com</a></p>
      <p><LinkedInIcon/> <strong className="mx-1">Linkedin: </strong> <a href="https://www.linkedin.com/in/prabhakaroffcl02" target="_blank" rel="noopener noreferrer" className="text-light">linkedin.com/in/prabhakaroffcl02</a></p>
    </div>
  </div>

  <div className="text-center mt-5 mt-lg-0 mt-xl-0">
    <small>&copy; 2026 Find Dreams. All Rights Reserved.</small>
  </div>
</div>
      </main>

      {/* PREMIUM CSS */}

      <style>{`

      html, body {
  height: 100%;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.hero-section{
height: 90vh;
  background: linear-gradient(135deg, #2b74b9, #6366f1);
color:white;
padding:20px;
}

.hero-section::before {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
  top: 20%;
  left: 15%;
  animation: floatUpDown 6s ease-in-out infinite;
}


.hero-section::after {
  content: "";
  position: absolute;
  width: 180px;
  height: 180px;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
  bottom: 15%;
  right: 15%;
  animation: floatUpDown 8s ease-in-out infinite;
}

@keyframes floatUpDown {
  0%,100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-40px);
  }
}

.hero-title{
font-size: clamp(28px,5vw,48px);
font-weight:700;
}

.hero-subtitle{
opacity:0.9;
font-size:18px;
}

.hero-btn{
background:white !important;
color:#4f46e5 !important;
font-weight:bold !important;
border-radius:30px !important;
padding:10px 30px !important;
z-index:1
}

.gradient-text{
background: linear-gradient(90deg,#00c6ff,#0072ff);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.section-title{
font-weight:600;
}

.see-all{
cursor:pointer;
color:#6366f1;
font-weight:600;
}

.job-card{
background:white;
border-radius:16px;
padding:20px;
box-shadow:0 4px 20px rgba(0,0,0,0.08);
transition:0.3s;
}

.job-card:hover{
transform:translateY(-6px);
box-shadow:0 10px 30px rgba(0,0,0,0.15);
}

.company-logo{
width:50px;
height:50px;
object-fit:cover;
border-radius:10px;
}

.job-title{
font-weight:600;
margin:0;
}

.company-name{
font-size:14px;
opacity:0.7;
margin:0;
}

.job-detail{
font-size:14px;
margin:4px 0;
}

.salary{
color:#16a34a;
font-weight:600;
}

.apply-btn{
border-radius:20px !important;
}

.details-link{
color:#6366f1;
cursor:pointer;
font-weight:600;
}

.platform-section{
background:#f1f5f9;
padding-Top : 40px;
}

.platform-card{
background: linear-gradient(135deg, #2b74b9, #6366f1);
color : white;
padding:16px 12px;
border-radius:12px;
font-weight:600;
cursor:pointer;
box-shadow:0 8px 10px rgba(0,0,0,0.15);
transition:0.3s;

display:flex;
align-items:center;
justify-content:center;
text-align:center;

min-height:70px;
max-height:70px;

overflow:hidden;
word-wrap:break-word;
word-break:break-word;

line-height:1.3;
}

@media(min-width:320px){
.platform-card{
font-size:10px;
}
}

@media(min-width:375px){
.platform-card{
font-size:12px;
}
}

@media(min-width:425px){
.platform-card{
font-size:14px;
}
}

.platform-card:hover{
background: linear-gradient(90deg,#00c6ff,#0072ff);
color:white;
transform:translateY(-5px);
}

.toggle-btn{
color:#6366f1;
cursor:pointer;
font-weight:600;
}

`}</style>
    </div>
  );
}

export default Home;
